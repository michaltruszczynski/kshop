import React from 'react';

import styles from './Backdrop.module.scss'

const Backdrop = ({ show, onBackdropClick, children }) => {
      let backdropClasses = [styles['backdrop']];
      if (show) {
            backdropClasses.push(styles['backdrop--visible'])
      }

      return (
            <div className={backdropClasses.join(' ')} onClick={onBackdropClick}>
                  {children}
            </div>
      )
}

export default Backdrop