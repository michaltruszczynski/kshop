import React from 'react';

import styles from './Dot.module.scss';

const Dot = ({ active }) => {

      let dotStyles = [styles['dot'], styles['dot--active']].join(' ');

      if (!active) {
            dotStyles = [styles['dot'], styles['dot--inactive']].join(' ');
      }

      return (
            <div className={dotStyles}></div>
      )
}

export default Dot;