import React from 'react';

import DynamicDropDown from '../../Form/DynamicDropDown/DynamicDropDown';

import useFetch from '../../../hooks/useFetch';

import { productBrandInputConfig } from './productBrandInputConfig';

const ProductBrandInput = ({ inputBrandData, inputBrandChangeHandler, disabled }) => {

      const [fetchState] = useFetch('/admin/brands');

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

      const renderProductBrandDropDown = () => {
            return Object.values(productBrandInputConfig).map(formElement => (
                  <DynamicDropDown
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={inputBrandData[formElement.elementConfig.name].value}
                        options={getOptionsArray()}
                        touched={inputBrandData[formElement.elementConfig.name].touched}
                        isValid={inputBrandData[formElement.elementConfig.name].isValid}
                        errors={inputBrandData[formElement.elementConfig.name].errors}
                        fetchStatus={status}
                        disabled={disabled}
                        onInputChange={inputBrandChangeHandler(formElement.elementConfig.name)}
                  />
            ));
      }

      return (renderProductBrandDropDown())
}

export default ProductBrandInput;