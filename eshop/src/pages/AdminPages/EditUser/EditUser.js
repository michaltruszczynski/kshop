import React from 'react';
import { useParams } from 'react-router-dom'

import EditUserForm from '../../../components/EditUserForm/EditUserForm';

import styles from './EditUser.module.scss';

const EditUser = () => {
      const { id } = useParams();

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Edit User</h1>
                        </div>
                        <div>
                              <EditUserForm key={id} />
                        </div>
                  </div>
            </section>
      )
}

export default EditUser;