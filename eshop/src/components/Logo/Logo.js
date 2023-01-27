import React from 'react';
import styles from './Logo.module.scss';

const Logo = () => {
      return (
            <div className={styles.logo}>
                  <h1 className={styles.logo__text}>Kite Shop</h1>
                  <p className={styles.logo__subtext}>The Water Sport Center</p>
            </div>
      )
}

export default Logo;