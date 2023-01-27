import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import RecomendedProducts from '../../../components/RecomendedProducts/RecomendedProducts';
import ProductData from '../../../components/ProductData/ProductData';
import AsyncOpBgComponent from '../../../components/AsyncOpBgComponent/AsyncOpBgComponent';


import { getShopProduct } from '../../../services/shopServices'

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const ProductPage = () => {
      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
      const [product, setProduct] = useState(null)
      const { id } = useParams()

      useEffect(() => {
            if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);

            const getProductDetails = async () => {
                  setAsyncCallStatus(asyncOperation.LOADING);
                  try {
                        const response = await getShopProduct(id);
                        console.log(response.data)
                        const product = response.data;
                        setProduct(product);
                        setAsyncCallStatus(asyncOperation.SUCCESS);
                  } catch (error) {
                        console.log(error.response);
                        setAsyncCallStatus(asyncOperation.ERROR);
                  }
            }

            getProductDetails();

      }, [id])

      return (
            <AsyncOpBgComponent status={asyncCallStatus}>
                  <ProductData product={product}/>
                  <RecomendedProducts />
            </AsyncOpBgComponent>
      )
}

export default ProductPage;