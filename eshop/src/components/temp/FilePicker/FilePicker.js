import React, { useState } from 'react';

import InputError from '../InpurtError/InputError';
import Button from '../../Button/Button';

import { validateInput } from '../../../utility/validators';
import { fileSize, fileType, duplicated, arrayLength } from '../../../utility/validators';

import styles from './FilePicker.module.scss';

const FilePicker = ({
      imageData,
      inputName,
      onChangeHandler,
      fileTypeArray = ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
      maxFileSize = 15000,
      allowDuplicate = false,
      minFileNumber = 1,
      maxFileNumber = 2,
      disabled = false }) => {

      console.log('FilePicker rendering');
      const [invalidFiles, setInvalidFiles] = useState([]);

      const { value: filesSelected, touched, isValid, errors } = imageData;

      const fileValidators = [
            { check: fileSize(maxFileSize), message: 'File can not be larger than 1MB.' },
            { check: fileType(fileTypeArray), message: 'Accepted file types: jpg, jpeg, png.' },
            { check: duplicated(filesSelected, 'name', allowDuplicate), message: 'File duplicated.' }
      ]

      const handleSelectFile = (event) => {
            if (!event.target.files.length) {
                  event.target.value = null;
                  setInvalidFiles([]);
                  return onChangeHandler([...filesSelected]);
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

                  if (!valid) {
                        return newFilesWithErrors.push(newFile);
                  }

                  if (filesSelected.length + newFiles.length >= maxFileNumber) {
                        newFile.isValid = false;
                        newFile.errors = [`Allowed image number exceeded. Max image number ${maxFileNumber}.`];
                        return newFilesWithErrors.push(newFile);
                  }

                  newFiles.push(newFile);
            });
            event.target.value = null;
            setInvalidFiles(newFilesWithErrors);
            onChangeHandler([...filesSelected, ...newFiles]);
      }

      const handleRemoveFile = (event, index) => {
            if (disabled) return;
            const newFilesList = [...filesSelected];
            newFilesList.splice(index, 1);
            onChangeHandler(newFilesList);
            setInvalidFiles([]);
      }

      const handleClearErrorMessages = () => {
            setInvalidFiles([]);
      }

      const inputFieldClasses = inputFieldClass => {
            // let classesArray = [styles[inputFieldClass]];
            // if (!isValid && touched) {
            //       classesArray.push(styles[`${inputFieldClass}--error`])
            // }
            // return classesArray.join(' ');

            
      }

      const renderImages = () => {
            if (!filesSelected.length) return null;

            let iconClasses = [styles['delete-icon']]

            if (disabled) {
                  iconClasses.push(styles['delete-icon--disabled'])
            }

            return filesSelected.map((image, index) => (
                  <div className={styles['image-container']} key={`image${index}`}>
                        <img src={image.url} className={styles['image']} alt={image.name} />

                        <div className={styles['icon-container']}>
                              <i className={`bx bx-trash ${iconClasses.join(' ')}`} onClick={(e) => handleRemoveFile(e, index)} ></i>
                        </div>
                  </div>
            ));
      }

      const renderFileList = () => {
            if (!filesSelected.length) return null

            let filesListItems = <li className={styles['list__item']}>No files selected.</li>
            filesListItems = filesSelected.map(file => (
                  <li className={styles['list__item']} key={file.name}>
                        {file.name}
                  </li>
            ));
            return (
                  <>
                        <p className={styles['list__heading']}>Files selected:</p>
                        <ul className={styles['list_continer']}>
                              {filesListItems}
                        </ul>
                  </>
            );
      }

      const renderErrorList = () => {
            if (!invalidFiles.length) return null;
            let errorList = <li className={[styles['list__item'], styles['list__item--error']].join(' ')}>Error list empty.</li>

            errorList = invalidFiles.map(file => (
                  <li className={[styles['list__item'], styles['list__item--error']].join(' ')}>File name:{' '}
                        {file.name}
                        {file.errors.length ? <p>{file.errors.join(' ')}</p> : null}
                  </li>
            ));

            return (
                  <>
                        <p className={[styles['list__heading'], styles['list__heading--error']].join(' ')}>
                              Files rejected:
                              <Button buttonType="danger" buttonStyle="icon" onClick={handleClearErrorMessages}>
                                    <span className={styles['button-clear']}>Clear error messages</span>
                              </Button>
                        </p>
                        <ul className={styles['list__container']}>
                              {errorList}
                        </ul>
                  </>
            )
      }

      const getInputName = (minFileNumber, maxFileNumber) => {
            if (minFileNumber === maxFileNumber) return `(select ${minFileNumber} image)`;
            return `(select ${minFileNumber} - ${maxFileNumber} images)`
      }

      let previewContainerClasses = [styles['preview-container']];
      if (!isValid && touched) {
            console.log('in')
            previewContainerClasses.push(styles['preview-container--error']);
      }

      return (
            <div className={styles['field']}>
                  <p className={styles['field__name']}>{inputName}:</p>
                  <div className={previewContainerClasses.join(' ')}> {/* inputFieldClasses('preview-container') */}
                        {renderImages()}
                        <div className={styles['button']}> {/* inputFieldClasses('button') */}
                              <label className={styles['button__label']}>
                                    <i className={`bx bxs-file-plus ${styles['add-icon']}`}></i> { /* inputFieldClasses('add-icon') */}
                                    <input
                                          type="file"
                                          multiple
                                          className={styles['display-none']}
                                          onChange={handleSelectFile}
                                          disabled={disabled}
                                    />
                              </label>
                        </div>
                  </div>
                  <div className={styles['field__error']}>
                        <InputError touched={touched} isValid={isValid} errors={errors} />
                  </div>
                  {renderFileList()}
                  {renderErrorList()}
            </div>
      )
}

export default FilePicker