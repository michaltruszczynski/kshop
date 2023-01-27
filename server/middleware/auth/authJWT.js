const jwt = require('jsonwebtoken');
const User = require('../../model/user');

const { TokenExpiredError, JsonWebTokenError } = jwt;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = async (req, res, next) => {
      const authToken = req.headers['x-access-token'];
      console.log('[MDW verifyToken]: ', authToken);

      try {
            if (!authToken || authToken == null) {
                  const error = new Error('Not authenticated.');
                  error.statusCode = 401;
                  throw error;
            }

            const decodedToken = jwt.verify(authToken, ACCESS_TOKEN_SECRET);
            if (!decodedToken) {
                  const error = new Error('Not authenticated.');
                  error.statusCode = 401;
                  throw error;
            }
            const user = await User.findOne({ _id: decodedToken.userId }).populate('userRole');

            // console.log('[MDW verifyToken] - user: ', user) 
            if (!user) {
                  const error = new Error('A user can not be found.');
                  error.statusCode = 401;
                  throw error;
            }
            req.user = user;
            next();

      } catch (err) {
            // console.log(err)
            if (err instanceof TokenExpiredError) {
                  const error = new Error('Not authenticated. Access token expired.');
                  error.statusCode = 401;
                  error.data = err;
                  return next(error);
            }
            else if (err instanceof JsonWebTokenError) {
                  const error = new Error('Not authenticated. Access token validation failed.');
                  error.statusCode = 401;
                  error.data = err;
                  return next(error);
            }
            
            if (!err.statusCode) {
                  err.statusCode = 500;
            }
            next(err);
      }
}

module.exports = {
      verifyToken
}





