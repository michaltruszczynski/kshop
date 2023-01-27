import React from 'react';

import { required } from '../../../../utility/validators';

import styles from './SizeInput.module.scss';

const SizeInput = ({ onInputChange, value, id, name, touched, editable, label, index, children }) => {

      const inputValidator = required();

      const isValid = inputValidator(value);

      let inputFieldClasses = [styles['field__input']];

      if (!isValid && touched) {
            inputFieldClasses.push(styles['field__input--error']);
      }

      return (
            <div className={styles['field']} >
                  <label
                        htmlFor={name}
                        className={styles['field__name']}
                  >
                        {label}:
                  </label>
                  <div className={styles['field__input-container']}>
                        <input
                              value={value}
                              typ="text"
                              name={name}
                              id={id}
                              readOnly={!editable}
                              onChange={(e) => onInputChange(e, index)}
                              className={inputFieldClasses.join(' ')}
                        />
                        {children}
                  </div>
            </div>
      )
}

SizeInput.defaultProps = {
      children: null
}

export default SizeInput;