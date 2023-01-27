import React from 'react';

import Table from '../Table/Table';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useFetch from '../../hooks/useFetch';

const BrandListTable = () => {
      const [state] = useFetch('/admin/brands');

      console.log(state);
      const { status } = state;

      // tableData = [ {_id: 12345, colVal_1, colVal_2, colVal_3, ...}, {...}]

      const brandListTableColumnsHeadings = ['#', 'Name', 'Options'];

      const brandTableOptions = {
            linkUrl: '/admin/editbrand/',
            icons: {
                  isEditable: true
            }
      };

      const getBrandTableData = () => {
            if (!state.data?.brands) return [];


            return state.data?.brands.map(brand => ({
                  _id: brand._id,
                  name: brand.brandName,
                  options: {
                        isOwner: brand.isOwner
                  }
            }))
      }

      const emptyBrandTableMessage = 'No brands have been defined yet.';

      return (
            <AsyncOpBgComponent status={status}>
                  <Table
                        tableData={getBrandTableData()}
                        state={state}
                        columnsHeading={brandListTableColumnsHeadings}
                        options={brandTableOptions}
                        breakOn="medium"
                        emptyTableDataMessage={emptyBrandTableMessage}
                  />
            </AsyncOpBgComponent>
      );
}

export default BrandListTable