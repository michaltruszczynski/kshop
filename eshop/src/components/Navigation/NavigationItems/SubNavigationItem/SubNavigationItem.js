import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './SubNavigationItem.module.scss';

const SubNavigationItem = ({ subMenu, isOpen, onSubNavItemClick, closeMobileNav }) => {

      const subNavigationItemClickHandler = () => {
            onSubNavItemClick();
            closeMobileNav();
      }

      const subNavigation = subMenu.map(item => {
            return (
                  <li key={item.id} className={styles['sublink__item']}>
                        <NavLink
                              to={item.link}
                              className={styles['sublink__link']}
                              onClick={subNavigationItemClickHandler}
                        >{item.text}</NavLink>
                  </li>
            )
      })

      const getSubNavContainerClasses = () => {
            let SubNavContainerClasses = [styles['container']];

            if (isOpen) {
                  SubNavContainerClasses.push(styles['container--open'])
            }

            return SubNavContainerClasses.join(' ');
      }

      return (
            <div className={getSubNavContainerClasses()}>
                  <ul className={styles['sublink']}>
                        {subNavigation}
                  </ul>
            </div>
      )
}

export default SubNavigationItem;