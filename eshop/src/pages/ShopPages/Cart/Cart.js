import React from 'react';

import CartData from '../../../components/CartData/CartData';

import styles from './Cart.module.scss';

const Cart = () => {

      return (
            <section className={styles['section']} >
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Your Cart</h1>
                        </div>
                        <CartData />
                  </div>
            </section>
      )
}

export default Cart;