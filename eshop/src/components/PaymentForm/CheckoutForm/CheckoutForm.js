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
   ERROR: 'error',
};

const CheckoutForm = ({ totalCartPrice }) => {
   const [loadingStatus, setLoadingStatus] = useState(asyncOperation.SUCCESS);
   const [paymentElementLoaded, setPaymentElementLoaded] = useState(false);
   const dispatch = useDispatch();
   const history = useHistory();

   const stripe = useStripe();
   const elements = useElements();

   useEffect(() => {
      return () => {
         dispatch(endPaymentProcess());
      };
   }, []);

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
         return;
      }

      setLoadingStatus(asyncOperation.LOADING);

      try {
         const response = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
         });

         if (response.error) {
            if (response.error.type) {
               return setLoadingStatus(asyncOperation.SUCCESS);
            }
            let stripeErrorMessage = 'Error occured while processing payment.';
            if (response.error.message) {
               stripeErrorMessage = response.error.message;
            }
            const paymentErrorMessage = new Message(stripeErrorMessage);
            const { message, messageDetailsArray } = paymentErrorMessage.getMessageData();
            dispatch(setMessage(message, messageDetailsArray));
            setLoadingStatus(asyncOperation.ERROR);
            dispatch(endPaymentProcess());
            history.push('/cart');
         } else if (response.paymentIntent.status === 'succeeded') {
            const paymentCompletedMessage = new Message('Payment completed.');
            paymentCompletedMessage.addMessageDetails('See user page for order list.');
            const { message, messageDetailsArray } = paymentCompletedMessage.getMessageData();
            dispatch(setMessage(message, messageDetailsArray));
            dispatch(resetCart());
            dispatch(authCheck());
            setLoadingStatus(asyncOperation.SUCCESS);
            history.push('/');
         }
      } catch (error) {
         const errorMsg = new ErrorMessage(error);
         const { errorMessage, errorDetailsArray } = errorMsg.getErrorMessageData();
         setLoadingStatus(asyncOperation.ERROR);
         dispatch(setMessage(errorMessage, errorDetailsArray));
         dispatch(endPaymentProcess());
         history.push('/cart');
      }
   };

   const notifyWhenReady = () => {
      setPaymentElementLoaded(true);
   };

   const handleCancel = () => {
      dispatch(endPaymentProcess());
      history.push('/cart');
   };

   const paymentElementOptions = {
      layout: 'tabs',
   };

   return (
      <form onSubmit={handleSubmit}>
            <h1 className={styles['card-heading']}>Use test card numbers:</h1>
            <div className={styles['card-info']}>
            <p className={styles['label']}>Buy with success:</p><p className={styles['info']}>4242 4242 4242 4242</p>
            <p className={styles['label']}>Lost card decline: </p><p className={styles['info']}>4000 0000 0000 9987</p>
            <p className={styles['label']}>Expiration: </p><p className={styles['info']}>Use valid future date</p>
            <p className={styles['label']}>CVC: </p><p className={styles['info']}>Use any three-digit CVC</p>
            </div>
         <PaymentElement onReady={notifyWhenReady} options={paymentElementOptions} />
         {paymentElementLoaded && (
            <div className={styles['button-container']}>
               <Button
                  buttonType='blue'
                  buttonStyle='large'
                  type='submit'
                  disabled={!stripe || !elements}
               >
                  {loadingStatus === asyncOperation.LOADING ? 'Loading' : 'Pay now'}
               </Button>
               {loadingStatus !== asyncOperation.LOADING && (
                  <Button
                     buttonType='blue'
                     buttonStyle='large'
                     type='button'
                     onClick={handleCancel}
                     disabled={!stripe || !elements}
                  >
                     Cancel
                  </Button>
               )}
            </div>
         )}
      </form>
   );
};

export default CheckoutForm;
