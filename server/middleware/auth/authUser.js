const User = require('../../model/user');
const UserRole = require('../../model/userRole')
//roles ['client', 'employee', 'admin']

const defaultAllowedRoles = ['client'];

const verifyUserRole = (allowedRoles = defaultAllowedRoles) => async (req, res, next) => {
      try {
            const allowedDBRoles = await UserRole.find({ name: { $in: allowedRoles } }, '_id');
            const { user } = req;

            const allowedDBRolesId = allowedDBRoles.map(role => role._id.toString());

            // const userRolesId = user.userRoles.map(role => role._id.toString());

            const userRolesId = user.userRole._id.toString();

            // const userHasPermission = allowedDBRolesId.reduce((userHasRole, roleId) => {
            //       return userHasRole || userRolesId.includes(roleId);
            // }, false);

            const userHasPermission = allowedDBRolesId.includes(userRolesId);
            console.log('userHasPermission: ', userHasPermission)
            if (!userHasPermission) {
                  const error = new Error('Not authorized. Forbiden resources for user role.');
                  error.statusCode = 403;
                  throw error;
            }

            next();

      } catch (error) {
            console.log(error)
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}

module.exports = {
      verifyUserRole
}

