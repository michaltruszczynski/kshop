import React from 'react';

import SectionTitle from '../../../components/UI/SectionTitle/SectionTitle';
import BrandListTable from '../../../components/BrandListTable/BrandListTable';

import styles from './BrandList.module.scss';

const BrandList = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <SectionTitle sectionTitle={'Brand list'} />
                        <BrandListTable />
                  </div>
            </section>
      )
}

export default BrandList;
