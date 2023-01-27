import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/actions';

import Button from '../../../components/Button/Button';

import styles from './ProductDetails.module.scss';
import SelectSize from './SelectSize/SelectSize';
import QuantityInput from './QuantityInput/QuantityInput';

import useForm from '../../../hooks/useForm';

import { selectSizeInputConfig } from './SelectSize/SelectSizeInputConfig';

const ProductDetails = ({ product }) => {

      const [inputSizeData, inputSizeIsValid, inputSizeChangeHandler] = useForm(selectSizeInputConfig)
      const [quantity, setQuantity] = useState(1);
      const dispatch = useDispatch();

      const { _id: productId, category: productCategory, name: productName, type: productType, brand: productBrand, price: productPrice, sizeChart, description, primaryImage } = product;

      const quantityIncrementHandler = () => {
            setQuantity(quantity => quantity + 1);
      }

      const quantityDecrementHandler = () => {
            setQuantity(quantity => quantity - 1);
      }

      const displayPriceFormat = value => {
            const formatter = new Intl.NumberFormat('ru-RU', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
            });
            if (!value) return formatter.format(0);

            return formatter.format(value);
      }

      const addToCartHandler = () => {
            const productData = {
                  productId,
                  productName,
                  productType,
                  productBrand,
                  productPrice,
                  productCategory,
                  primaryImage
            }
            dispatch(addToCart(productId, inputSizeData.selectedProductSize.value, quantity, productData));
            setQuantity(1);
      }

      return (
            <div className={styles['product']}>
                  <span className={styles['nav-path']}>Home / Kites</span>
                  <h1 className={styles['product__name']}>{productName}</h1>
                  <h2 className={styles['product__type']}>{productBrand}</h2>
                  <h2 className={styles['product__type']}>{productType}</h2>
                  <div className={styles['product__price']}>{displayPriceFormat(productPrice)} zł</div>
                  <form className={styles['order']}>
                        <SelectSize
                              sizeChart={sizeChart}
                              onSizeChange={inputSizeChangeHandler('selectedProductSize')}
                              sizeData={inputSizeData.selectedProductSize}
                        />
                        <div className={styles['order__quantity']}>
                              <QuantityInput
                                    quantity={quantity}
                                    onQuantityIncrement={quantityIncrementHandler}
                                    onQuantityDecrement={quantityDecrementHandler} />
                              <div className={styles['order__submit']}>
                                    <Button
                                          buttonType="success"
                                          buttonStyle="standard"
                                          type="button"
                                          disabled={!inputSizeIsValid}
                                          onClick={addToCartHandler}
                                    >Add to Cart</Button>
                              </div>
                        </div>
                  </form>
                  <div>
                        <h3 className={styles['product__details']}>Product Details</h3>
                        <p className={styles['product__description']}>{description}</p>
                  </div>
            </div>
      )
}

export default ProductDetails;