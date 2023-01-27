import styles from './ButtonSmall.module.scss';

const ButtonSmall = ({ children, buttonType, clickHandler, disabled }) => {
      let buttonStyles = [styles['button']];
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
                  onClick={clickHandler}
                  className={buttonStyles.join(' ')}
                  disabled={disabled}>
                  {children}
            </button>

      )
}
ButtonSmall.defaultProps = {
      buttonType: 'success'
}


export default ButtonSmall