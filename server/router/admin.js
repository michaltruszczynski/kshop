const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

const { editUserValidation, userIdValidation } = require('../middleware/admin/admin');
const { dataErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers.js');

const { verifyToken } = require('../middleware/auth/authJWT');
const { verifyUserRole } = require('../middleware/auth/authUser');

router.get('/users', verifyToken, verifyUserRole(['admin', 'employee', 'client']), adminController.getUsersList);

router.get('/users/:id', verifyToken, verifyUserRole(['admin', 'employee', 'client']), userIdValidation(), dataErrorHandler, throwError('Get user failed.'), adminController.getUser);

router.put('/users', verifyToken, verifyUserRole(['admin', 'employee', 'client']), editUserValidation(), dataErrorHandler, throwError('Edit user failed.'), adminController.putUser);

module.exports = router;
