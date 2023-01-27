import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { sizeChartNameInputConfig } from './sizeChartNameInputConfig';

const SizeChartNameInput = ({inputSizeChartNameData, inputSizeChartNameDataChangeHandler, disabled}) => {

      const renderSizeChartNameInput = () => {
            return Object.values(sizeChartNameInputConfig).map(formElement => (
                  <InputField
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={inputSizeChartNameData[formElement.elementConfig.name].value}
                        touched={inputSizeChartNameData[formElement.elementConfig.name].touched}
                        isValid={inputSizeChartNameData[formElement.elementConfig.name].isValid}
                        errors={inputSizeChartNameData[formElement.elementConfig.name].errors}
                        onInputChange={inputSizeChartNameDataChangeHandler(formElement.elementConfig.name)}
                        disabled={disabled}
                  />
            ));
      }

      return (
            <>
                  {renderSizeChartNameInput()}
            </>
      )
}

export default SizeChartNameInput;