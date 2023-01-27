import React from 'react';

import styles from './Price.module.scss';

const Price = ({ sale, price, type }) => {
      const priceToDisplay = (price) => {
            return new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'PLN'}).format(price)
      }

      let productPrice = (
            <p>{priceToDisplay(price)}</p>
      )
      if (sale) {
            const reducedPrice = price * (1 - sale);
            productPrice = (
                  <p><del className={styles['price__reduced']}>{priceToDisplay(price)}</del>&nbsp;&nbsp;{priceToDisplay(reducedPrice)}</p>
            )
      }

      return (
            <div className={styles['price']}>
                  {productPrice}
            </div>
      )
}

export default Price;