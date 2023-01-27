import React from 'react';
import { useSelector } from 'react-redux';
import NavigationItem from './NavigationItem/NavigatinItem';

import styles from './NavigationItems.module.scss';

const navItems = [
      { id: 'home1', text: 'Home', icon: false, link: '/', auth: false, allowedRoles: ['client', 'employee', 'admin'] },
      { id: 'home2', text: 'Home', icon: false, link: '/', auth: true, allowedRoles: ['client', 'employee', 'admin'] },
      { id: 'shop1', text: 'Products', icon: false, link: '/shop', auth: false, allowedRoles: ['client', 'employee', 'admin'] },
      { id: 'shop2', text: 'Products', icon: false, link: '/shop', auth: true, allowedRoles: ['client'] },
      { id: 'shop3', text: 'eShop', icon: false, link: '/shop', auth: true, allowedRoles: ['employee', 'admin'] },
      {
            id: 'products', text: 'Products', icon: false, link: '', auth: true, allowedRoles: ['employee', 'admin'], subMenu: [
                  { id: 'productsList', text: 'Products List', link: '/admin/products', auth: true, allowedRoles: ['employee', 'admin'] },
                  { id: 'addProduct', text: 'Add Product', link: '/admin/addproduct', auth: true, allowedRoles: ['employee', 'admin'] }
            ]
      },
      {
            id: 'brands', text: 'Brands', icon: false, link: '', auth: true, allowedRoles: ['employee', 'admin'], subMenu: [
                  { id: 'brandsList', text: 'Brands List', link: '/admin/brands', auth: true, allowedRoles: ['employee', 'admin'] },
                  { id: 'addBrand', text: 'Add Brand', link: '/admin/addbrand', auth: true, allowedRoles: ['employee', 'admin'] }
            ]
      },
      {
            id: 'SizeSystems', text: 'Size Systems', icon: false, link: '', auth: true, allowedRoles: ['employee', 'admin'], subMenu: [
                  { id: 'sizeSystemsList', text: 'Size Systems List', link: '/admin/sizesystems', auth: true, allowedRoles: ['employee', 'admin'] },
                  { id: 'addSizeSystem', text: 'Add Size System', link: '/admin/addsizesystem', auth: true, allowedRoles: ['employee', 'admin'] }
            ]
      },
      {
            id: 'Users', text: 'Users', icon: false, link: '', auth: true, allowedRoles: ['admin'], subMenu: [
                  { id: 'usersList', text: 'Users List', link: '/admin/users', auth: true, allowedRoles: ['admin'] },
            ]
      }
]

const NavigationItems = ({ isMobileNavOpen, closeMobileNav }) => {

      const auth = useSelector(state => state.auth);
      const { userRole, userId } = auth;

      const filterNavItemsByRoleAndAuthStatus = (navItems) => {
            if (!navItems.length) return [];

            return navItems.filter(navItem => {
                  if (!userId && !navItem.auth) {
                        if (navItem.subMenu) {
                              navItem.subMenu = filterNavItemsByRoleAndAuthStatus(navItem.subMenu);
                        }
                        return true;
                  }

                  if ((!!userId && navItem.auth) && navItem.allowedRoles.includes(userRole)) {
                        if (navItem.subMenu) {
                              navItem.subMenu = filterNavItemsByRoleAndAuthStatus(navItem.subMenu);
                        }
                        return true;
                  }
                  return false;
            })
      }

      const renderUserNavLinks = () => {
            const userNavItems = filterNavItemsByRoleAndAuthStatus(navItems);
            const userNavLinks = userNavItems.map(item => (
                  <NavigationItem
                        key={item.id}
                        link={item.link || ''}
                        subMenu={item.subMenu || []}
                        closeMobileNav={closeMobileNav}
                  >
                        {item.text}
                  </NavigationItem>
            ));

            return userNavLinks;
      }

      const getMenuClasses = () => {
            let menuClasses = [styles['menu']];
            if (isMobileNavOpen) {
                  menuClasses = [styles['menu'], styles['menu--open-mobile']]
            }
            return menuClasses.join(' ');
      }

      return (
            <div className={getMenuClasses()}>
                  <div className={styles['menu__heading-mobile']}>
                        <div className={styles['logo']}>
                              <h1 className={styles['logo__text']}>Codevo</h1>
                        </div>
                        <div className={styles['close-icon']} onClick={closeMobileNav}>
                              <i className="bx bx-x"></i>
                        </div>
                  </div>
                  <ul className={styles['nav__list']}>
                        {renderUserNavLinks()}
                  </ul>
            </div>
      )
}

export default NavigationItems;