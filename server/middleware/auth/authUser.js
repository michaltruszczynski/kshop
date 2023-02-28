const User = require('../../model/user');
const UserRole = require('../../model/userRole')

const defaultAllowedRoles = ['client'];

const verifyUserRole = (allowedRoles = defaultAllowedRoles) => async (req, res, next) => {
      try {
            const allowedDBRoles = await UserRole.find({ name: { $in: allowedRoles } }, '_id');
            const { user } = req;

            const allowedDBRolesId = allowedDBRoles.map(role => role._id.toString());

            const userRolesId = user.userRole._id.toString();

            const userHasPermission = allowedDBRolesId.includes(userRolesId);

            if (!userHasPermission) {
                  const error = new Error('Not authorized. Forbiden resources for user role.');
                  error.statusCode = 403;
                  throw error;
            }

            next();

      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}

module.exports = {
      verifyUserRole
}

