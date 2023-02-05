const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
      products: {
            type: [],
            required: true
      },
      orderSubTotal: {
            type: Number,
            required: true
      },
      priceDiscount: {
            type: Number,
            required: true
      },
      shippingCost: {
            type: Number,
            required: true
      },
      orderTotal: {
            type: Number,
            required: true
      },
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
      },
      removeDate: {
            type: Date
      },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);