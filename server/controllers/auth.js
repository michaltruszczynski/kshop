const User = require('../model/user');
const RefreshToken = require('../model/refreshToken');
const UserRole = require('../model/userRole');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { TokenExpiredError, JsonWebTokenError } = jwt;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const secondsToMiliSeconds = (seconds) => seconds * 1000;
const minutesTOMiliseconds = (minutes) => minutes * 60 * 1000;

const ACCESS_TOKEN_EXPIRATION = 60 * 0.5; //in seconds->15min
const REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24 * 1; //in seconds -> 1d

exports.postSignup = async (req, res, next) => {
   const { name, email, password } = req.body;

   try {
      const signupUserRole = 'client';
      const userRole = await UserRole.findOne({ name: signupUserRole });

      const hashedPassword = await bcryptjs.hash(password, 12);

      const newUser = new User({
         name,
         email,
         password: hashedPassword,
         userRole: userRole._id,
      });

      const result = await newUser.save();
      
      res.status(200).json({ message: 'User created', userId: result._id });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.postSignin = async (req, res, next) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email: email })
         .populate({ path: 'userRole', select: 'name email -_id' })
         .populate({ path: 'orders', select: '-_userId -updatedAt -__v', options: { sort: { createdAt: -1 } } });

      if (!user) {
         const error = new Error('A user with this email can not be found.');
         error.statusCode = 401;
         error.data = [{ msg: 'Please enter correct email.', param: 'email', value: email }];
         throw error;
      }

      const isEqual = await bcryptjs.compare(password, user.password);

      if (!isEqual) {
         const error = new Error('Wrong password.');
         error.statusCode = 401;
         error.data = [{ msg: 'Please enter correct password.', param: 'password', value: password }];
         throw error;
      }

      let tokenExpiryDate = new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRATION * 1000);
      const token = jwt.sign(
         {
            userId: user._id,
         },
         ACCESS_TOKEN_SECRET,
         { expiresIn: ACCESS_TOKEN_EXPIRATION }
      );

      let refreshTokenExpiryDate = new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRATION * 1000);
      const refreshToken = jwt.sign(
         {
            userId: user._id,
         },
         REFRESH_TOKEN_SECRET,
         { expiresIn: REFRESH_TOKEN_EXPIRATION }
      );

      const newRefreshToken = new RefreshToken({
         refreshToken,
         expiryDate: refreshTokenExpiryDate,
         userId: user._id,
      });

      const newRefreshTokenResult = await newRefreshToken.save();

      res.status(200).json({
         token: token,
         userId: user._id.toString(),
         userRole: user.userRole.name,
         userName: user.name,
         userEmail: user.email,
         orders: user.orders,
         refreshToken: refreshToken,
         expiresIn: ACCESS_TOKEN_EXPIRATION,
      });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getCheckUser = async (req, res, next) => {
   try {
      const authToken = req.headers['x-access-token'];

      if (!authToken || authToken == null) {
         const error = new Error('Not authenticated.');
         error.statusCode = 401;
         throw error;
      }
      let decodedToken = jwt.verify(authToken, ACCESS_TOKEN_SECRET);
      if (!decodedToken) {
         const error = new Error('Not authenticated.');
         error.statusCode = 401;
         throw error;
      }

      const user = await User.findOne({ _id: decodedToken.userId })
         .populate({ path: 'userRole', select: 'name email -_id' })
         .populate({ path: 'orders', select: '-_userId -updatedAt -__v', options: { sort: { createdAt: -1 } } });

      if (!user) {
         const error = new Error('Not authenticated. A user can not be found.');
         error.statusCode = 401;
         throw error;
      }

      res.status(200).json({
         token: authToken,
         userId: user._id.toString(),
         userRole: user.userRole.name,
         userName: user.name,
         userEmail: user.email,
         orders: user.orders,
         expiresIn: ACCESS_TOKEN_EXPIRATION,
      });
   } catch (err) {
      if (err instanceof TokenExpiredError) {
         const error = new Error('Not authenticated. Access token expired.');
         error.statusCode = 401;
         error.data = err;
         next(error);
      } else if (err instanceof JsonWebTokenError) {
         const error = new Error('Not authenticated. Access token validation failed.');
         error.statusCode = 401;
         error.data = err;
         next(error);
      } else if (!err.statusCode) {
         err.statusCode = 500;
      }
      next(err);
   }
};

exports.postRefreshToken = async (req, res, next) => {
   const { refreshToken: requestToken } = req.body;
   try {
      if (!requestToken) {
         // const error = new Error('Refresh token is required.');
         const error = new Error('Not authenticated.');
         error.statusCode = 401;
         throw error;
      }

      let refreshToken = await RefreshToken.findOne({ refreshToken: requestToken });
      if (!refreshToken) {
         // const error = new Error('Refresh token is not in database.');
         const error = new Error('Not authenticated.');
         error.statusCode = 401;
         throw error;
      }

      const { expiryDate } = refreshToken;

      if (expiryDate < new Date()) {
         // const result = await RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false });
         const result = await RefreshToken.findByIdAndRemove(refreshToken._id);
         // const error = new Error('Refresh token expired. Please sign in.');
         const error = new Error('Not authenticated 3.');
         error.statusCode = 401;
         throw error;
      }

      let newAccessToken = jwt.sign(
         {
            userId: refreshToken.userId,
         },
         ACCESS_TOKEN_SECRET,
         { expiresIn: ACCESS_TOKEN_EXPIRATION }
      );

      res.status(200).json({
         token: newAccessToken,
         refreshToken: requestToken,
      });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};
