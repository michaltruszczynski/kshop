import React from 'react';

import styles from './Slide.module.scss';

import img from '../../../images/Products/Kites/OrbitBigAirFreeride/orbit_bottom.png'

const Slide = ({content}) => {
      const slideImage = {
            backgroundImage: `url(${content.default})`
      }

      return (
            <div className={styles['slide']} style={slideImage}>

            </div>
      )
}

export default Slide;