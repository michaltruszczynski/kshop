import React from 'react';
import { useDispatch } from 'react-redux';

import QuantityInput from '../../../ProductData/ProductDetails/QuantityInput/QuantityInput';

import { addToCart, removeFormCart, deleteFromCart } from '../../../../store/actions';

import styles from './CartItem.module.scss';

const priceToDisplay = (price) => {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'PLN' }).format(price)
}

const CartItem = ({ itemData }) => {

      const dispatch = useDispatch();
      const {productId, productSize, quantity, productData} = itemData;
      const {productCategory, productBrand, productName, productType, productPrice, primaryImage} = productData

      const incrementQuantityHandler = () => {
            dispatch(addToCart(productId, productSize, 1, productData));
      }

      const decrementQuantityHandler = () => {
            dispatch(removeFormCart(productId, productSize))
      }

      const deleteItemFromCartHandler = (event) => {
            dispatch(deleteFromCart(productId, productSize))

      }

      return (
            <li className={styles['item']}>
                  <img className={styles['item__image']}
                        src={primaryImage.url}
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
                        </div>
                        <i onClick={deleteItemFromCartHandler} className={`bx bx-trash ${styles['item__delete-icon']}`}></i>
                  </div>
                  <div className={styles['item__quantity']}>
                        <QuantityInput
                              quantity={quantity}
                              onQuantityIncrement={incrementQuantityHandler}
                              onQuantityDecrement={decrementQuantityHandler}
                        />
                        <p className={styles['item__total-price']}>{priceToDisplay(productPrice * quantity)}</p>
                  </div>
            </li>
      )
}

export default CartItem;