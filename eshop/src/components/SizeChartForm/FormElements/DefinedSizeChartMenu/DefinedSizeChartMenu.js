import React, { useState, useEffect } from 'react';

import InputField from '../../../Form/InputField/InputField';
import SizeInput from '../SizeInput/SizeInput';

import { predefinedSizeChart } from '../../data';
import { required, validateInput } from '../../../../utility/validators';

import styles from './DynamicSizeChartMenu.module.scss';

const predefinedInput = {
      elementName: 'Please select predefined size chart',
      elementType: 'select',
      elementConfig: {
            name: 'sizeChart',
            id: 'sizeChart',
            placeholder: 'Select predefined size chart.',
            options: [],
            validators: [
                  { check: required('empty'), message: 'Please select defined size chart.' }
            ],
            addClassName: []
      }
}

const DefinedSizeChartMenu = ({ sizeChart, changeSizeChart}) => {
      const [definedSizeChartId, setDefinedSizeChartId] = useState({
            value: '',
            touched: false,
            isValid: false,
            errors: []
      });

      useEffect(() => {
            let definedCharts = predefinedSizeChart.map(sizeChart => {
                  return {
                        value: sizeChart.sizeChartId,
                        displayValue: sizeChart.sizeChartName
                  }
            });
            predefinedInput.elementConfig.options = definedCharts;
      }, []);

      const handleDefinedSizeChartChange = (id) => {
            const { isValid, errorMessages } = validateInput(predefinedInput.elementConfig.validators, id);
            setDefinedSizeChartId({
                  value: id,
                  touched: true,
                  isValid: isValid,
                  errors: errorMessages
            });

            let newSizeChart = [{ sizeDescription: '' }]
            if (isValid) {
                  predefinedSizeChart.forEach(chart => {
                        if (chart.sizeChartId === id) {
                              newSizeChart = chart.sizeChart;
                        }
                  });
            }
            changeSizeChart(newSizeChart, true);
      }

      let sizeChartList = null

      if (definedSizeChartId.value !== 'empty' && definedSizeChartId.value !== '') {
            sizeChartList = sizeChart.value.map((sizeInput, index) => (
                  <li key={`sizeInput${index}`}>
                        <SizeInput
                              index={index}
                              name={`sizeInput${index}`}
                              id={`sizeInput${index}`}
                              label={'Size description (dimensions)'}
                              editable={false}
                              value={sizeInput.sizeDescription}
                        />
                  </li>
            ))
      }

      return (
            <div>
                  <InputField
                        label={predefinedInput.elementName}
                        elementType={predefinedInput.elementType}
                        elementConfig={predefinedInput.elementConfig}
                        value={definedSizeChartId.value}
                        touched={definedSizeChartId.touched}
                        isValid={definedSizeChartId.isValid}
                        errors={definedSizeChartId.errors}
                        changeInput={handleDefinedSizeChartChange}
                  />
                  <ul className={styles['input-list']}>
                        {sizeChartList}
                  </ul>
            </div>
      )
}

export default DefinedSizeChartMenu;