import React from 'react';

import AddBrandForm from '../../../components/AddBrandForm/AddBrandForm';

import styles from './AddBrand.module.scss';

const AddBrand = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Brand</h1>
                        </div>
                        <div>
                              <AddBrandForm />
                        </div>
                  </div>
            </section>
      )
}

export default AddBrand;