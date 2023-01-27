import React from 'react';
import { useSelector } from 'react-redux';

import styles from './UserData.module.scss';

const UserData = () => {

      const user = useSelector(state => state.auth)
      const { userName, userEmail } = user;

      return (
            <div className={styles['user-data-container']}>
                  <div className={styles['data']}>
                        <p className={styles['data__item']}>
                              <span className={styles['data__description']}>User name:</span> {userName}
                        </p>
                        <p className={styles['data__item']}>
                              <span className={styles['data__description']}>User email:</span> {userEmail}
                        </p>
                  </div>
            </div>
      )
}

export default UserData;