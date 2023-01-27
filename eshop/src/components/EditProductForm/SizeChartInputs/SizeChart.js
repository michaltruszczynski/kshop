import React from 'react';

import InputField from '../../Form/InputField/InputField';
import DefinedSizeChart from './DefinedSizeChart/DefinedSizeChart';
import CustomSizeChart from '../../Form/CustomSizeChart/CustomSizeChart';

import { sizeChartSystemInputConfig } from './sizeChartSystemInputConfig';

const SizeChart = ({ inputSizeSystemData, inputSizeSystemChangeHandler, sizeSystemIdData, sizeSystemIdDataChangeHandler, inputSizeChartData, inputSizeChartDataChangeHandler, disabled }) => {
      const { sizeChart } = inputSizeChartData;
      const { sizeSystem } = inputSizeSystemData;

      const handleSizeSystemInputChange = (value) => {
            if (sizeSystem.value === 'predefined') {
                  inputSizeSystemChangeHandler('sizeSystem')(value);
                  inputSizeChartDataChangeHandler('sizeChart')([{ sizeDescription: '' }], false);
                  sizeSystemIdDataChangeHandler('sizeSystemId')('');

            }
            inputSizeSystemChangeHandler('sizeSystem')(value);
      }

      const renderSizeChartSystemInput = () => {
            return Object.values(sizeChartSystemInputConfig).map(formElement => (
                  <InputField
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={inputSizeSystemData[formElement.elementConfig.name].value}
                        touched={inputSizeSystemData[formElement.elementConfig.name].touched}
                        isValid={inputSizeSystemData[formElement.elementConfig.name].isValid}
                        errors={inputSizeSystemData[formElement.elementConfig.name].errors}
                        onInputChange={handleSizeSystemInputChange}
                        disabled={disabled}
                  />
            ));
      }

      return (
            <>
                  {renderSizeChartSystemInput()}
                  {sizeSystem.value === 'predefined' ?
                        <DefinedSizeChart
                              sizeChart={sizeChart}
                              changeSizeChart={inputSizeChartDataChangeHandler('sizeChart')}
                              sizeSystemIdData={sizeSystemIdData}
                              changeSizeSystemId={sizeSystemIdDataChangeHandler('sizeSystemId')}
                              changeSizeSystem={inputSizeSystemChangeHandler('sizeSystem')}
                              disabled={disabled} />
                        : null}
                  {sizeSystem.value === 'custom' ?
                        <CustomSizeChart
                              changeSizeChart={inputSizeChartDataChangeHandler('sizeChart')}
                              sizeChart={sizeChart}
                              disabled={disabled} />
                        : null}
            </>
      )
}

export default SizeChart;