import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/helpers';

const initialState = {
      cart: [],
      cartProductNumber: 0,
      paymentStarted: false
}

const addToCart = (state, action) => {
      const { cart } = state;
      const { productId, productSize, quantity, productData } = action;

      const existingItemIndex = cart.findIndex(item => item.productId === productId && item.productSize === productSize);
      const updatedCart = [...cart];

      if (existingItemIndex < 0) {
            const newItem = {
                  productId: productId,
                  productSize: productSize,
                  productData: productData,
                  quantity: quantity
            }

            updatedCart.push(newItem);

            const productsTotalNumber = updatedCart.reduce((totalNumber, cartProduct) => {
                  return totalNumber + cartProduct.quantity
            }, 0);

            return updateObject(state, { cart: updatedCart, cartProductNumber: productsTotalNumber });
      }

      updatedCart[existingItemIndex].quantity = cart[existingItemIndex].quantity + quantity;
      const productsTotalNumber = updatedCart.reduce((totalNumber, cartProduct) => {
            return totalNumber + cartProduct.quantity;
      }, 0);

      return updateObject(state, { cart: updatedCart, cartProductNumber: productsTotalNumber });
}

const removeFromCart = (state, action) => {
      const { cart } = state;
      const { productId, productSize } = action;

      const existingItemIndex = cart.findIndex(item => item.productId === productId && item.productSize === productSize);

      if (existingItemIndex < 0) return state;
      if (cart[existingItemIndex].quantity <= 1) return state;

      const updatedCart = [...cart];

      updatedCart[existingItemIndex].quantity = cart[existingItemIndex].quantity - 1;

      const productsTotalNumber = updatedCart.reduce((totalNumber, cartProduct) => {
            return totalNumber + cartProduct.quantity;
      }, 0);

      return updateObject(state, { cart: updatedCart, cartProductNumber: productsTotalNumber });
}

const deleteFromCart = (state, action) => {
      const { cart } = state;
      const { productId, productSize } = action;

      const updatedCart = cart.filter(cartItem => !(cartItem.productId === productId && cartItem.productSize === productSize));

      const productsTotalNumber = updatedCart.reduce((totalNumber, cartProduct) => {
            return totalNumber + cartProduct.quantity;
      }, 0);
      return updateObject(state, { cart: updatedCart, cartProductNumber: productsTotalNumber });
}

const startPaymentProcess = (state, action) => {
      return updateObject(state, { paymentStarted: true })
}

const endPaymentProcess = (state, action) => {
      return updateObject(state, { paymentStarted: false })
}

const resetCart = (state, action) => {
      return initialState;
}

const reducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.ADD_TO_CART:
                  return addToCart(state, action);
            case actionTypes.REMOVE_FROM_CART:
                  return removeFromCart(state, action);
            case actionTypes.DELETE_FROM_CART:
                  return deleteFromCart(state, action);
            case actionTypes.RESET_CART:
                  return resetCart();
            case actionTypes.START_PAYMENT_PROCESS:
                  return startPaymentProcess(state, action);
            case actionTypes.END_PAYMENT_PROCESS:
                  return endPaymentProcess(state, action);
            default:
                  return state;
      }
}

export default reducer;