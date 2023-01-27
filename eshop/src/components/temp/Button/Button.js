import React from 'react';

import styles from './Button.module.scss';

const buttonStyles = {
      primary: 'primary',
      success: 'success',
      danger: 'danger'
}

const Button = ({ children, disabled, type, onClick, btnStyle }) => {
      let classList;

      switch (btnStyle) {
            case buttonStyles.primary:
                  classList = [styles['button'], styles['button--primary']];
                  break;
            case buttonStyles.success:
                  classList = [styles['button'], styles['button--success']];
                  break;
            case buttonStyles.danger:
                  classList = [styles['button'], styles['button--danger']];
                  break;
            default:
                  classList = [styles['button'], styles['button--primary']];
                  break

      }

      return (
            <button
                  className={classList.join(' ')}
                  type={type}
                  disabled={disabled}
                  onClick={onClick}
            >
                  {children}
            </button >
      )
}

Button.defaultProps = {
      type: "button",
      disabled: false,
      btnStyle: buttonStyles.prmimary
}

export default Button;