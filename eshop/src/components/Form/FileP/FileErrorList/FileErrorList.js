import React from 'react';

import Button from '../../../Button/Button';

import styles from './FileErrorList.module.scss'

const FileErrorList = ({ invalidFilesList, onClearErrorMessage }) => {
      if (!invalidFilesList.length) return null;

      const clearErrorListHandler = (event) => {
            event.preventDefault();
            onClearErrorMessage([]);
      }

      return (
            <>
                  <p className={[styles['list__heading'], styles['list__heading--error']].join(' ')}>
                        Files rejected:
                        <Button buttonType="danger" buttonStyle="icon" onClick={clearErrorListHandler}>
                              <span className={styles['button-clear']}>Clear error messages</span>
                        </Button>
                  </p>
                  <ul className={styles['list__container']}>
                        {invalidFilesList.map(file => (
                              <li className={[styles['list__item'], styles['list__item--error']].join(' ')}>File name:{' '}
                                    {file.name}
                                    {file.errors.length ? <p>{file.errors.join(' ')}</p> : null}
                              </li>
                        ))}
                  </ul>
            </>
      )
}

export default FileErrorList;