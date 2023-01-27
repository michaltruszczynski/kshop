import React from 'react';

import styles from './BackgroundContent.module.scss';

const BackgroundContent = ({ children }) => {

      return (
            <div className={styles['bg-container']}>
                  <div>{children}</div>
            </div>
      )
}

export default BackgroundContent