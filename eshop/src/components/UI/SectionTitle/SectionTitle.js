import React from 'react';

import styles from './SectionTitle.module.scss';

const SectionTitle = ({ sectionTitle }) => {
      return (
            <div className={styles['title']}>
                  <h1 className={styles['title__text']}>{sectionTitle}</h1>
            </div>
      )
}

export default SectionTitle;