import { axiosInstance } from './api';

const postPaymentInstent = cart => {
      return axiosInstance.post('/payment/create-payment-intent', cart);
}

export const paymentService = {
      postPaymentInstent
}