import React from 'react';

import styles from './Button.module.scss';

const Button = ({ children, buttonType, onClick }) => {

      let buttonStyles = [styles['button']]

      switch (buttonType) {
            case 'success':
                  buttonStyles.push(styles['button--green']);
                  break;
            case 'danger':
                  buttonStyles.push(styles['button--red']);
                  break;
            default:
                  buttonStyles.push(styles['button--green']);
      }

      return (
            <button
                  type="button"
                  onClick={onClick}
                  className={buttonStyles.join(' ')}>
                  {children}
            </button>
      )
}



export default Button;