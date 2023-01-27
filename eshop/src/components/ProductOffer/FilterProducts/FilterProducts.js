import React from 'react';

import ProductBrand from './ProductBrand/ProductBrand';
import ProductCategory from './ProductCategory/ProductCategory';
import SortProducts from './SortProducts/SortProducts';

import styles from './FilterProducts.module.scss'

const FilterProducts = ({
      inputCategoryData,
      inputBrandData,
      inputSortData,
      inputTypeChangeHandler,
      inputBrandChangeHandler,
      inputSortChangeHandler
}) => {

      return (
            <div className={styles['filter']}>
                  <div className={styles['filter__group']}>
                        <h1 className={styles['filter__name']}>
                              Filter
                        </h1>
                        <div className={styles['filter__subgroup']}>
                              <div className={[styles['filter__category'], styles['filter__category--m-right']].join(' ')}>
                                    <ProductCategory
                                          inputTypeData={inputCategoryData}
                                          inputTypeChangeHandler={inputTypeChangeHandler}
                                          disabled={false} />
                              </div>
                              <div className={styles['filter__category']}>
                                    <ProductBrand
                                          inputBrandData={inputBrandData}
                                          inputBrandChangeHandler={inputBrandChangeHandler}
                                          disabled={false}
                                    />
                              </div>
                        </div>
                  </div>
                  <div className={styles['filter__group']}>
                        <h1 className={styles['filter__name']}>
                              Sort
                        </h1>
                        <div className={styles['filter__category']}>
                              <SortProducts
                                    inputSortData={inputSortData}
                                    inputSortChangeHandler={inputSortChangeHandler}
                                    disabled={false}
                              />
                        </div>
                  </div>
            </div>
      )
}

export default FilterProducts;