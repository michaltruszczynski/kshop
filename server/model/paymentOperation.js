const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentOperationSchema = new Schema({
      paymentIntentId: {
            type: String,
            required: true
      },
      transactionAmount: {
            type: Number,
            required: true
      },
      orderData: {
            type: {},
            required: true
      },
      userId: {
            type: String,
            required: true
      }

}, { timestamps: true });

module.exports = mongoose.model('PaymentOperation', paymentOperationSchema);