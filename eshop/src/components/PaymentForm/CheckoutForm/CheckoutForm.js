import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Button from '../../Button/Button';

import { setMessage, endPaymentProcess, authCheck, resetCart } from '../../../store/actions';

import { ErrorMessage, Message } from '../../../utility/helpers';

import styles from './CheckoutForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}


const CheckoutForm = ({ totalCartPrice }) => {
      const [loadingStatus, setLoadingStatus] = useState(asyncOperation.SUCCESS);
      const [paymentElementLoaded, setPaymentElementLoaded] = useState(false);
      const dispatch = useDispatch();
      const history = useHistory();

      const stripe = useStripe();
      const elements = useElements();


      useEffect(() => {
            return () => {
                  dispatch(endPaymentProcess())
            }
      }, [])

      const handleSubmit = async (event) => {
            event.preventDefault();
            if (!stripe || !elements) { return; }

            setLoadingStatus(asyncOperation.LOADING);

            try {
                  const response = await stripe.confirmPayment({
                        elements,
                        redirect: "if_required"
                  })

                  if (response.error) {
                        console.log(response.error);
                        if (response.error.type) {
                              return setLoadingStatus(asyncOperation.SUCCESS);
                        }
                        let stripeErrorMessage = 'Error occured while processing payment.'
                        if (response.error.message) {
                              stripeErrorMessage = response.error.message
                        }
                        const paymentErrorMessage = new Message(stripeErrorMessage);
                        const { message, messageDetailsArray } = paymentErrorMessage.getMessageData();
                        dispatch(setMessage(message, messageDetailsArray));
                        setLoadingStatus(asyncOperation.ERROR);
                        dispatch(endPaymentProcess());
                        history.push('/cart');
                  }

                  else if (response.paymentIntent.status === 'succeeded') {
                        console.log(response.paymentIntent.status)
                        const paymentCompletedMessage = new Message('Payment completed.');
                        paymentCompletedMessage.addMessageDetails('Thank you.');
                        const { message, messageDetailsArray } = paymentCompletedMessage.getMessageData();
                        dispatch(setMessage(message, messageDetailsArray));
                        dispatch(resetCart());
                        dispatch(authCheck());
                        setLoadingStatus(asyncOperation.SUCCESS);
                        history.push('/user');
                  }

            } catch (error) {
                  console.log(error);
                  const errorMsg = new ErrorMessage(error);
                  const { errorMessage, errorDetailsArray } = errorMsg.getErrorMessageData();
                  setLoadingStatus(asyncOperation.ERROR);
                  dispatch(setMessage(errorMessage, errorDetailsArray));
                  dispatch(endPaymentProcess())
                  history.push('/cart');
            }
      }

      const notifyWhenReady = () => {
            setPaymentElementLoaded(true)
      }

      const handleCancel = () => {
            dispatch(endPaymentProcess());
            history.push('/cart');
      }

      return (
            <form onSubmit={handleSubmit}>
                  <PaymentElement onReady={notifyWhenReady} />
                  {paymentElementLoaded &&
                        <div className={styles['button-container']}>
                              <Button
                                    buttonType='blue'
                                    buttonStyle='large'
                                    type='submit'
                                    disabled={!stripe || !elements} >
                                    {loadingStatus === asyncOperation.LOADING ? 'Loading' : 'Pay now'}
                              </Button>
                              {loadingStatus !== asyncOperation.LOADING && (
                                    <Button
                                          buttonType='blue'
                                          buttonStyle='large'
                                          type='button'
                                          onClick={handleCancel}
                                          disabled={!stripe || !elements} >
                                          Cancel
                                    </Button>
                              )}
                        </div>
                  }
            </form>

      )
}


export default CheckoutForm;

