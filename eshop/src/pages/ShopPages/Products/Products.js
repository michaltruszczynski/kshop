import React, { useLayoutEffect } from 'react';
import { useLocation, useHistory } from 'react-router';

import ProductOffer from '../../../components/ProductOffer/ProductOffer';
import FilterProducts from '../../../components/ProductOffer/FilterProducts/FilterProducts';

import useForm from '../../../hooks/useForm';

import { productBrandInputConfig } from '../../../components/ProductOffer/FilterProducts/ProductBrand/productBrandInputConfig';
import { producCategoryInputConfig } from '../../../components/ProductOffer/FilterProducts/ProductCategory/productCategoryInputConfig';
import { productSortInputConfig } from '../../../components/ProductOffer/FilterProducts/SortProducts/productSortInputConfig';

import styles from './Products.module.scss';

const Products = () => {
   const [inputCategoryData, , inputTypeChangeHandler] = useForm(producCategoryInputConfig);
   const [inputBrandData, , inputBrandChangeHandler] = useForm(productBrandInputConfig);
   const [inputSortData, , inputSortChangeHandler] = useForm(productSortInputConfig);
   const history = useHistory();
   const { search } = useLocation();

   const {
      productCategory: { value: productsCategory, isValid: productsCategoryIsValid },
   } = inputCategoryData;
   const {
      productBrand: { value: productsBrand, isValid: productsBrandIsValid },
   } = inputBrandData;
   const {
      sortProducts: { value: productsSort, isValid: productsSortIsValid },
   } = inputSortData;

   useLayoutEffect(() => {
      const URLParams = new URLSearchParams(search);
      const urlCategory = URLParams.get('category');
      if (!urlCategory) return;
      inputTypeChangeHandler('productCategory')(urlCategory);
      history.replace('shop');
   }, []);

   return (
      <section className={styles['section']}>
         <div className={styles['section__container']}>
            <FilterProducts
               inputCategoryData={inputCategoryData}
               inputBrandData={inputBrandData}
               inputSortData={inputSortData}
               inputTypeChangeHandler={inputTypeChangeHandler}
               inputBrandChangeHandler={inputBrandChangeHandler}
               inputSortChangeHandler={inputSortChangeHandler}
            />
            <ProductOffer
               productsCategory={productsCategory}
               productsBrand={productsBrand}
               productsSort={productsSort}
               productsCategoryIsValid={productsCategoryIsValid}
               productsBrandIsValid={productsBrandIsValid}
               productsSortIsValid={productsSortIsValid}
            />
         </div>
      </section>
   );
};

export default Products;
