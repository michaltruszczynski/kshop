import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './ProductTypes.module.scss';
import imageProdTypeKites from '../../images/prodTypeKites.jpg';
import imageProdTypeBoards from '../../images/prodTypeBoards.jpg';
import imageProdTypeAccessories from '../../images/prodTypeAccessories.jpg';
import imageProdTypeWetsiuts from '../../images/prodTypeWetsiuts.jpg';

const ProductTypes = () => {
   return (
      <section className={styles['section']}>
         <div className={styles['section__container']}>
            <div className={styles['title']}>
               <h1 className={styles['title__text']}>Products</h1>
            </div>
            <div className={styles['type-list']}>
               <NavLink to='shop?category=Kites'>
                  <div className={styles['type']}>
                     <h1 className={styles['type__name']}>Kites</h1>
                     <img
                        className={styles['type__image']}
                        src={imageProdTypeKites}
                        alt='Kites'
                     />
                  </div>
               </NavLink>
               <NavLink to='shop?category=Boards'>
                  <div className={styles['type']}>
                     <h1 className={styles['type__name']}>Boards</h1>
                     <img
                        className={styles['type__image']}
                        src={imageProdTypeBoards}
                        alt='Boards'
                     />
                  </div>
               </NavLink>
               <NavLink to='shop?category=Accessories'>
                  <div className={styles['type']}>
                     <h1 className={styles['type__name']}>Accessories</h1>
                     <img
                        className={styles['type__image']}
                        src={imageProdTypeAccessories}
                        alt='Accessoriess'
                     />
                  </div>
               </NavLink>
               <NavLink to='shop?category=Wetsiuts'>
                  <div className={styles['type']}>
                     <h1 className={styles['type__name']}>Wetsiuts</h1>
                     <img
                        className={styles['type__image']}
                        src={imageProdTypeWetsiuts}
                        alt='Wetsiuts'
                     />
                  </div>
               </NavLink>
            </div>
         </div>
      </section>
   );
};

export default ProductTypes;
