import React from 'react';

import styles from './Arrow.module.scss';

const Arrow = ({ direction, handleClick }) => {

      const arrowDirection = {
            [direction]: '0.5rem'
      }

      const arrow = (direction) => {
            switch (direction) {
                  case 'right':
                        return <i className="bx bx-right-arrow-alt" />;
                  case 'left':
                        return <i className="bx bx-left-arrow-alt" />;
            }
      }

      return (
            <div className={styles['arrow']} style={arrowDirection} onClick={handleClick}>
                  {arrow(direction)}
            </div>
      )
}

export default Arrow;