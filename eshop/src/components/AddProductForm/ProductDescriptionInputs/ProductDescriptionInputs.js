import React from 'react';
import InputField from '../../../components/Form/InputField/InputField';

import { productDescriptionInputsConfig } from './productDescriptionInputsConfig'

const ProductDescriptionInputs = ({inputsDescriptionData, inputsDescriptionDataChangeHandler}) => {

      const renderFormInputs = () => {
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
                        changeInput={inputsDescriptionDataChangeHandler(formElement.elementConfig.name)}
                  />
            ));
      }
      return renderFormInputs();
}

export default ProductDescriptionInputs;