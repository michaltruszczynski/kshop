import React from 'react';

import styles from './Button.module.scss';

const buttonStyles = {
      standard: 'standard',
      large: 'large',
      icon: 'primary',
}

const Button = ({ children, buttonType, buttonStyle, onClick, marginClass, disabled, type, active }) => {

      let buttonClassName = [styles['button']]

      switch (buttonType) {
            case 'success':
                  buttonClassName.push(styles['button--green']);
                  break;
            case 'danger':
                  buttonClassName.push(styles['button--red']);
                  break;
            case 'blue':
                  buttonClassName.push(styles['button--blue']);
                  break;
            default:
                  buttonClassName.push(styles['button--green']);
      }

      switch (buttonStyle) {
            case 'standard':
                  buttonClassName.push(styles['button--standard']);
                  break;
            case 'icon':
                  buttonClassName.push(styles['button--icon']);
                  break;
            case 'large':
                  buttonClassName.push(styles['button--large']);
                  break;
            default:
                  buttonClassName.push(styles['button--standard']);
      }

      if (marginClass) {
            buttonClassName.push(marginClass);
      }

      if (active) {
            buttonClassName.push(styles['button--active'])
      }

      return (
            <button
                  type={type}
                  onClick={onClick}
                  disabled={disabled}
                  className={buttonClassName.join(' ')}>
                  {children}
            </button>
      )
}

Button.defaultProps = {
      buttonType: 'success',
      buttonStyle: 'standard',
      type: "button",
      disabled: false,
      active: false
}

export default Button;