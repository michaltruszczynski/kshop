import React from 'react';

import InputField from '../../../Form/InputField/InputField';

import { productSortInputConfig } from './productSortInputConfig';

const SortProducts = ({ inputSortData, inputSortChangeHandler, disabled }) => {

      return Object.values(productSortInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={false}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={inputSortData[formElement.elementConfig.name].value}
                  touched={inputSortData[formElement.elementConfig.name].touched}
                  isValid={true}
                  errors={inputSortData[formElement.elementConfig.name].errors}
                  onInputChange={inputSortChangeHandler(formElement.elementConfig.name)}
                  disabled={disabled}
            />
      ));
}

export default SortProducts;