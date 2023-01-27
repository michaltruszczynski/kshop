import React from 'react';

import SelectInput from '../../../../components/Form/SelectInput/SelectInput';

import { selectSizeInputConfig } from './SelectSizeInputConfig'

import styles from './SelectSize.module.scss';

const SelectSize = ({ sizeChart = [], sizeData, onSizeChange }) => {
      const { value, touched, isValid, disabled, errors } = sizeData;

      const optionsSizeChart = sizeChart.map(size => ({
            value: size.sizeDescription,
            displayValue: size.sizeDescription
      }));

      return (
                  <div className={styles['select']}>
                        <SelectInput
                              value={value}
                              autoDefaultValue={true}
                              elementConfig={selectSizeInputConfig.selectedProductSize.elementConfig}
                              options={optionsSizeChart}
                              onInputChange={onSizeChange}
                              touched={touched}
                              isValid={isValid}
                              disabled={disabled}
                              errors={errors}
                        />
                  </div>
      )
}

export default SelectSize;