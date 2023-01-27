import React from 'react';

import styles from './InputError.module.scss';

const InputError = ({ touched, isValid, errors }) => {
      let errorClasses = [styles['error__message']];

      let errorMessage = (<li className={errorClasses.join(' ')}></li>);

      if (touched) {
            if (!isValid) {
                  errorClasses.push(styles['error__message--red']);
                  errorClasses.push(styles['error__message--visible']);
            }
            errors.length > 0 && (errorMessage = errors.map((errorMessage, index) => (
                  <li key={`error${index}`} className={errorClasses.join(' ')}>{errorMessage}</li>
            )));
      }

      return (
            <ul className={styles['error__list']}>
                  {errorMessage}
            </ul>
      )
};

export default InputError;