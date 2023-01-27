import React, { useEffect } from 'react';

import styles from './SelectInput.module.scss';

const SelectInput = ({ label, elementConfig, value, options = [], onInputChange, touched, isValid, disabled = false, placeholderVisible = false, autoDefaultValue = false }) => {

      useEffect(() => {
            if (autoDefaultValue) {
                  if (!options.length && !elementConfig?.options.length) return;

                  let optionsToDisplay = [];

                  if (options.length) {
                        optionsToDisplay = options
                  } else if (elementConfig?.options.length) {
                        optionsToDisplay = [...elementConfig?.options]
                  }

                  onInputChange(optionsToDisplay[0].value);
            }
      }, [])

      const inputChangeHandler = event => {
            const { value } = event.target;
            console.log('select')
            onInputChange(value);
      }

      const renderOptions = () => {
            if (!options.length && !elementConfig?.options.length) {
                  return (
                        <option key={"empty"} value={""}>
                              No options available.
                        </option>
                  );
            }

            let optionsToDisplay = [];

            if (options.length) {
                  optionsToDisplay = options
            } else if (elementConfig?.options) {
                  optionsToDisplay = [...elementConfig?.options]
            }

            return (
                  optionsToDisplay.map(size => (
                        <option key={size.value} value={size.value}>
                              {size.displayValue}
                        </option>
                  ))
            );
      }

      const renderPlaceholder = () => {
            if (!elementConfig.placeholder) return;

            return (
                  <option key={"empty"} value={""}>
                        {elementConfig.placeholder}
                  </option>
            )
      }


      return (
            <>
                  {label && (<label
                        htmlFor={elementConfig.name}
                        className={styles['field-name']}
                  >
                        {label}:
                  </label>)}
                  <select
                        value={value}
                        name={elementConfig.name}
                        id={elementConfig.id}
                        onChange={inputChangeHandler}
                        className={styles['select-input']}
                        disabled={disabled}
                  >
                        {placeholderVisible && renderPlaceholder()}
                        {renderOptions()}
                  </select>
            </>
      )
}

export default SelectInput;