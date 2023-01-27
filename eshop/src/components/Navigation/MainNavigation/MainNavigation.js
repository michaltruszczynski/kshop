import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import CartIcon from '../CartIcon/CartIcon';
import UserIcon from '../UserIcon/UserIcon';
import LogoutIcon from '../LogoutIcon/LogoutIcon';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import ButtonLink from '../ButtonLink/ButtonLink';

import { logout } from '../../../store/actions'

import styles from './MainNavigation.module.scss';

const MainNavigation = () => {
      const [navFixed, setNavFixed] = useState(false);
      const [mobileNavOpen, setMobileNavOpen] = useState(false);
      const authState = useSelector(state => state.auth);
      const dispatch = useDispatch();
      const { userId } = authState;

      useEffect(() => {
            const handleScroll = () => {
                  const navHeight = 1;
                  const currentScrolPosition = window.pageYOffset;
                  setNavFixed(currentScrolPosition > navHeight);
            }

            window.addEventListener('scroll', handleScroll);
            return () => {
                  window.removeEventListener('scroll', handleScroll);
            }
      }, []);

      const closeMobileNav = () => {
            setMobileNavOpen(false);
      }

      const mobileNavHandler = () => {
            setMobileNavOpen(mobileNavOpen => !mobileNavOpen);
      }

      let navClasses = styles['navigation'];

      if (navFixed) {
            navClasses = [styles['navigation'], styles['navigation--fixed']].join(' ');
      }

      const logoutHandler = () => {
            dispatch(logout())
      }

      return (
            <nav className={navClasses}>
                  <div className={styles['navigation__container']}>
                        <div className={styles['navigation__left']}>
                              <ButtonLink onClick={mobileNavHandler}>
                                    <HamburgerIcon />
                              </ButtonLink>
                              <Logo />
                        </div>
                        <div className={styles['navigation__right']}>
                              <Backdrop show={mobileNavOpen} onBackdropClick={closeMobileNav} />
                              <NavigationItems isMobileNavOpen={mobileNavOpen} closeMobileNav={closeMobileNav} />
                              <NavLink
                                    to={ userId ? "/user" : "/signin"}
                                    className={styles['navigation__link']} >
                                    <UserIcon />
                              </NavLink>
                              <NavLink to="/cart" className={styles['navigation__link']}>
                                    <CartIcon />
                              </NavLink>
                              {!!userId &&
                                    <ButtonLink onClick={logoutHandler} >
                                          <LogoutIcon />
                                    </ButtonLink>
                              }
                        </div>
                  </div>
            </nav>
      )
}

export default MainNavigation;