import React from 'react';

import styles from './OrderItem.module.scss';

const priceToDisplay = (price) => {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'PLN' }).format(price)
}

const OrderDetails = ({ productData }) => {

      const { productCategory, productBrand, productName, productType, productPrice, quantity, images, productId, productSize } = productData;

      return (
            <li className={styles['item']}>
                  <img className={styles['item__image']}
                        src={`http://localhost:5000/images/${images[0].fileName}`}
                        alt={productCategory} />
                  <div className={styles['item__details']}>
                        <div className={styles['item__description']}>
                              <p className={styles['item__data']}>
                                    <b>Product: </b>
                                    <span>{productCategory} </span>
                                    <span>{productName} </span>
                                    <span>{productType} </span>
                                    <span>{productBrand}</span>
                              </p>
                              <p className={[styles['item__data'], styles['item__data--small']].join(' ')}>
                                    <b>ID: </b>
                                    <span>{productId} </span>
                              </p>
                              <p className={styles['item__data']}>
                                    <b>Size: </b>
                                    <span>{productSize}</span>
                              </p>
                              <p className={styles['item__data']}>
                                    <b>Price: </b>
                                    <span>{priceToDisplay(productPrice)}</span>
                              </p>
                              <p className={styles['item__data']}>
                                    <b>Quantit: </b>
                                    <span>{quantity}</span>
                              </p>
                              <p className={styles['item__data']}>
                                    <b>Total price: </b>
                                    <span>{priceToDisplay(productPrice * quantity)}</span>
                              </p>
                        </div>
                  </div>
            </li>
      )
}

export default OrderDetails;