import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CartProductList from './CartProductList/CartProductList';
import CartSummary from './CartSummary/CartSummary';
import BackgroundContent from '../BackgroundContent/BackgroundContent';
import Button from '../Button/Button';
import ButtonLink from '../ButtonLink/ButtonLink';

import { startPaymentProcess } from '../../store/actions'

import styles from './CartData.module.scss';

const CartData = () => {

      const dispatch = useDispatch();
      const history = useHistory();
      const cartItems = useSelector(state => state.cart.cart);

      const discount = 0.1;
      const shippingCost = 10.99;

      const handleCheckout = () => {
            dispatch(startPaymentProcess());
            history.push('/checkout');
      }

      const getCartPriceData = (cartItems = [], discount = 0, shippingCost = 0) => {

            const getProductsTotalPrice = (cartItems) => {
                  if (!cartItems.length) return 0;
                  const totalCartPrice = cartItems.reduce((totalPrice, cartItem) => {
                        return totalPrice + cartItem.quantity * cartItem.productData.productPrice
                  }, 0);

                  return totalCartPrice;
            }

            const productsSubTotalPrice = getProductsTotalPrice(cartItems);

            const priceDiscount = productsSubTotalPrice * discount;

            const productsTotalPrice = productsSubTotalPrice - priceDiscount + shippingCost;

            return { productsSubTotalPrice, priceDiscount, productsTotalPrice }
      }

      const { productsSubTotalPrice, priceDiscount, productsTotalPrice } = getCartPriceData(cartItems, discount, shippingCost);


      if (!cartItems.length || !cartItems) {
            return (
                  <BackgroundContent>
                        <h1>Your cart is empty.</h1>
                  </BackgroundContent>
            )
      }

      return (
            <>
                  <div className={styles['cart-data-container']}>
                        <CartProductList cartItems={cartItems} />
                        <CartSummary
                              productsSubTotalPrice={productsSubTotalPrice}
                              priceDiscount={priceDiscount}
                              shippingCost={shippingCost}
                              productsTotalPrice={productsTotalPrice}
                        />
                  </div>
                  <div className={styles['cart-link-container']}>
                        <Button onClick={handleCheckout} buttonStyle='large' buttonType='blue'>
                              Checkout
                        </Button>
                        <ButtonLink linkPath="/shop" buttonStyle='square'>
                              Continiue Shopping
                        </ButtonLink>
                  </div>
            </>
      )
}

export default CartData;