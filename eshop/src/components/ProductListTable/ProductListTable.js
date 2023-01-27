import React from 'react';

import Table from '../Table/Table';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useFetch from '../../hooks/useFetch';

const ProductListTable = () => {
      const [state] = useFetch('/admin/allproducts');
      const { status, error } = state;

      // const {sizeSystems: list} = sizeSystemList
      // console.log(state);

      // tableData = [ {_id: 12345, colVal_1, colVal_2, colVal_3, ...}, {...}]

      const productsTableColumnsHeadings = ['#', 'Name', 'Type', 'Brand', 'Category', 'Options'];

      const sizeSystemTableOptions = {
            linkUrl: '/admin/editproduct/',
            icons: {
                  isEditable: true,
                  inStock: true,
                  inOffer: true
            }
      }


      console.log('[ProductListTable], rendering', state)

      const getProductsTableData = () => {
            if (!state.data?.products) return [];

            return state.data.products.map(product => {
                  return {
                        _id: product._id,
                        name: product.name,
                        type: product.type,
                        brand: product.brand,
                        category: product.category,
                        options: {
                              isOwner: product.isOwner,
                              inStock: product.inStock,
                              inOffer: product.inOffer
                        }

                  }
            });
      }

      const emptySizeSystemTableMessage = 'No products have been defined yet. '

      return (
            <AsyncOpBgComponent status={status} error={error}>
                  <Table
                        tableData={getProductsTableData()}
                        // state={state}
                        columnsHeading={productsTableColumnsHeadings}
                        options={sizeSystemTableOptions}
                        breakOn="medium"
                        emptyTableDataMessage={emptySizeSystemTableMessage} />
            </AsyncOpBgComponent>
      )
}

export default ProductListTable