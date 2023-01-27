import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { productDescriptionInputsConfig } from './productDescriptionInputsConfig';

const ProductDescriptionInputs = ({ inputsDescriptionData, inputsDescriptionDataChangeHandler, disabled }) => {

      const renderProductDescriptionInputs = () => {
            return Object.values(productDescriptionInputsConfig).map(formElement => (
                  <InputField
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={inputsDescriptionData[formElement.elementConfig.name].value}
                        touched={inputsDescriptionData[formElement.elementConfig.name].touched}
                        isValid={inputsDescriptionData[formElement.elementConfig.name].isValid}
                        errors={inputsDescriptionData[formElement.elementConfig.name].errors}
                        onInputChange={inputsDescriptionDataChangeHandler(formElement.elementConfig.name)}
                        disabled={disabled}
                  />
            ));
      }

      return (
            <>
                  {renderProductDescriptionInputs()}
            </>
      )
}

export default ProductDescriptionInputs;