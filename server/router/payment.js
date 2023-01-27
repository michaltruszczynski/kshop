const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment');

const { cartValidator } = require('../middleware/paymentValidators/paymentValidator');
const { dataErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers.js')
const { verifyToken } = require('../middleware/auth/authJWT');

router.post('/create-payment-intent',
      verifyToken,
      cartValidator(),
      dataErrorHandler,
      throwError('Cart data validation failed.'),
      paymentController.postCreatePayment);


module.exports = router;