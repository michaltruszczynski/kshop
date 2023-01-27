import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { brandNameInputConfig } from './brandNameInputConfig';

const BrandNameInput = ({inputBrandNameData, inputBrandNameDataChangeHandler}) => {

      const renderBrandNameInput = () => {
            return Object.values(brandNameInputConfig).map(formElement => (
                  <InputField
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={inputBrandNameData[formElement.elementConfig.name].value}
                        touched={inputBrandNameData[formElement.elementConfig.name].touched}
                        isValid={inputBrandNameData[formElement.elementConfig.name].isValid}
                        errors={inputBrandNameData[formElement.elementConfig.name].errors}
                        changeInput={inputBrandNameDataChangeHandler(formElement.elementConfig.name)}
                  />
            ));
      }

      return (
            <>
                  {renderBrandNameInput()}
            </>
      )
}

export default BrandNameInput;