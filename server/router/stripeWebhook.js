const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment');

router.post('/webhook', paymentController.postPaymentConfirmed)

module.exports = router;