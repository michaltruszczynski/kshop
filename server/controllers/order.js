const Order = require('../model/order')

exports.getOrders = async (req, res, next) => {
      try {

            const orders = await Order.find();

            res.status(200).json({
                  orders: orders
            });
      }
      catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }

}