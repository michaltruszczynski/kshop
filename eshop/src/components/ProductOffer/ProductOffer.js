import React, { useState, useEffect } from 'react';

import Product from '../Product/Product';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import Pagination from '../Pagination/Pagination';
import BackgroundContent from '../BackgroundContent/BackgroundContent';

import useFetch from '../../hooks/useFetch'

import styles from './ProductOffer.module.scss';

const ProductOffer = ({
      productsCategory,
      productsBrand,
      productsSort,
      productsCategoryIsValid,
      productsBrandIsValid,
      productsSortIsValid,
}) => {
      const [productUrl, setProductUrl] = useState(null);
      const [currentPage, setCurrentPage] = useState(1);
      const [state] = useFetch(productUrl);
      const { status } = state;
      const productsPerPage = 6;
      console.log('rendering ProductOffer', state);
      console.log(currentPage)

      useEffect(() => {
            setCurrentPage(1);
            console.log('pagechange')
      }, [productsCategory, productsBrand, productsSort, productsCategoryIsValid, productsBrandIsValid, productsSortIsValid]);

      useEffect(() => {
            const searchProductUrlAPI = new URLSearchParams();
            console.log('testing')
            if (productsCategoryIsValid) {
                  searchProductUrlAPI.append('productsCategory', productsCategory);
            }

            if (productsBrandIsValid) {
                  searchProductUrlAPI.append('productsBrand', productsBrand);
            }

            if (productsSortIsValid) {
                  searchProductUrlAPI.append('productsSort', productsSort);
            }

            if (currentPage) {
                  searchProductUrlAPI.append('page', currentPage);
            }

            if (productsPerPage) {
                  searchProductUrlAPI.append('pageLimit', productsPerPage);
            }

            setProductUrl(`/shop/products?${searchProductUrlAPI.toString()}`);

      }, [productsCategory, productsBrand, productsSort, productsCategoryIsValid, productsBrandIsValid, productsSortIsValid, currentPage, productsPerPage]);

      const changePageHandler = (pageNumber) => {
            setCurrentPage(pageNumber)
      }

      return (
            <>
                  <AsyncOpBgComponent status={status}>
                        {(!state.data?.products || !state.data?.products.length) && (
                              <BackgroundContent>
                                    <h1>No products available.</h1>
                              </BackgroundContent>
                        )}
                        <div className={styles['products']}>
                              {state.data?.products.length ? state.data?.products.map(product => {
                                    return <Product
                                          key={product._id}
                                          id={product._id}
                                          productImage={product.primaryImage}
                                          productName={product.name}
                                          productPrice={product.price}
                                          productBrand={product.brand}
                                    />
                              }) : null}
                        </div>
                        <Pagination
                              totalCount={state.data?.productsCount}
                              currentPage={currentPage}
                              onPageChange={changePageHandler}
                              pageSize={productsPerPage} />
                  </AsyncOpBgComponent>
            </>
      )
}

export default ProductOffer;