import React from 'react';

import AddProductForm from '../../components/AddProductForm/AddProductForm';

import styles from './addProduct.module.scss';

const Add = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Product</h1>
                        </div>
                        <div>
                              <AddProductForm />
                        </div>
                  </div>
            </section>
      )
}

export default Add;