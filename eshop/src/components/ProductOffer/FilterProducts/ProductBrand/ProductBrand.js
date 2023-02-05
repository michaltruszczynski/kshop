import React from 'react';

import DynamicDropDown from '../../../Form/DynamicDropDown/DynamicDropDown';

import useFetch from '../../../../hooks/useFetch';

import { productBrandInputConfig } from './productBrandInputConfig'

const ProductBrand = ({ inputBrandData, inputBrandChangeHandler, disabled }) => {
      const [fetchState] = useFetch('/shop/brands');

      const { status } = fetchState;

      const getOptionsArray = () => {
            if (!fetchState.data?.brands) return [];
            return fetchState.data.brands.map(brand => {
                  return {
                        key: brand._id,
                        value: brand.brandName,
                        displayValue: brand.brandName,
                  }
            })
      }

      return Object.values(productBrandInputConfig).map(formElement => (
            <DynamicDropDown
                  key={formElement.elementName}
                  label={false}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={inputBrandData[formElement.elementConfig.name].value}
                  options={getOptionsArray()}
                  touched={inputBrandData[formElement.elementConfig.name].touched}
                  isValid={true}
                  errors={inputBrandData[formElement.elementConfig.name].errors}
                  fetchStatus={status}
                  disabled={disabled}
                  onInputChange={inputBrandChangeHandler(formElement.elementConfig.name)}
            />
      ));
}

export default ProductBrand;