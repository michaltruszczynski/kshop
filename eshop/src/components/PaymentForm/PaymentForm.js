import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm/CheckoutForm';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import CartSummary from '../CartData/CartSummary/CartSummary';

import { paymentService } from '../../services/paymentService';
import { ErrorMessage, Message } from '../../utility/helpers';
import { setRedirectPath, setMessage } from '../../store/actions';

import styles from './PaymentForm.module.scss';

const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;
const stripePromise = loadStripe('pk_test_ZSIVv4ipVlyYZescPHUSte1F00lV0sfi4o');

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const Payment = () => {
      const [loadingStatus, setLoadingStatus] = useState(asyncOperation.IDLE);
      const [error, setError] = useState(null);
      const [paymentData, setPaymentData] = useState({});
      const cart = useSelector(state => state.cart);
      const auth = useSelector(state => state.auth);
      const history = useHistory();
      const dispatch = useDispatch();
      const { paymentStarted } = cart;
      const { userId } = auth;

      useEffect(() => {
            const showRedirectMessage = () => {
                  const redirectMessage = new Message('You must be signin to proceed with payment.');
                  const { message, messageDetailsArray } = redirectMessage.getMessageData();
                  dispatch(setMessage(message, messageDetailsArray));
            }

            const createPaymentIntent = async (cart) => {
                  try {
                        setLoadingStatus(asyncOperation.LOADING);
                        const paymentData = await paymentService.postPaymentInstent(cart);
                        setPaymentData(paymentData.data);
                        setLoadingStatus(asyncOperation.SUCCESS);
                  } catch (error) {
                        console.log(error);
                        const errorMsg = new ErrorMessage(error);
                        setError(errorMsg);
                        setLoadingStatus(asyncOperation.ERROR);
                        history.push('/cart');
                  }
            }

            if (!paymentStarted || !cart.cart.length) {
                  history.push('/cart');
                  return;
            }

            if (!userId) {
                  history.push('/signin');
                  dispatch(setRedirectPath('/checkout'));
                  showRedirectMessage()
                  return;
            }

            createPaymentIntent(cart);

      }, [cart, paymentStarted, userId, dispatch, history]);

      const appearance = {
            theme: 'stripe',
            variables: {
                  colorText: '#243a6f',
                  fontFamily: 'Poppins, sans-serif',
                  fontSizeSm: '15px',
                  fontWeightNormal: '600'
            }
      };

      const { clientSecret, orderSubTotal, priceDiscount, shippingCost, orderTotal } = paymentData

      console.log(clientSecret, orderSubTotal, priceDiscount, shippingCost, orderTotal)

      const options = {
            clientSecret,
            appearance,
            locale: 'en'
      };

      return (
            <div className={styles['payment-form-container']}>
                  <AsyncOpBgComponent status={loadingStatus} error={error} showErrorMessage={true}>
                        <div className={styles['order-summary']}>
                              <CartSummary
                                    productsSubTotalPrice={parseFloat(orderSubTotal).toFixed(2)}
                                    priceDiscount={parseFloat(priceDiscount).toFixed(2)}
                                    shippingCost={parseFloat(shippingCost).toFixed(2)}
                                    productsTotalPrice={parseFloat(orderTotal).toFixed(2)}
                                    title='Order summary'
                              />
                        </div>
                        <div>
                              {clientSecret && <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm totalCartPrice={orderTotal} />
                              </Elements>}
                        </div>
                  </AsyncOpBgComponent>
            </div>
      )
}

export default Payment;