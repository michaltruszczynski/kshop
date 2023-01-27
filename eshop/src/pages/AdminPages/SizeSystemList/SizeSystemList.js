import React from 'react';

import SectionTitle from '../../../components/UI/SectionTitle/SectionTitle';
import SizeSystemTable from '../../../components/SizeSystemTable/SizeSystemTable';

import styles from './SizeSystemList.module.scss';

const SizeSystemList = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <SectionTitle sectionTitle={'Size system list'} />
                        <SizeSystemTable />
                  </div>
            </section>
      )
}

export default SizeSystemList;

