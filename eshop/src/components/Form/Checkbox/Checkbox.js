import React from 'react';

import styles from './Checkbox.module.scss';

const Checkbox = ({ elementConfig, editable, disabled, value, onInputChange }) => {

      const inputChangeHandler = (event) => {
            const isChecked = event.target.checked;
            if (isChecked) {
                  const newUserRole = [...value, event.target.value];
                  onInputChange(newUserRole);
            } else {
                  const index = value.indexOf(event.target.value);
                  value.splice(index, 1)
                  const newUserRole = [...value];
                  onInputChange(newUserRole);
            }
      }

      const checkboxInputs =
            elementConfig.options.map(checkbox => {
                  return (
                        <label key={checkbox.name} className={styles['field']} htmlFor={checkbox.name}>
                              <input
                                    type="checkbox"
                                    name={checkbox.name}
                                    id={checkbox.name}
                                    value={checkbox.name}
                                    onChange={inputChangeHandler}
                                    className={styles['field__checkbox']}
                                    checked={value.includes(checkbox.name)}
                                    disabled={editable ? disabled : true}
                              />
                              <span className={styles['field__name']}>{checkbox.displayValue}</span>
                        </label>
                  )
            })
            ;
      return checkboxInputs;
}

export default Checkbox;