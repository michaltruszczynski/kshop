const User = require('../model/user');
const UserRole = require('../model/userRole');

exports.getUsersList = async (req, res, next) => {
   try {
      const { user } = req;
      const userId = user._id;
      const users = await User.find({}, 'email name userRole').populate({ path: 'userRole', select: 'name -_id' });

      const foundUsers = users.map((user) => {
         if (user._id.toString() !== userId.toString()) {
            user.name = user.name.slice(0, 1).padEnd(user.name.length, '*');
            user.email = user.email.slice(0, 1).padEnd(user.email.length, '*');
         }
         return user;
      });

      res.status(200).json({
         users: foundUsers,
      });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getUser = async (req, res, next) => {
   try {
      const { user } = req;
      const userId = user._id;
      if (!req?.params?.id) {
         const error = new Error('User ID required.');
         error.statusCode = 400;
         throw error;
      }

      const requestedUserData = await User.findById(req.params.id, 'email name userRole').populate({ path: 'userRole', select: 'name -_id' });

      if (!requestedUserData) {
         const error = new Error('Could not find user.');
         error.statusCode = 404;
         throw error;
      }

      if (requestedUserData._id.toString() !== userId.toString()) {
         requestedUserData.name = requestedUserData.name.slice(0, 1).padEnd(requestedUserData.name.length, '*');
         requestedUserData.email = requestedUserData.email.slice(0, 1).padEnd(requestedUserData.email.length, '*');
      }

      res.status(200).json({ user: requestedUserData });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.putUser = async (req, res, next) => {
   

   try {
      const { user } = req;
      const { userName, userRole, userId } = req.body;
      const id = user._id;

      const userRoleId = await UserRole.findOne({ name: userRole }, '_id');
      const { _id: roleId } = userRoleId;
      const roleIdString = roleId.toString();

      if (id.toString() !== userId.toString()) {
         const error = new Error('You are not authorized to perform this operation.');
         error.statusCode = 401;
         throw error;
      }

      const response = await User.updateOne(
         {
            _id: userId,
         },
         {
            $set: {
               name: userName,
               userRole: roleIdString,
            },
         }
      );

      res.status(200).json({ message: 'User updated.', userId: userId });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};
