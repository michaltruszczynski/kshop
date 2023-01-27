import React, { useState } from 'react';

import InputError from '../../Form/InpurtError/InputError';

import { fileSize, fileType, duplicated, validateInput } from '../../../utility/validators';

import styles from './FilePicker.module.scss';

const FilePicker = ({ inputImageData, inputImageDataChangeHandler }) => {
      const [invalidFiles, setInvalidFiles] = useState([])

      const { value: filesSelected, touched, isValid, errors } = inputImageData.productImage

      const fileValidators = [
            { check: fileSize(), message: 'File can not be larger than 1MB.' },
            { check: fileType(), message: 'Accepted file types: jpg, jpeg, png.' },
            { check: duplicated(filesSelected, 'name'), message: 'File duplicated.' }
      ]

      const resetInvalidFiles = () => {
            setInvalidFiles([])
      }

      const handleSelectFile = (event) => {
            if (!event.target.files.length) {
                  event.target.value = null;
                  return resetInvalidFiles();
            }

            let newFilesWithErrors = [];
            let newFiles = [];

            [...event.target.files].forEach(file => {
                  const { isValid: valid, errorMessages } = validateInput(fileValidators, file);
                  let newFile = {
                        file: file,
                        name: file.name,
                        url: URL.createObjectURL(file),
                        size: file.size,
                        type: file.type,
                        isValid: valid,
                        errors: errorMessages
                  }

                  if (valid) {
                        return newFiles.push(newFile)
                  }
                  newFilesWithErrors.push(newFile)
            });
            event.target.value = null;
            setInvalidFiles(newFilesWithErrors);
            inputImageDataChangeHandler([...filesSelected, ...newFiles]);
      }

      const handleRemoveFile = (event, index) => {
            const newFilesList = [...filesSelected];
            newFilesList.splice(index, 1);
            inputImageDataChangeHandler(newFilesList);
            resetInvalidFiles();
      }

      const inputFieldClasses = inputFieldClass => {
            let classesArray = [styles[inputFieldClass]];
            if (!isValid && touched) {
                  classesArray.push(styles[`${inputFieldClass}--error`])
            }
            return classesArray.join(' ');
      }

      const renderImages = () => {
            if (!filesSelected.length) return null;

            return filesSelected.map((image, index) => (
                  <div className={styles['image-container']} key={`image${index}`}>
                        <img src={image.url} className={styles['image']} alt={image.name} />

                        <div className={styles['icon-container']}>
                              <i className={`bx bx-trash ${styles['delete-icon']}`} onClick={(e) => handleRemoveFile(e, index)} ></i>
                        </div>
                  </div>
            ));
      }

      const renderFileList = () => {
            if (!filesSelected.length) return null;

            return (
                  <>
                        <p>Files selected:</p>
                        <ul className={styles['list']}>
                              {filesSelected.map(file => (
                                    <li className={styles['list__item']} key={file.name}>
                                          {file.name}
                                    </li>))}
                        </ul>
                  </>
            );
      }

      const renderErrorList = () => {
            if (!invalidFiles.length) return null;

            return (
                  <>
                        <p className={styles['error-list']}>Files rejected:</p>
                        <ul className={styles['list']}>
                              {invalidFiles.map((file, index) => (
                                    <li key={`${file.name}-${index}`} className={[styles['list__item'], styles['list__item--error']].join(' ')}>File name:{' '}
                                          {file.name}
                                          {file.errors.length ? <p>{file.errors.join(' ')}</p> : null}
                                    </li>))}
                        </ul>
                  </>
            );
      }

      return (
            <div className={styles['field']}>
                  <p className={styles['field__name']}>Product images (select 3 - 5 images):</p>
                  <div className={inputFieldClasses('preview-container')}>
                        {renderImages()}
                        <div className={inputFieldClasses('button')}>
                              <label className={styles['button__label']}>
                                    <i className={`bx bxs-file-plus ${inputFieldClasses('add-icon')}`}></i>
                                    <input
                                          type="file"
                                          multiple
                                          className={styles['display-none']}
                                          onChange={handleSelectFile} />
                              </label>
                        </div>
                  </div>
                  {renderFileList()}
                  {renderErrorList()}
                  <InputError touched={touched} isValid={isValid} errors={errors} />
            </div>
      )
}

export default FilePicker