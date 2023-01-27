import React from 'react';

import InputError from '../InpurtError/InputError';

import styles from './DynamicDropDown.module.scss';

const DynamicDropDown = ({ label, elementConfig, value, options, onInputChange, touched, isValid, fetchStatus = 'idle', disabled, errors }) => {
       const inputChangeHandler = (event) => {
            const { value } = event.target;
            onInputChange(value);
      }

      const inputFieldClasses = htmlElementType => {
            let classesArray = [styles[`field__${htmlElementType}`]];
            if (!isValid && touched) {
                  classesArray.push(styles[`field__${htmlElementType}--error`])
            }
            return classesArray.join(' ');
      }

      const renderOptions = () => {
            if (fetchStatus === 'success' && options.length !== 0) {
                  return (
                        <>
                              <option key={"empty"} value={""}>
                                    {elementConfig.placeholder}
                              </option>
                              {options.map(option => (
                                    <option key={option.key} value={option.value}>
                                          {option.displayValue}
                                    </option>
                              ))}
                        </>
                  )
            }

            if ((fetchStatus === 'idle' && options.length !== 0) || (fetchStatus === 'success' && options.length === 0)) {
                  return (
                        <option key={'empty'} value={""}>
                              No options available.
                        </option>
                  )
            }

            if (fetchStatus === 'loading') {
                  return (
                        <option key={'loading'} value={""}>
                              Loading options...
                        </option>
                  )
            }

            if (fetchStatus === 'error') {
                  return (
                        <option key={'error'} value={""}>
                              Fetching options failed.
                        </option>
                  )
            }
      }

      const checkIsInputDisabled = () => {
            if (fetchStatus === 'loading' || disabled) return true;
            return false;
      }

      return (
            <div className={styles['field']} >
                  {label && (<label
                        htmlFor={elementConfig.name}
                        className={styles['field__name']}
                  >
                        {label}:
                  </label>)}
                  <select
                        value={value}
                        name={elementConfig.name}
                        id={elementConfig.id}
                        onChange={inputChangeHandler}
                        className={inputFieldClasses('select')}
                        disabled={checkIsInputDisabled()}
                  >
                        {renderOptions()}
                  </select>
                  <InputError touched={touched} isValid={isValid} errors={errors} />
            </div>
      );
}

export default DynamicDropDown;