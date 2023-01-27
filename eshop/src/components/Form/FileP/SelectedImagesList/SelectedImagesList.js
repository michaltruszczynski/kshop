import React from 'react';

import styles from './SelectedImagesList.module.scss';

const SelectedImagesList = ({ imagesSelected }) => {
      if (!imagesSelected.length) return null;

      return (
            <>
                  <p className={styles['list__heading']}>Files selected:</p>
                  <ul className={styles['list_continer']}>
                        {imagesSelected.map(file => (
                              <li className={styles['list__item']} key={file.name}>
                                    {file.name}
                              </li>
                        ))}
                  </ul>
            </>
      );
}

export default SelectedImagesList;