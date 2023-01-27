import React from 'react';

import SectionTitle from '../../../components/UI/SectionTitle/SectionTitle';
// import SectionTItle from '../../../components'
import UserListTable from '../../../components/UserListTable/UserListTable';

import styles from './UsersList.module.scss';

const UserList = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <SectionTitle sectionTitle={'User list'} />
                        <UserListTable />
                  </div>
            </section>
      )
}

export default UserList;