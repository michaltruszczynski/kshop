import React from 'react';

import OrderListTable from '../../../components/OrderListTable/OrderListTable';
import UserData from '../../../components/UserData/UserData';

import styles from './User.module.scss';

const User = () => {

      return (
            <section className={styles['section']} >
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>User Details</h1>
                        </div>
                        <UserData />
                        <div className={styles['title-secondary']}>
                              <h1 className={styles['title-secondary__text']}>Your Orders</h1>
                        </div>
                        <OrderListTable />
                  </div>
            </section>
      )
}

export default User;