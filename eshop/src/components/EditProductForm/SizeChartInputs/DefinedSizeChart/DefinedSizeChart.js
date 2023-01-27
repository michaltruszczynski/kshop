import React from 'react';

import DynamicDropDown from '../../../Form/DynamicDropDown/DynamicDropDown';
import SizeInput from '../../../Form/CustomSizeChart/SizeInput/SizeInput';
import Button from '../../../Button/Button';

import styles from './DefinedSizeChart.module.scss';

import { definedSizeChartInputConfigId } from './definedSizeChartInputConfig';

import useFetch from '../../../../hooks/useFetch';

const DefinedSizeChartMenu = ({ sizeChart, changeSizeChart, changeSizeSystem, sizeSystemIdData, changeSizeSystemId, disabled }) => {
      const [fetchState] = useFetch('/admin/sizesystems')

      const { status } = fetchState;
      const { sizeSystemId: { isValid: sizeSystemIdIsValid } } = sizeSystemIdData;

      const getOptionsArray = () => {
            if (!fetchState.data?.sizeSystems) return [];
            return fetchState.data.sizeSystems.map(sizeChart => {
                  return {
                        key: sizeChart._id,
                        value: sizeChart._id,
                        displayValue: sizeChart.sizeSystemName,
                  }
            })
      }

      const handleDefinedSizeChartChange = (id) => {
            let newSizeChart = [{ sizeDescription: '' }]
            if (id !== "empty" || id !== '') {
                  fetchState.data.sizeSystems.forEach(sizeSystem => {
                        if (sizeSystem._id === id) {
                              newSizeChart = sizeSystem.sizeChart;
                        }
                  });
            }
            changeSizeSystemId(id);
            changeSizeChart(newSizeChart, true);
      }

      const editDefinedSizeSystem = () => {
            changeSizeSystem('custom');
            changeSizeSystemId('');
      }

      const renderDefinedSizeChartDropDown = () => {
            return Object.values(definedSizeChartInputConfigId).map(formElement => (
                  <DynamicDropDown
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={sizeSystemIdData[formElement.elementConfig.name].value}
                        options={getOptionsArray()}
                        touched={sizeSystemIdData[formElement.elementConfig.name].touched}
                        isValid={sizeSystemIdData[formElement.elementConfig.name].isValid}
                        errors={sizeSystemIdData[formElement.elementConfig.name].errors}
                        fetchStatus={status}
                        disabled={disabled}
                        onInputChange={handleDefinedSizeChartChange}
                  />
            ));
      }

      let sizeChartList = null

      if (sizeSystemIdIsValid) {
            sizeChartList = sizeChart.value.map((sizeInput, index) => (
                  <li key={`sizeInput${index}`}>
                        <SizeInput
                              index={index}
                              name={`sizeInput${index}`}
                              id={`sizeInput${index}`}
                              label={'Size description (dimensions)'}
                              disabled={disabled}
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
                  {(sizeSystemIdIsValid && !disabled) ? (
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
                  ) : <div className={styles['divider']}></div>
                  }
            </div >
      )
}

export default DefinedSizeChartMenu;