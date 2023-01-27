import React from 'react';

import styles from './TotalPriceSummary.module.scss';

const priceToDisplay = (price) => {
      console.log(price)
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'PLN' }).format(price)
}

const TotalPriceSummary = ({ productsSubTotalPrice, priceDiscount, productsTotalPrice, shippingCost, title = 'Cart Summary' }) => {

      return (
            <div className={styles['summary']}>
                  <div className={styles['summary__sticky']}>
                        <h1>{title}</h1>
                        <div className={styles['summary__item']}>
                              <p className={styles['summary__item-name']}>Subtotal</p> <p>{priceToDisplay(productsSubTotalPrice)}</p>
                        </div>
                        <div className={styles['summary__item']}>
                              <p className={styles['summary__item-name']}>Discount</p> <p>- {priceToDisplay(priceDiscount)}</p>
                        </div>
                        <div className={styles['summary__item']}>
                              <p className={styles['summary__item-name']}>Shipping</p> <p>{priceToDisplay(shippingCost)}</p>
                        </div>
                        <div className={styles['summary__item']}>
                              <p className={[styles['summary__item-name'], styles['summary__item-name--bold']].join(' ')}>Total</p> <p>{priceToDisplay(productsTotalPrice)}</p>
                        </div>
                  </div>
            </div>


      )
}

export default TotalPriceSummary;