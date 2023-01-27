import React from 'react';

import SigninForm from '../../../components/SigninForm/SigninForm';

import styles from './Signin.module.scss';

const Signin = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Signin</h1>
                        </div>
                        <div>
                            <SigninForm />
                        </div>
                  </div>
            </section>
      )
}

export default Signin;