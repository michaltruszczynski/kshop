import React from 'react';

import PaymentForm from '../../components/PaymentForm/PaymentForm'

import styles from './PaymentPage.module.scss';

const PaymentPage = () => {
      return (
            <section className={styles['section']} >
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Payment</h1>
                        </div>
                        <div>
                              <PaymentForm />
                        </div>
                  </div>
            </section>
      )
}

export default PaymentPage;