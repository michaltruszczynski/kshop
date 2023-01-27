import React from 'react';

import styles from './SelectButton.module.scss';

const SelectButton = ({ disabled, onSelectFile, formIsValid, touched}) => {

      const selectFileHandler = (event) => {
            event.preventDefault();
            onSelectFile(event);
      }

      const getButtonClasses = () => {
            let buttonClasses = [styles['button']];
            if (!formIsValid && touched) {
                  buttonClasses.push(styles['button--error'])
            }

            if (disabled) {
                  buttonClasses.push(styles['button--disabled'])
            }

            return buttonClasses.join(' ');
      }

      return (
            <div className={getButtonClasses()}>
                  <label className={styles['button__label']}>
                        <i className={`bx bxs-file-plus ${styles['add-icon']}`}></i>
                        <input
                              type="file"
                              multiple
                              className={styles['display-none']}
                              onChange={selectFileHandler}
                              disabled={disabled}
                        />
                  </label>
            </div>
      )
}

export default SelectButton;