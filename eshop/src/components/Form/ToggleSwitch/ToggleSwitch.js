import React from 'react';

import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = ({ label, elementConfig, value, disabled, onInputChange, touched, isValid, errors }) => {

      const handleChange = () => {
            onInputChange(!value)
      }

      return (
            <div>
                  <label className={styles['toggle']} htmlFor={elementConfig.id}> {label}
                        <input
                              type={elementConfig.type}
                              id={elementConfig.id}
                              checked={value}
                              disabled={disabled}
                              onChange={handleChange}
                              className={styles['toggle__input']} />
                        <div className={styles['toggle__fill']}></div>
                  </label>
            </div>

      )
}

export default ToggleSwitch;