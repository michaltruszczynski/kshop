import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProductBrandInput from './ProductBrandInput/ProductBrandInput';
import ProductDescriptionInputs from './ProductDescriptionInputs/ProductDescriptionInputs';
import SizeChart from './SizeChartInputs/SizeChart';
import FilePicker from '../Form/FileP/FilePicker';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import ControlButtons from './ControlButtons/ControlButtons';
import InOffer from './ManageProduct/InOffer';

import useForm from '../../hooks/useForm';

import { productDescriptionInputsConfig } from './ProductDescriptionInputs/productDescriptionInputsConfig';
import { productBrandInputConfig } from './ProductBrandInput/productBrandInputConfig';
import { sizeChartSystemInputConfig } from './SizeChartInputs/sizeChartSystemInputConfig';
import { sizeChartInputConfig } from './SizeChartInputs/CustomSizeChart/sizeChartInputConfig';
import { productImageInputConfig } from './ImageFilePicker/productImageInputConfig';
import { definedSizeChartInputConfigId } from './SizeChartInputs/DefinedSizeChart/definedSizeChartInputConfig';
import { inOfferInputConfig } from './ManageProduct/InOfferInputConfig';

import { adminService } from '../../services/adminService';

import { setMessage } from '../../store/actions';

import { Message, ErrorMessage } from '../../utility/helpers';

import useConfirmationDialog from '../../hooks/useConfirmationDialog';

import styles from './EditProductForm.module.scss';

const filePickerConfiguration = {
   fileType: ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
   maxFileSize: 2000,
   allowDuplicate: false,
   minFileNumber: 1,
   maxFileNumber: 6,
};

const asyncOperation = {
   IDLE: 'idle',
   SUCCESS: 'success',
   LOADING: 'loading',
   ERROR: 'error',
};

const EditProductForm = () => {
   const [inputBrandData, inputBrandDataIsValid, inputBrandChangeHandler] = useForm(productBrandInputConfig);
   const [inputsDescriptionData, inputsDescriptionDataAreValid, inputsDescriptionDataChangeHandler] = useForm(productDescriptionInputsConfig);
   const [inputSizeSystemData, inputSizeSystemIsValid, inputSizeSystemChangeHandler] = useForm(sizeChartSystemInputConfig);
   const [inputSizeChartData, inputSizeChartDataIsValid, inputSizeChartDataChangeHandler] = useForm(sizeChartInputConfig);
   const [inputImageData, inputImageDataIsValid, inputImageDataChangeHandler] = useForm(productImageInputConfig);
   const [sizeSystemIdData, , sizeSystemIdDataChangeHandler] = useForm(definedSizeChartInputConfigId);
   const [inOfferData, , inOfferDataChangeHandler] = useForm(inOfferInputConfig);

   const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
   const [product, setProduct] = useState(null);
   const [error, setError] = useState(null);
   const [productId, setProductId] = useState(null);
   const [editing, setEditing] = useState(false);
   const { id } = useParams();
   const history = useHistory();
   const dispatch = useDispatch();

   const { isConfirmed } = useConfirmationDialog();

   useEffect(() => {
      if (!id) {
         return setAsyncCallStatus(asyncOperation.SUCCESS);
      }
      if (editing) return;

      const getProductDetails = async () => {
         setAsyncCallStatus(asyncOperation.LOADING);
         try {
            const response = await adminService.getProduct(id);
            setProduct(response.data);
            const { _id, name, type, category, brand, description, sizeChart, sizeSystemId, price, images, primaryImage, inOffer } = response.data;

            inputsDescriptionDataChangeHandler('name')(name);
            inputsDescriptionDataChangeHandler('type')(type);
            inputsDescriptionDataChangeHandler('category')(category);
            inputBrandChangeHandler('brand')(brand);
            inputsDescriptionDataChangeHandler('description')(description);
            inputsDescriptionDataChangeHandler('price')(price);
            inputSizeChartDataChangeHandler('sizeChart')(sizeChart);
            inOfferDataChangeHandler('inOffer')(inOffer);

            if (sizeSystemId) {
               sizeSystemIdDataChangeHandler('sizeSystemId')(sizeSystemId);
               inputSizeSystemChangeHandler('sizeSystem')('predefined');
            } else {
               inputSizeSystemChangeHandler('sizeSystem')('custom');
            }

            inputImageDataChangeHandler('images')(images);
            inputImageDataChangeHandler('primaryImage')(primaryImage);
            setProductId(_id);

            setAsyncCallStatus(asyncOperation.SUCCESS);
         } catch (error) {
            const errorMsg = new ErrorMessage(error);
            setError(errorMsg);
            setAsyncCallStatus(asyncOperation.ERROR);
         }
      };

      getProductDetails();
   }, [id, editing]);

   const submitHandler = async (event) => {
      event.preventDefault();
      const newData = new FormData();

      const appendInputsData = (inputsData) => {
         Object.entries(inputsData).forEach((data) => {
            newData.append(data[0], data[1].value);
         });
      };

      const appendInputsDataJSON = (inputsDataJSON) => {
         Object.entries(inputsDataJSON).forEach((data) => {
            newData.append(data[0], JSON.stringify(data[1].value));
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

      appendInputsData(inputBrandData);
      appendInputsData(inputsDescriptionData);
      appendInputsData(inputSizeSystemData);
      appendInputsData(sizeSystemIdData);
      appendInputsDataJSON(inputSizeChartData);
      appendInputsDataImages(inputImageData);
      appendInputsData(inOfferData);

      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const response = await adminService.postProduct(newData);

         setAsyncCallStatus(asyncOperation.SUCCESS);

         const newProductMessage = new Message('Set product as available in store.');

         const { message, messageDetailsArray } = newProductMessage.getMessageData();
         dispatch(setMessage(message, messageDetailsArray));
         backToProductList();
      } catch (error) {
         const errorMsg = new ErrorMessage(error);
         setError(errorMsg);
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

      const appendInputsDataJSON = (inputsDataJSON) => {
         Object.entries(inputsDataJSON).forEach((data) => {
            newData.append(data[0], JSON.stringify(data[1].value));
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

      appendInputsData(inputBrandData);
      appendInputsData(inputsDescriptionData);
      appendInputsData(inputSizeSystemData);
      appendInputsDataJSON(inputSizeChartData);
      appendInputsData(sizeSystemIdData);
      appendInputsDataImages(inputImageData);
      appendInputsData(inOfferData);

      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const response = await adminService.putProduct(productId, newData);
         turnOffEditModeHandler();
         setAsyncCallStatus(asyncOperation.SUCCESS);
         const editProductMessage = new Message('Product modified.');
         const { message, messageDetailsArray } = editProductMessage.getMessageData();
         dispatch(setMessage(message, messageDetailsArray));
      } catch (error) {
         const errorMsg = new ErrorMessage(error);
         setError(errorMsg);
         setAsyncCallStatus(asyncOperation.ERROR);
      }
   };

   const isFormDataValid = !(inputBrandDataIsValid && inputsDescriptionDataAreValid && inputSizeSystemIsValid && inputSizeChartDataIsValid && inputImageDataIsValid);

   const changeEditModeHandler = () => {
      setEditing((prevState) => !prevState);
   };

   const turnOffEditModeHandler = () => {
      setEditing(false);
   };

   const backToProductList = () => {
      history.push('/admin/products');
   };

   const removeProductHandler = async () => {
      const operationIsConfirmed = await isConfirmed('Product will be removed. Please confirm.');

      if (!operationIsConfirmed) return;
      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const response = await adminService.removeProduct(id);
         setAsyncCallStatus(asyncOperation.SUCCESS);
         const removeProductMessage = new Message('Product removed.');
         const { message, messageDetailsArray } = removeProductMessage.getMessageData();
         dispatch(setMessage(message, messageDetailsArray));
         backToProductList();
      } catch (error) {
         const errorMsg = new ErrorMessage(error);
         setError(errorMsg);
         setAsyncCallStatus(asyncOperation.ERROR);
      }
   };

   return (
      <AsyncOpBgComponent
         status={asyncCallStatus}
         error={error}
         showErrorMessage={true}
      >
         <div className={styles['title']}>
            <h1 className={styles['title__text']}>{id ? 'Edit Product' : 'Add Product'}</h1>
         </div>
         <form className={styles['form']}>
            <InOffer
               inOfferData={inOfferData}
               inOfferDataChangeHandler={inOfferDataChangeHandler}
               disabled={!editing && productId}
            />
            <ProductBrandInput
               inputBrandData={inputBrandData}
               inputBrandChangeHandler={inputBrandChangeHandler}
               disabled={!editing && productId}
            />
            <ProductDescriptionInputs
               inputsDescriptionData={inputsDescriptionData}
               inputsDescriptionDataChangeHandler={inputsDescriptionDataChangeHandler}
               disabled={!editing && productId}
            />
            <SizeChart
               inputSizeSystemData={inputSizeSystemData}
               inputSizeSystemChangeHandler={inputSizeSystemChangeHandler}
               sizeSystemIdData={sizeSystemIdData}
               sizeSystemIdDataChangeHandler={sizeSystemIdDataChangeHandler}
               inputSizeChartData={inputSizeChartData}
               inputSizeChartDataChangeHandler={inputSizeChartDataChangeHandler}
               disabled={!editing && productId}
            />
            <FilePicker
               imageData={inputImageData.images}
               primaryImageData={inputImageData.primaryImage}
               imageDataOnChangeHandler={inputImageDataChangeHandler('images')}
               primaryImageDataOnChangeHandler={inputImageDataChangeHandler('primaryImage')}
               {...filePickerConfiguration}
               inputName={productImageInputConfig.images.elementName}
               disabled={!editing && productId}
            />
            <ControlButtons
               editing={editing}
               isOwner={product?.isOwner}
               isFormValid={isFormDataValid}
               elementId={productId}
               submitHandler={submitHandler}
               removeHandler={removeProductHandler}
               updateHandler={updateHandler}
               backToPreviousPageHandler={backToProductList}
               changeEditModeHandler={changeEditModeHandler}
            />
         </form>
      </AsyncOpBgComponent>
   );
};

export default EditProductForm;
