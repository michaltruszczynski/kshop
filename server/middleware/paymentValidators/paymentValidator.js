const { body } = require('express-validator');

const cartValidator = () => {
      return [
            body('cart')
                  .custom(cart => {
                        let isValid = true;
                        isValid = isValid && Array.isArray(cart);
                        if (!isValid) return false;

                        cart.forEach(cartItem => {
                              const cartItemKeys = Object.keys(cartItem);
                              isValid = isValid && cartItemKeys.includes('productId');
                              isValid = isValid && cartItemKeys.includes('quantity');
                        });

                        return isValid;
                  }).withMessage('Unable to proceed. Incorrect data format.').bail()
                  .custom(cart => {
                        let isValid = true;
                        isValid = isValid && cart.length;

                        return isValid;
                  }).withMessage('Unable to proceed. Your cart is empty.')
      ]
}

module.exports = {
      cartValidator

}