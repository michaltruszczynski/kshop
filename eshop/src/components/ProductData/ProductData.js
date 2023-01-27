import React from 'react';
import Slider from '../../components/Carousel/Slider';
import ProductDetails from './ProductDetails/ProductDetails';

import styles from './ProductData.module.scss';

const ProductData = ({ product }) => {
      if (!product) return;
      const { images } = product;

      const getImagesAray = () => {
            return images.map(image => image.url)
      }

      return (
            <div className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['product-container']}>
                              <Slider autoPlay={false} controls={true} imagesArray={getImagesAray()} imagesMaxNumber={1} />
                              <ProductDetails product={product} />
                        </div>
                  </div>
            </div>
      )
}

export default ProductData;