import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Footer.module.scss';

const Footer = () => {
    return (
            <section className={[styles['section'], styles['section--footer']].join(' ')}>
                <div className={styles['section__container']}>
                    <div className={styles['footer']}>
                        <div className={styles['footer__element']}>
                            <h3 className={styles['footer__subtitle']}>EXTRAS</h3>
                            <NavLink to="/" className={styles['footer__link']}>Gift Certificates</NavLink>
                            <NavLink to="/" className={styles['footer__link']}>Sale</NavLink>
                            <NavLink to="/" className={styles['footer__link']}>Affiliate</NavLink>
                            <NavLink to="/" className={styles['footer__link']}>Brands</NavLink>
                        </div>
                        <div className={styles['footer__element']}>
                            <h3 className={styles['footer__subtitle']}>INFORMATION</h3>
                            <NavLink to="/" className={styles['footer__link']}>About Us</NavLink>
                            <NavLink to="/" className={styles['footer__link']}>Privacy Policy</NavLink>
                            <NavLink to="/" className={styles['footer__link']}>Terms Conditions</NavLink>
                            <NavLink to="/" className={styles['footer__link']}>Contact Us</NavLink>
                            <NavLink to="/" className={styles['footer__link']}>Site Map</NavLink>
                        </div>
                        <div className={styles['footer__element']}>
                            <h3 className={styles['footer__subtitle']}>CONTACT US</h3>
                            <p className={[styles['footer__text'], styles['footer__text--large']].join(' ')}>Kite Shop</p>
                            <p className={styles['footer__text']}>Main Street 1</p>
                            <p className={styles['footer__text']}>Warsaw, Poland</p>
                            <p className={styles['footer__text']}>+48 22 123 456 789</p>
                            <p className={styles['footer__text']}>kite@shop.com</p>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Footer;