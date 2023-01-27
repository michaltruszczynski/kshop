import React from 'react';

import SectionTitle from '../../../components/UI/SectionTitle/SectionTitle';
import ProductsListTable from '../../../components/ProductListTable/ProductListTable';

import styles from './ProductsList.module.scss';

const ProductsList = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <SectionTitle sectionTitle={'Product list'} />
                        <ProductsListTable />
                  </div>
            </section>
      )
}

export default ProductsList;
