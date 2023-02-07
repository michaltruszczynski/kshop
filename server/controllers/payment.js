const Product = require('../model/product');
const PaymentOperation = require('../model/paymentOperation');
const Order = require('../model/order');
const User = require('../model/user');

const { calculateCartTotalPriceAndDiscount, getOrderData } = require('../utility/shop')

const STRIPE_KEY = process.env.STRIPE_KEY;
const STRIPE_ENDPOINT_SECRET= process.env.STRIPE_ENDPOINT_SECRET;
// console.log('STRIPE_KEY: ', STRIPE_KEY)
// console.log('STRIPE_ENDPOINT_SECRET: ', STRIPE_ENDPOINT_SECRET)

const stripe = require('stripe')(STRIPE_KEY);

const endpointSecret = STRIPE_ENDPOINT_SECRET;

exports.postCreatePayment = async (req, res, next) => {
      const discount = 0.1;
      const shippingCost = 10.99;

      try {
            const { cart } = req.body;
            const { _id: userId } = req.user;

            const cartProductsId = cart.map(cartItem => {
                  return cartItem.productId
            });

            const cartProductsDbData = await Product.find({ _id: { $in: cartProductsId } }, ['_id', 'category', 'name', 'type', 'brand', 'price', 'primaryImage']);

            if (cartProductsDbData.length !== cartProductsId.length) {
                  const error = new Error('Cart includes products that does not exist.');
                  error.statusCode = 422;
                  throw (error);
            }

            const { orderSubTotal, priceDiscount, orderTotal } = calculateCartTotalPriceAndDiscount(cart, cartProductsDbData, discount, shippingCost);
           console.log('orderTotal: ', orderTotal)
            const newOrderData = {
                  products: getOrderData(cart, cartProductsDbData),
                  orderSubTotal: orderSubTotal,
                  priceDiscount: priceDiscount,
                  shippingCost,
                  orderTotal,
                  userId: userId.toString()
            };

            const paymentIntent = await stripe.paymentIntents.create({
                  amount: parseFloat(parseFloat(orderTotal).toFixed(2) * 100).toFixed(),
                  currency: "eur",
                  automatic_payment_methods: {
                        enabled: true,
                  }
            });

            const newPaymentOperation = new PaymentOperation({
                  paymentIntentId: paymentIntent.id,
                  transactionAmount: parseFloat(orderTotal).toFixed(2) * 100,
                  orderData: newOrderData,
                  userId: userId.toString()
            })

            const response = newPaymentOperation.save()

            res.send({
                  clientSecret: paymentIntent.client_secret,
                  orderSubTotal,
                  priceDiscount,
                  shippingCost,
                  orderTotal
            });

      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}

//webhook

exports.postPaymentConfirmed = async (req, res, next) => {
      const sig = req.headers['stripe-signature'];

      try {
            const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log('webhook event.type', event.type);

            if (event.type !== 'charge.succeeded') {
                  return res.send();
            }

            // console.log(event.data)
            const eventPaymentIntentId = event.data.object.payment_intent;
            const storedPaymentIntent = await PaymentOperation.findOne({ paymentIntentId: eventPaymentIntentId });
            // console.log(storedPaymentIntent)
            if (!storedPaymentIntent) {
                  const error = new Error('Error while processing received payment.');
                  error.statusCode = 422;
                  throw (error);
            }

            const { orderData } = storedPaymentIntent;
            // console.log('orderData', orderData)
            const newOrder = new Order({
                  ...orderData
            });

            const responseNewOrder = await newOrder.save();
            // console.log('order saved', responseNewOrder);
            const { userId } = orderData;
            const responseUserOrderUpdate = await User.updateOne({
                  _id: userId
            }, {
                  $push: { orders: responseNewOrder._id.toString() }
            });

            // console.log('responseUserOrderUpdate: ', responseUserOrderUpdate)

            if (responseUserOrderUpdate) {
                  res.send();
                  const deleteResponse = await PaymentOperation.findOneAndDelete({ paymentIntentId: eventPaymentIntentId });
                  console.log('deleteResponse', deleteResponse)
            }


      } catch (error) {
            console.log(error)
            res.status(400).send(`Webhook Error: ${error.message}`);
            return;
      }
}
