import React from 'react';

import AddSizeChartForm from '../../components/AddSizeChartForm/AddSizeChartForm';

import styles from './AddSizeChartSystem.module.scss';

const AddSizeChartSystem = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Size Chart System</h1>
                        </div>
                        <div>
                              <AddSizeChartForm />
                        </div>
                  </div>
            </section>
      )
}

export default AddSizeChartSystem;