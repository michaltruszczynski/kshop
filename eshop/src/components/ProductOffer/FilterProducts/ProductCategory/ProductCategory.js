import React from 'react';

import InputField from '../../../Form/InputField/InputField';

import { producCategoryInputConfig } from './productCategoryInputConfig';

const ProductCategory = ({ inputTypeData, inputTypeChangeHandler, disabled }) => {

      return Object.values(producCategoryInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={false}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={inputTypeData[formElement.elementConfig.name].value}
                  touched={inputTypeData[formElement.elementConfig.name].touched}
                  isValid={true}
                  errors={inputTypeData[formElement.elementConfig.name].errors}
                  onInputChange={inputTypeChangeHandler(formElement.elementConfig.name)}
                  disabled={disabled}
            />
      ));
}

export default ProductCategory;