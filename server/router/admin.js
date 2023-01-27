const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

const { editUserValidation } = require('../middleware/admin/admin')

const { dataErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers.js');

router.get('/users',
      adminController.getUsersList);

router.get('/users/:userId',
      adminController.getUser);

router.put('/users/:userId',
      editUserValidation(),
      dataErrorHandler,
      throwError('Edit user failed.'),
      adminController.putUser
);

module.exports = router;