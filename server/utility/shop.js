const calculateCartTotalPriceAndDiscount = (cart, cartProductsDbData, discount = 0, shippingCost = 0) => {

      const calculateTotalItemPrice = (itemId, quantity) => {
            let totalItemPrice = 0;
            cartProductsDbData.forEach(product => {
                  if (itemId === (product._id).toString()) {
                        totalItemPrice = quantity * parseFloat(product.price).toFixed(2);
                  }
            });
            return totalItemPrice;
      }

      const orderSubTotal = cart.reduce((totalPrice, cartItem) => {
            return totalPrice + calculateTotalItemPrice(cartItem.productId, cartItem.quantity)
      }, 0);

      const priceDiscount = parseFloat(orderSubTotal * discount).toFixed(2);

      const orderTotal = orderSubTotal - priceDiscount + shippingCost;

      return { orderSubTotal, priceDiscount, orderTotal };

}

const getOrderData = (cart, cartProductsDbData) => {
      const order = cartProductsDbData.map(product => {
            const { _id, category: productCategory, name: productName, type: productType, brand:  productBrand, price: productPrice, primaryImage } = product;

            const cartItem = cart.find(cartItem => {
                  return cartItem.productId === _id.toString()
            });

            return {
                  productId: _id.toString(),
                  productCategory,
                  productName,
                  productType,
                  productBrand,
                  productPrice,
                  primaryImage,
                  quantity: cartItem.quantity,
                  productSize: cartItem.productSize
            }
      })

      return order;
}


module.exports = {
      calculateCartTotalPriceAndDiscount,
      getOrderData
}