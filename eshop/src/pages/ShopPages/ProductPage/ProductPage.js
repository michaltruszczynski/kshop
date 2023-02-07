import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RecomendedProducts from '../../../components/RecomendedProducts/RecomendedProducts';
import ProductData from '../../../components/ProductData/ProductData';
import AsyncOpBgComponent from '../../../components/AsyncOpBgComponent/AsyncOpBgComponent';
import BackgroundContent from '../../../components/BackgroundContent/BackgroundContent';
import { getShopProduct } from '../../../services/shopServices';

import { ErrorMessage } from '../../../utility/helpers';

const asyncOperation = {
   IDLE: 'idle',
   SUCCESS: 'success',
   LOADING: 'loading',
   ERROR: 'error',
};

const ProductPage = () => {
   const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
   const [product, setProduct] = useState(null);
   const [error, setError] = useState(null);
   const { id } = useParams();

   useEffect(() => {
      if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);

      const getProductDetails = async () => {
         setAsyncCallStatus(asyncOperation.LOADING);
         try {
            const response = await getShopProduct(id);
            const product = response.data;
            setProduct(product);
            setAsyncCallStatus(asyncOperation.SUCCESS);
         } catch (error) {
            const errorMsg = new ErrorMessage(error);
            setError(errorMsg);
            setAsyncCallStatus(asyncOperation.ERROR);
         }
      };

      getProductDetails();
   }, [id]);

   return (
      <AsyncOpBgComponent
         status={asyncCallStatus}
         error={error}
         showErrorMessage={true}
      >
         {product ? (
            <>
               <ProductData product={product} />
               <RecomendedProducts />
            </>
         ) : (
            <BackgroundContent>
               <h1>No product have been found.</h1>
            </BackgroundContent>
         )}
      </AsyncOpBgComponent>
   );
};

export default ProductPage;
