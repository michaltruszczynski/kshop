import React from 'react';

import styles from './PasswordErrors.module.scss';

const PasswordErrors = ({ validators, touched, value }) => {
      const validationRulesMsg = validators.map(validationRule => {
            const isValid = validationRule.check(value);
            let validationItemClass = [styles['validation__item']]
            if (isValid) {
                  validationItemClass.push(styles['validation__item--valid'])
            }
            return (
                  <li className={validationItemClass.join(' ')} key={validationRule.message}>
                        {isValid ? <i className={`bx bxs-check-circle ${styles['validation__icon']}`}></i> : <i className={`bx bxs-error-circle ${styles['validation__icon']}`}></i>}
                        <span className={styles['validation__message']}>{validationRule.message}</span>
                  </li>
            )
      });

      return (
            <>
                  <h3 className={styles['validation__heading']}>Password rules</h3>
                  <ul className={styles['validation__list']}>
                        {validationRulesMsg}
                  </ul>
            </>
      )
}

export default PasswordErrors;