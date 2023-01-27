import React from 'react';

import styles from './HamburgerIcon.module.scss';

const HamburgerIcon = () => {
      return (
            <div className={styles['hamburger-icon']}>
                  <i className="bx bx-menu icon"></i>
            </div>
      )
}

export default HamburgerIcon;