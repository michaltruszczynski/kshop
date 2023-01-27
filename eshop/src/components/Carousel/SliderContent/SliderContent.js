import React from 'react';

import styles from './SliderContent.module.scss';

const SliderContent = ({translate, transition, width, children}) => {

      const sliderContent = {
            transform: `translateX(-${translate}px)`,
            transition: `transform ease-out ${transition}s`,
            width: `${width}px`
      }

      return (
            <div className={styles['slider-content']} style={sliderContent}>
                  {children}
            </div>
      )
}

export default SliderContent;