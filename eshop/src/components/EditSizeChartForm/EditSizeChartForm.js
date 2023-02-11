import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SizeChartNameInput from './SizeChartNameInput/SizeChartNameInput';
import CustomSizeChart from '../Form/CustomSizeChart/CustomSizeChart';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import ControlButtons from './ControlButtons/ControlButtons';

import useForm from '../../hooks/useForm';

import { sizeChartNameInputConfig } from './SizeChartNameInput/sizeChartNameInputConfig';
import { sizeChartInputConfig } from '../Form/CustomSizeChart/sizeChartInputsConfig';

import { addNewSizeSystem, getSizeSystem, putSizeSystem, removeSizeSystem } from '../../services/productService';

import { setMessage } from '../../store/actions';

import { Message, ErrorMessage } from '../../utility/helpers';

import useConfirmationDialog from '../../hooks/useConfirmationDialog';

import styles from './EditSizeChartForm.module.scss';

const asyncOperation = {
   IDLE: 'idle',
   SUCCESS: 'success',
   LOADING: 'loading',
   ERROR: 'error',
};

const EditSizeChartForm = () => {
   const [inputSizeSystemNameData, inputSizeChartNameDataIsValid, inputSizeChartNameDataChangeHandler] = useForm(sizeChartNameInputConfig);
   const [inputSizeChartData, inputSizeChartDataIsValid, inputSizeChartDataChangeHandler] = useForm(sizeChartInputConfig);
   const [error, setError] = useState(null);
   const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
   const [sizeSystemId, setSizeSystemId] = useState(null);
   const [sizeSystem, setSizeSystem] = useState(null);
   const [editing, setEditing] = useState(false);
   const { id } = useParams();
   const history = useHistory();
   const dispatch = useDispatch();
   const { isConfirmed } = useConfirmationDialog();

   useEffect(() => {
      if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);
      if (editing) return;

      const getSizeSystemDetails = async () => {
         setAsyncCallStatus(asyncOperation.LOADING);
         try {
            const sizeSystem = await getSizeSystem(id);

            const { _id, sizeSystemName, sizeChart } = sizeSystem.data;
            inputSizeChartDataChangeHandler('sizeChart')(sizeChart);
            inputSizeChartNameDataChangeHandler('sizeChartName')(sizeSystemName);
            setSizeSystemId(_id);
            setSizeSystem(sizeSystem.data);
            setAsyncCallStatus(asyncOperation.SUCCESS);
         } catch (error) {
            const errorMsg = new ErrorMessage(error);
            setError(errorMsg);
            setAsyncCallStatus(asyncOperation.ERROR);
         }
      };

      getSizeSystemDetails();
   }, [id, editing]);

   const submitHandler = async (event) => {
      event.preventDefault();
      const newSizeSystem = {
         sizeSystemName: inputSizeSystemNameData.sizeChartName.value,
         sizeChart: inputSizeChartData.sizeChart.value,
      };
      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const respond = await addNewSizeSystem(newSizeSystem);

         setAsyncCallStatus(asyncOperation.SUCCESS);
         const newSizeSystemMessage = new Message('New size system added.');
         const { message, messageDetailsArray } = newSizeSystemMessage.getMessageData();
         dispatch(setMessage(message, messageDetailsArray));
         backToSizeSystemList();
      } catch (error) {
         const errorMsg = new ErrorMessage(error);
         const errorFormFieldsName = error.getErrorFormFieldsName();
         if (errorFormFieldsName.length) {
            errorFormFieldsName.forEach((fieldName) => {
               if (fieldName === 'sizeChart') {
                  inputSizeChartDataChangeHandler('sizeChart')('', true);
               }

               if (fieldName === 'sizeSystemName') {
                  inputSizeChartNameDataChangeHandler('sizeChartName')('', true);
               }
            });
         }
         setError(errorMsg);
         setAsyncCallStatus(asyncOperation.ERROR);
      }
   };

   const updateHandler = async (event) => {
      event.preventDefault();
      const updatedSizeSystem = {
         sizeSystemName: inputSizeSystemNameData.sizeChartName.value,
         sizeChart: inputSizeChartData.sizeChart.value,
      };

      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const respond = await putSizeSystem(sizeSystemId, updatedSizeSystem);

         turnOffEditModeHandler();
         const modifiedSizeSystemMessage = new Message('Size system modified.');
         const { message, messageDetailsArray } = modifiedSizeSystemMessage.getMessageData();
         dispatch(setMessage(message, messageDetailsArray));
         setAsyncCallStatus(asyncOperation.SUCCESS);
      } catch (error) {
         const errorMsg = new ErrorMessage(error);
         const errorFormFieldsName = error.getErrorFormFieldsName();
         if (errorFormFieldsName.length) {
            errorFormFieldsName.forEach((fieldName) => {
               if (fieldName === 'sizeChart') {
                  inputSizeChartDataChangeHandler('sizeChart')('', true);
               }

               if (fieldName === 'sizeSystemName') {
                  inputSizeChartNameDataChangeHandler('sizeChartName')('', true);
               }
            });
         }
         setError(errorMsg);
         turnOffEditModeHandler();
         setAsyncCallStatus(asyncOperation.ERROR);
      }
   };

   const changeEditModeHandler = () => {
      setEditing((prevState) => !prevState);
   };

   const turnOffEditModeHandler = () => {
      setEditing(false);
   };

   const backToSizeSystemList = () => {
      history.push('/admin/sizesystems');
   };

   const removeSizeSystemHandler = async () => {
      const operationIsConfirmed = await isConfirmed('Size system will be removed. Please confirm.');

      if (!operationIsConfirmed) return;
      setAsyncCallStatus(asyncOperation.LOADING);
      try {
         const response = await removeSizeSystem(id);
         setAsyncCallStatus(asyncOperation.SUCCESS);
         const removeBrandMessage = new Message('Size system removed.');
         const { message, messageDetailsArray } = removeBrandMessage.getMessageData();
         dispatch(setMessage(message, messageDetailsArray));
         backToSizeSystemList();
      } catch (error) {
         const errorMsg = new ErrorMessage(error);
         setError(errorMsg);
         setAsyncCallStatus(asyncOperation.ERROR);
      }
   };

   const isFormDataValid = !(inputSizeChartNameDataIsValid && inputSizeChartDataIsValid);

   return (
      <AsyncOpBgComponent
         status={asyncCallStatus}
         error={error}
         showErrorMessage={true}
      >
         <form className={styles['form']}>
            <SizeChartNameInput
               inputSizeChartNameData={inputSizeSystemNameData}
               inputSizeChartNameDataChangeHandler={inputSizeChartNameDataChangeHandler}
               disabled={!editing && id}
            />
            <CustomSizeChart
               sizeChart={inputSizeChartData['sizeChart']}
               changeSizeChart={inputSizeChartDataChangeHandler('sizeChart')}
               disabled={!editing && id}
            />
            <div className={styles['form__buttons']}>
               <ControlButtons
                  editing={editing}
                  isOwner={sizeSystem?.isOwner}
                  isFormValid={isFormDataValid}
                  elementId={sizeSystemId}
                  submitHandler={submitHandler}
                  removeHandler={removeSizeSystemHandler}
                  updateHandler={updateHandler}
                  backToPreviousPageHandler={backToSizeSystemList}
                  changeEditModeHandler={changeEditModeHandler}
               />
            </div>
         </form>
      </AsyncOpBgComponent>
   );
};

export default EditSizeChartForm;
