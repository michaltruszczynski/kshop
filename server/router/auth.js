const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

const { userSignupValidation, userSigninValidation } = require('../middleware/userValidators/userValidators')

const { dataErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers.js');

router.post('/signup',
      userSignupValidation(),
      dataErrorHandler,
      throwError('Signup validation failed.'),
      authController.postSignup);

router.post('/signin',
      userSigninValidation(),
      dataErrorHandler,
      throwError('Signin validation failed.'),
      authController.postSignin);

router.get('/checkuser',
      authController.getCheckUser);

router.post('/newtoken',
      authController.postRefreshToken);

module.exports = router;