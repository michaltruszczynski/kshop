import React from 'react';
import { useSelector } from 'react-redux';

import styles from './CartIcon.module.scss';

const CartIcon = () => {
      const productsNumber = useSelector(state => state.cart.cartProductNumber);

      return (
            <div className={styles['cart-icon']}>
                  <div className={styles['icon-container']}>
                        <i className="bx bx-shopping-bag"></i>
                        <div className={styles['item-number']}>{productsNumber}</div>
                  </div>
            </div>
      )
}

export default CartIcon