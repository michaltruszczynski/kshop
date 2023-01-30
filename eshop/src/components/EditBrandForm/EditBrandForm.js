import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import BrandNameInput from './BrandNameInput/BrandNameInput';
import FilePicker from '../Form/FileP/FilePicker';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { brandNameInputConfig } from './BrandNameInput/brandNameInputConfig';
import { brandImageInputConfig } from './BrandLogoInputConfig/brandLogoInputConfig';

import { adminService } from '../../services/adminService';

import { setMessage } from '../../store/actions';

import { Message, ErrorMessage } from '../../utility/helpers';

import styles from './EditBrandForm.module.scss';

const filePickerConfiguration = {
      fileType: ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
      maxFileSize: 1000,
      allowDuplicate: false,
      minFileNumber: 0,
      maxFileNumber: 2
}

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const EditBrandForm = () => {
      const [inputBrandNameData, inputBrandNameDataIsValid, inputBrandNameDataChangeHandler] = useForm(brandNameInputConfig)
      const [inputImageData, inputImageDataisValid, inputImageDataChangeHandler] = useForm(brandImageInputConfig)

      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
      const [brandId, setBrandId] = useState(null);
      const [editing, setEditing] = useState(false);
      const [error, setError] = useState(null);
      const { id } = useParams();
      const history = useHistory();

      useEffect(() => {
            if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);
            if (editing) return;

            const getBrandDetails = async () => {
                  setAsyncCallStatus(asyncOperation.LOADING);
                  try {
                        const response = await adminService.getBrand(id);
                        const { _id, brandName, images } = response.data;
                        inputBrandNameDataChangeHandler('brandName')(brandName);
                        inputImageDataChangeHandler('images')(images);
                        setBrandId(_id);
                        setAsyncCallStatus(asyncOperation.SUCCESS);
                  } catch (error) {
                        console.log(error.response);
                        setAsyncCallStatus(asyncOperation.ERROR);
                  }
            }

            getBrandDetails();

      }, [id, editing])

      const submitHandler = async (event) => {
            event.preventDefault();
            const newData = new FormData();

            const appendInputsData = inputsData => {
                  Object.entries(inputsData).forEach(data => {
                        newData.append(data[0], data[1].value)
                  });
            }

            const appendInputsDataImages = inputsDataImages => {
                  Object.entries(inputsDataImages).forEach(data => {
                        if (data[0] === 'images') {
                              data[1].value.forEach(image => {
                                    if (!image.file) {
                                          newData.append('urlImages', JSON.stringify(image));
                                    }
                                    newData.append(data[0], image.file);
                              })
                        }

                        if (data[0] === 'primaryImage') {
                              newData.append(data[0], data[1].value)
                        }

                  });
            }

            appendInputsData(inputBrandNameData);
            appendInputsDataImages(inputImageData);

            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await adminService.postBrand(newData);
                  console.log(response);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToSizeSystemList();
            } catch (error) {
                  console.log(error.response);
                  console.log(error.request);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const updateHandler = async (event) => {
            event.preventDefault();

            const newData = new FormData();

            // const getFormData = (inputsData = {}, inputsDataImages = {}) => {
            //       const newData = new FormData();
            //       console.log(inputsData);
            //       if (!((typeof inputsData === 'object') && (typeof inputsDataImages === 'object'))) return newData;

            //       Object.entries(inputsData).forEach(data => {
            //             console.log('check', data[0], data[1].value)
            //             newData.append(data[0], data[1].value);
            //       });

            //       Object.entries(inputsDataImages).forEach(data => {
            //             data[1].value.forEach(image => {
            //                   console.log(data[0], image.file);
            //                   if (!image.file) {
            //                         // newData.append('fileName', image.fileName);
            //                         newData.append('fileName', JSON.stringify(image));
            //                   }
            //                   newData.append(data[0], image.file);
            //             })
            //       });

            //       return newData;
            // }


            // const newData = getFormData(inputBrandNameData, inputImageData);

            const appendInputsData = inputsData => {
                  Object.entries(inputsData).forEach(data => {
                        // console.log('[EditProductForm]', data[0], data[1].value)
                        newData.append(data[0], data[1].value)
                  });
            }

            const appendInputsDataImages = inputsDataImages => {
                  Object.entries(inputsDataImages).forEach(data => {
                        if (data[0] === 'images') {
                              data[1].value.forEach(image => {
                                    console.log(data[0], image.file);
                                    if (!image.file) {
                                          // newData.append('fileName', image.fileName);
                                          newData.append('urlImages', JSON.stringify(image));
                                    }
                                    newData.append(data[0], image.file);
                              })
                        }

                        if (data[0] === 'primaryImage') {
                              newData.append(data[0], data[1].value)
                        }

                  });
            }
            appendInputsData(inputBrandNameData);
            appendInputsDataImages(inputImageData);
            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await adminService.putBrand(brandId, newData);
                  console.log(response)
                  setEditing(prevState => !prevState);
                  setAsyncCallStatus(asyncOperation.SUCCESS);

            } catch (error) {
                  console.log(error.response);
                  const errorMsg = new ErrorMessage(error);
                  setError(errorMsg);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const isFormDataValid = !(inputBrandNameDataIsValid && inputImageDataisValid);

      const changeEditModeHandler = () => {
            setEditing(prevState => !prevState)
      }

      const backToSizeSystemList = () => {
            history.push('/admin/brands');
      }

      return (
            <AsyncOpBgComponent status={asyncCallStatus}>
                  <form className={styles['form']}>
                        <BrandNameInput
                              inputBrandNameData={inputBrandNameData}
                              inputBrandNameDataChangeHandler={inputBrandNameDataChangeHandler}
                              disabled={!editing && id}
                        />
                        <FilePicker
                              imageData={inputImageData.images}
                              imageDataOnChangeHandler={inputImageDataChangeHandler('images')}
                              {...filePickerConfiguration}
                              inputName={brandImageInputConfig.images.elementName}
                              disabled={!editing && id}
                        />
                        <div className={styles['form__buttons']} >
                              {(!editing && !brandId) && <Button
                                    onClick={submitHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    disabled={isFormDataValid} type="submit">
                                    Save
                              </Button>}
                              {(editing && brandId) && (
                                    <>
                                          <Button
                                                onClick={updateHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                disabled={isFormDataValid} type="button">
                                                Update
                                          </Button>
                                          <Button
                                                onClick={changeEditModeHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="button">
                                                Cancel
                                          </Button>
                                    </>
                              )}
                              {(!editing && brandId) && (
                                    <>
                                          <Button
                                                onClick={changeEditModeHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="button">
                                                Edit
                                          </Button>
                                          <Button
                                                onClick={backToSizeSystemList}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="button">
                                                Back to list
                                          </Button>
                                    </>
                              )}
                        </div>
                  </form>
            </AsyncOpBgComponent>
      )
}

export default EditBrandForm;