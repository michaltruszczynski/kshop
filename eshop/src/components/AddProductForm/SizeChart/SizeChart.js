import React from 'react';

import InputField from '../../Form/InputField/InputField';
import DefinedSizeChart from './DefinedSizeChart/DefinedSizeChart';
import CustomSizeChart from '../../Form/CustomSizeChart/CustomSizeChart';

import { sizeChartSystemInputConfig } from './sizeChartSystemInputConfig';


const SizeChart = ({ inputSizeSystemData, inputSizeSystemChangeHandler, inputSizeChartData, inputSizeChartDataChangeHandler }) => {
      const { sizeChart } = inputSizeChartData;
      const { sizeSystem } = inputSizeSystemData;

      const handleSizeSystremInputChange = (value) => {
            if (sizeSystem.value === 'predefined') {
                  inputSizeSystemChangeHandler('sizeSystem')(value);
                  inputSizeChartDataChangeHandler('sizeChart')([{ sizeDescription: '' }], false)
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
                        changeInput={handleSizeSystremInputChange}
                  />
            ));
      }

      return (
            <>
                  {renderSizeChartSystemInput()}
                  {sizeSystem.value === 'predefined' ? <DefinedSizeChart changeSizeChart={inputSizeChartDataChangeHandler('sizeChart')} changeSizeSystem={inputSizeSystemChangeHandler('sizeSystem')} sizeChart={sizeChart} /> : null}
                  {sizeSystem.value === 'custom' ? <CustomSizeChart changeSizeChart={inputSizeChartDataChangeHandler('sizeChart')} sizeChart={sizeChart} /> : null}
            </>
      )
}

export default SizeChart;