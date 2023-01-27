import React from 'react';

import MainNavigation from '../Navigation/MainNavigation/MainNavigation';
import Footer from '../Footer/Footer';
import Modal from '../UI/Modal/Modal';
import ConfirmationDialog from '../UI/ConfirmationDialog/ConfirmationDialog'

import styles from './Layout.module.scss';

const Layout = ({ children }) => {

      return (
            <section className={styles['main-section']}>
                  <Modal />
                  <ConfirmationDialog />
                  <header className={styles['header']}>
                        <MainNavigation />
                  </header>
                  <main className={styles['main']}>
                        {children}
                  </main>
                  <footer className={styles['footer']}>
                        <Footer />
                  </footer>
            </section>
      )
}

export default Layout;