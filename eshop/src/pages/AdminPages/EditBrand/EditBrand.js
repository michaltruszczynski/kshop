import React from 'react';
import { useParams } from 'react-router-dom'

import EditBrandForm from '../../../components/EditBrandForm/EditBrandForm';

import styles from './EditBrand.module.scss';

const EditBrand = () => {
      const {id} = useParams();

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Brand</h1>
                        </div>
                        <div>
                              <EditBrandForm key={id} />
                        </div>
                  </div>
            </section>
      )
}

export default EditBrand;