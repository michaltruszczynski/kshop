const { body, param } = require('express-validator');

const UserRole = require('../../model/userRole');

const editUserValidation = () => {
   return [
      body('userName').trim().not().isEmpty().isLength({ min: 5, max: 10 }).withMessage('Name must be 5 - 10 characters long.'),
      body('userRole')
         .trim()
         .not()
         .isEmpty()
         .withMessage('User roles must be provided.')
         .bail()
         .custom((userRole, req) => {
            return UserRole.findOne({ name: userRole }).then((userRoleDb) => {
               if (!userRoleDb) {
                  return Promise.reject('Incorrect user role.');
               } else {
                  return Promise.resolve(true);
               }
            });
         }),
         body('userId').isMongoId().withMessage('Invalid brandId.')

   ];
};

const userIdValidation = () => {
   return [param('id').isMongoId().withMessage('Invalid brandId.')];
};

module.exports = {
   editUserValidation,
   userIdValidation,
};
