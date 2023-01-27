import React from 'react';
import { useParams } from 'react-router-dom'

import EditProductForm from '../../../components/EditProductForm/EditProductForm';

import styles from './EditProduct.module.scss';

const EditProduct = () => {
      const { id } = useParams()

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Product</h1>
                        </div>
                        <div>
                              <EditProductForm key={id} />
                        </div>
                  </div>
            </section>
      )
}

export default EditProduct;