const User = require('../model/user');
const UserRole = require('../model/userRole')

exports.getUsersList = async (req, res, next) => {
      try {
            const users = await User.find({}, 'email name userRole').populate({ path: 'userRole', select: 'name -_id' })

            res.status(200).json({
                  users: users
            })
      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}

exports.getUser = async (req, res, next) => {
      try {
            const { userId } = req.params;
            const user = await User.findById(userId, 'email name userRole').populate({ path: 'userRole', select: 'name -_id' });

            if (!user) {
                  const error = new Error('Could not find user.');
                  error.statusCode = 404;
                  throw (error);
            }

            res.status(200).json({ user: user })
      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}

exports.putUser = async (req, res, next) => {
      const userId = req.params.userId;
      const { name, userRole } = req.body;

      try {
            const userRoleId = await UserRole.findOne({ name: userRole }, '_id');
            const { _id: roleId } = userRoleId;
            const roleIdString = roleId.toString();

            const response = await User.updateOne({
                  _id: userId
            }, {
                  $set: {
                        name: name,
                        userRole: roleIdString
                  }
            });

            res.status(200).json({ message: 'User updated.', userId: userId })

      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }

}