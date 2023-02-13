import React from 'react';
import { useParams } from 'react-router-dom'

import EditBrandForm from '../../../components/EditBrandForm/EditBrandForm';

import styles from './EditBrand.module.scss';

const EditBrand = () => {
      const {id} = useParams();

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div>
                              <EditBrandForm key={id} />
                        </div>
                  </div>
            </section>
      )
}

export default EditBrand;