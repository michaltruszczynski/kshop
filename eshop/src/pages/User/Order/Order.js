import React from 'react';

import OrderData from '../../../components/OrderData/OrderData';

import styles from './Order.module.scss';

const Order = () => {
      return (
            <section className={styles['section']} >
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Order Details</h1>
                        </div>
                        <OrderData />
                  </div>
            </section>
      )
}

export default Order;