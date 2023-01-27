import React from 'react';

import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import ProductTypes from '../../../components/ProductTypes/ProductTypes';
import RecomendedProducts from '../../../components/RecomendedProducts/RecomendedProducts';
import Brands from '../../../components/Brands/Brands';

const Shop = () => {
      return (
            <>
                  <HeaderContent />
                  <ProductTypes />
                  <RecomendedProducts />
                  <Brands />
            </>
      )
}

export default Shop;