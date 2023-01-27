import React, { useState } from 'react';

import DynamicDropDown from '../../../Form/DynamicDropDown/DynamicDropDown';
import SizeInput from '../../../Form/CustomSizeChart/SizeInput/SizeInput';
import Button from '../../../Button/Button';

import useForm from '../../../../hooks/useForm';

import styles from './DefinedSizeChart.module.scss';

import { definedSizeChartInputConfig } from './definedSizeChartInputConfig';

import { predefinedSizeCharts } from './data';

const DefinedSizeChartMenu = ({ sizeChart, changeSizeChart, changeSizeSystem }) => {
      const [sizeCharts, setSizeCharts] = useState(() => {
            let definedCharts = predefinedSizeCharts.map(sizeChart => {
                  return {
                        value: sizeChart.sizeChartId,
                        displayValue: sizeChart.sizeChartName,
                        sizeChart: sizeChart.sizeChart
                  }
            });
            return definedCharts;
      });

      const [definedSizeChartId, definedSizeChartIdIsValid, setDefinedSizeChartId] = useForm(definedSizeChartInputConfig);

      const { definedSizeChart } = definedSizeChartId;

      const handleDefinedSizeChartChange = (id) => {
            let newSizeChart = [{ sizeDescription: '' }]
            if (id !== "empty" || id !== '') {
                  sizeCharts.forEach(chart => {
                        if (chart.value === id) {
                              newSizeChart = chart.sizeChart;
                        }
                  });
            }
            setDefinedSizeChartId('definedSizeChart')(id)
            changeSizeChart(newSizeChart, true);
      }

      const editDefinedSizeSystem = () => {
            changeSizeSystem('custom');
      }

      const renderDefinedSizeChartDropDown = () => {
            return Object.values(definedSizeChartInputConfig).map(formElement => (
                  <DynamicDropDown
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={definedSizeChartId[formElement.elementConfig.name].value}
                        options={sizeCharts}
                        touched={definedSizeChartId[formElement.elementConfig.name].touched}
                        isValid={definedSizeChartId[formElement.elementConfig.name].isValid}
                        errors={definedSizeChartId[formElement.elementConfig.name].errors}
                        changeInput={handleDefinedSizeChartChange}
                  />
            ));
      }

      let sizeChartList = null

      if (definedSizeChart.value !== 'empty' && definedSizeChart.value !== '') {
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
                  {renderDefinedSizeChartDropDown()}
                  <ul className={styles['input-list']}>
                        {sizeChartList}
                  </ul>
                  {definedSizeChartIdIsValid ? (
                        <div className={styles['container']}>
                              <p className={styles['instruction']}>You can customize defined sie chart.</p>
                              <Button
                                    type="button"
                                    onClick={editDefinedSizeSystem}
                                    buttonType={"success"}
                                    buttonStyle={'standard'}
                              >
                                    Edit
                              </Button>
                        </div>
                  ) : null
                  }
            </div >
      )
}

export default DefinedSizeChartMenu;