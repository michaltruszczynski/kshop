import React from 'react';

import Dot from './Dot/Dot';

import styles from './Dots.module.scss'

const Dots = ({ activeSlide, slides }) => {

      return (
            <div className={styles['dots']}>
                  {slides.map((slide, index) => (
                        <Dot key={slide} active={activeSlide === index}/>
                  ))}
            </div>
      )
}

export default Dots;