import React from 'react';

import SignupForm from '../../../components/SignupForm/SignupForm';

import styles from './Signup.module.scss';

const Signup = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Register</h1>
                        </div>
                        <div>
                            <SignupForm />
                        </div>
                  </div>
            </section>
      )
}

export default Signup;