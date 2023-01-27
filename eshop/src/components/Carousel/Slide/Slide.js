import React from 'react';

import styles from './Slide.module.scss';

const Slide = ({ content, width }) => {
      const slideImage = {
            backgroundImage: `url(${content.default})`,
            maxWidth: `${width}px`
      }

      return (
            <div className={styles['slide']} style={{width: `${width}px`}}>
                  <img className={styles['slide__image']} src={content} alt="" />
            </div>

      )
}

export default Slide;