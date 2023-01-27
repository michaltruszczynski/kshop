import React from 'react';
import { useParams } from 'react-router-dom'

import EditSizeChartForm from '../../../components/EditSizeChartForm/EditSizeChartForm';

import styles from './EditSizeChartSystem.module.scss';

const EditSizeChartSystem = () => {
      const { id } = useParams();

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Size Chart System</h1>
                        </div>
                        <div>
                              <EditSizeChartForm key={id} />
                        </div>
                  </div>
            </section>
      )
}

export default EditSizeChartSystem;