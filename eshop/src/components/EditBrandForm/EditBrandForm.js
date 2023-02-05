import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import BrandNameInput from './BrandNameInput/BrandNameInput';
import FilePicker from '../Form/FileP/FilePicker';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import Button from '../Button/Button';
import ControlButtons from './ControlButtons/ControlButtons';

import useForm from '../../hooks/useForm';

import { brandNameInputConfig } from './BrandNameInput/brandNameInputConfig';
import { brandImageInputConfig } from './BrandLogoInputConfig/brandLogoInputConfig';

import { adminService } from '../../services/adminService';

import { setMessage } from '../../store/actions';

import { Message, ErrorMessage } from '../../utility/helpers';

import useConfirmationDialog from '../../hooks/useConfirmationDialog';

import styles from './EditBrandForm.module.scss';

const filePickerConfiguration = {
   fileType: ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
   maxFileSize: 1000,
   allowDuplicate: false,
   minFileNumber: 0,
   maxFileNumber: 2,
};

const asyncOperation = {
   IDLE: 'idle',
   SUCCESS: 'success',
   LOADING: 'loading',
   ERROR: 'error',
};

const EditBrandForm = () => {
   const [inputBrandNameData, inputBrandNameDataIsValid, inputBrandNameDataChangeHandler] = useForm(brandNameInputConfig);
   const [inputImageData, inputImageDataisValid, inputImageDataChangeHandler] = useForm(brandImageInputConfig);

   const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
   const [brandId, setBrandId] = useState(null);
   const [brand, setBrand] = useState(null);
   const [editing, setEditing] = useState(false);
   const [error, setError] = useState(null);
   const { id } = useParams();
   const history = useHistory();
   const { isConfirmed } = useConfirmationDialog();

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
            setBrand(response.data);
            setAsyncCallStatus(asyncOperation.SUCCESS);
         } catch (error) {
            console.log(error.response);
            setAsyncCallStatus(asyncOperation.ERROR);
         }
      };

      getBrandDetails();
   }, [id, editing]);

   const submitHandler = async (event) => {
      event.preventDefault();
      const newData = new FormData();

      const appendInputsData = (inputsData) => {
         Object.entries(inputsData).forEach((data) => {
            newData.append(data[0], data[1].value);
         });
      };

      const appendInputsDataImages = (inputsDataImages) => {
         Object.entries(inputsDataImages).forEach((data) => {
            if (data[0] === 'images') {
               data[1].value.forEach((image) => {
                  if (!image.file) {
                     newData.append('urlImages', JSON.stringify(image));
                  }
                  newData.append(data[0], image.file);
               });
            }

            if (data[0] === 'primaryImage') {
               newData.append(data[0], data[1].value);
            }
         });
      };

      appendInputsData(inputBrandNameData);
      appendInputsDataImages(inputImageData);

      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const response = await adminService.postBrand(newData);
         console.log(response);
         setAsyncCallStatus(asyncOperation.SUCCESS);
         backToBrandList();
      } catch (error) {
         console.log(error.response);
         console.log(error.request);
         setAsyncCallStatus(asyncOperation.ERROR);
      }
   };

   const updateHandler = async (event) => {
      event.preventDefault();

      const newData = new FormData();

      const appendInputsData = (inputsData) => {
         Object.entries(inputsData).forEach((data) => {
            newData.append(data[0], data[1].value);
         });
      };

      const appendInputsDataImages = (inputsDataImages) => {
         Object.entries(inputsDataImages).forEach((data) => {
            if (data[0] === 'images') {
               data[1].value.forEach((image) => {
                  if (!image.file) {
                     newData.append('urlImages', JSON.stringify(image));
                  }
                  newData.append(data[0], image.file);
               });
            }

            if (data[0] === 'primaryImage') {
               newData.append(data[0], data[1].value);
            }
         });
      };
      appendInputsData(inputBrandNameData);
      appendInputsDataImages(inputImageData);
      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const response = await adminService.putBrand(brandId, newData);
         console.log(response);
         setEditing((prevState) => !prevState);
         setAsyncCallStatus(asyncOperation.SUCCESS);
      } catch (error) {
         console.log(error);
         console.log(error.response);
         const errorMsg = new ErrorMessage(error);
         console.log(errorMsg);
         setError(errorMsg);
         setAsyncCallStatus(asyncOperation.ERROR);
         disableEditModeHandler();
      }
   };

   const isFormDataValid = !(inputBrandNameDataIsValid && inputImageDataisValid);

   const changeEditModeHandler = () => {
      setEditing((prevState) => !prevState);
   };

   const disableEditModeHandler = () => {
      setEditing(false);
   };

   const backToBrandList = () => {
      history.push('/admin/brands');
   };

   const removeBrandHandler = async () => {
      const operationIsConfirmed = await isConfirmed('Product will be removed. Please confirm.');

      if (!operationIsConfirmed) return;
      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const response = await adminService.removeBrand(id);
         setAsyncCallStatus(asyncOperation.SUCCESS);
         backToBrandList();
      } catch (error) {
         const errorMsg = new ErrorMessage(error);
         setError(errorMsg);
         setAsyncCallStatus(asyncOperation.ERROR);
         disableEditModeHandler();
      }
   };

   return (
      <AsyncOpBgComponent
         status={asyncCallStatus}
         error={error}
         showErrorMessage={true}
      >
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
            <div className={styles['form__buttons']}>
               <ControlButtons
                  editing={editing}
                  isOwner={brand?.isOwner}
                  isFormValid={isFormDataValid}
                  elementId={brandId}
                  submitHandler={submitHandler}
                  removeHandler={removeBrandHandler}
                  updateHandler={updateHandler}
                  backToPreviousPageHandler={backToBrandList}
                  changeEditModeHandler={changeEditModeHandler}
               />
            </div>
         </form>
      </AsyncOpBgComponent>
   );
};

export default EditBrandForm;
