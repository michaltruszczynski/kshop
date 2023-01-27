import React from 'react';

import styles from './HeaderContent.module.scss';

const HeaderContent = () => {
      return (
            <div className={styles["container"]}>
                  <div className={styles['banner']}>
                        <div className={styles['banner__card']}>
                              <h1 className={styles['banner__heading']}>Kite Shop</h1>
                              <h2 className={styles['banner__heading-small']}>Yours water sport center.</h2>
                              <p className={styles['banner__text']}>Odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer.</p>
                        </div>
                  </div>
            </div>
      )
}

export default HeaderContent;