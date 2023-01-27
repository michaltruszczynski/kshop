import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import SizeChartNameInput from './SizeChartNameInput/SizeChartNameInput';
import CustomSizeChart from '../Form/CustomSizeChart/CustomSizeChart';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { sizeChartNameInputConfig } from './SizeChartNameInput/sizeChartNameInputConfig';
import { sizeChartInputConfig } from '../Form/CustomSizeChart/sizeChartInputsConfig';

import { addNewSizeSystem, getSizeSystem, putSizeSystem } from '../../services/productService';

import { ErrorMessage } from '../../utility/helpers';

import styles from './EditSizeChartForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const EditSizeChartForm = () => {
      const [inputSizeSystemNameData, inputSizeChartNameDataIsValid, inputSizeChartNameDataChangeHandler] = useForm(sizeChartNameInputConfig)
      const [inputSizeChartData, inputSizeChartDataIsValid, inputSizeChartDataChangeHandler] = useForm(sizeChartInputConfig)
      const [error, setError] = useState(null);
      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
      const [sizeSystemId, setSizeSystemId] = useState(null);
      const [editing, setEditing] = useState(false);
      const { id } = useParams();
      const history = useHistory();

      useEffect(() => {
            if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);
            if (editing) return;

            const getSizeSystemDetails = async () => {
                  setAsyncCallStatus(asyncOperation.LOADING)
                  try {
                        const sizeSystem = await getSizeSystem(id);

                        const { _id, sizeSystemName, sizeChart } = sizeSystem.data;
                        inputSizeChartDataChangeHandler('sizeChart')(sizeChart);
                        inputSizeChartNameDataChangeHandler('sizeChartName')(sizeSystemName);
                        setSizeSystemId(_id);
                        setAsyncCallStatus(asyncOperation.SUCCESS);
                  } catch (error) {
                        const errorMsg = new ErrorMessage(error);
                        setError(errorMsg);
                        setAsyncCallStatus(asyncOperation.ERROR);
                  }
            }

            getSizeSystemDetails();

      }, [id, editing])

      const submitHandler = async (event) => {
            event.preventDefault();
            const newSizeSystem = {
                  sizeSystemName: inputSizeSystemNameData.sizeChartName.value,
                  sizeChart: inputSizeChartData.sizeChart.value
            }
            setAsyncCallStatus(asyncOperation.LOADING)
            try {
                  const respond = await addNewSizeSystem(newSizeSystem);

                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToSizeSystemList();
            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  const errorFormFieldsName = error.getErrorFormFieldsName();
                  if (errorFormFieldsName.length) {
                        errorFormFieldsName.forEach(fieldName => {
                              if (fieldName === 'sizeChart') {
                                    inputSizeChartDataChangeHandler('sizeChart')('', true);
                              }

                              if (fieldName === 'sizeSystemName') {
                                    inputSizeChartNameDataChangeHandler('sizeChartName')('', true);
                              }
                        })
                  }
                  setError(errorMsg);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const updateHandler = async (event) => {
            event.preventDefault();
            const updatedSizeSystem = {
                  sizeSystemName: inputSizeSystemNameData.sizeChartName.value,
                  sizeChart: inputSizeChartData.sizeChart.value
            }

            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const respond = await putSizeSystem(sizeSystemId, updatedSizeSystem);

                  setEditing(prevState => !prevState);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  const errorFormFieldsName = error.getErrorFormFieldsName();
                  console.log(errorFormFieldsName)
                  if (errorFormFieldsName.length) {
                        errorFormFieldsName.forEach(fieldName => {
                              if (fieldName === 'sizeChart') {
                                    inputSizeChartDataChangeHandler('sizeChart')('', true);
                              }

                              if (fieldName === 'sizeSystemName') {
                                    inputSizeChartNameDataChangeHandler('sizeChartName')('', true);
                              }
                        })
                  }
                  setError(errorMsg);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const changeEditModeHandler = () => {
            setEditing(prevState => !prevState)
      }

      const backToSizeSystemList = () => {
            history.push('/admin/sizesystems');
      }

      const isFormDataValid = !(inputSizeChartNameDataIsValid && inputSizeChartDataIsValid);

      return (
            <AsyncOpBgComponent status={asyncCallStatus} error={error} showErrorMessage={true}>
                  <form className={styles['form']}>
                        <SizeChartNameInput
                              inputSizeChartNameData={inputSizeSystemNameData}
                              inputSizeChartNameDataChangeHandler={inputSizeChartNameDataChangeHandler}
                              disabled={!editing && id} />
                        <CustomSizeChart
                              sizeChart={inputSizeChartData['sizeChart']}
                              changeSizeChart={inputSizeChartDataChangeHandler('sizeChart')}
                              disabled={!editing && id} />
                        <div className={styles['form__buttons']} >
                              {(!editing && !sizeSystemId) && <Button
                                    onClick={submitHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    disabled={isFormDataValid} type="submit">
                                    Save
                              </Button>}
                              {(editing && sizeSystemId) && (
                                    <>
                                          <Button
                                                onClick={updateHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                disabled={isFormDataValid} type="submit">
                                                Update
                                          </Button>
                                          <Button
                                                onClick={submitHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                disabled={isFormDataValid} type="submit">
                                                Save as new
                                          </Button>
                                          <Button
                                                onClick={changeEditModeHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="submit">
                                                Cancel
                                          </Button>
                                    </>
                              )}
                              {(!editing && sizeSystemId) && (
                                    <>
                                          <Button
                                                onClick={changeEditModeHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="submit">
                                                Edit
                                          </Button>
                                          <Button
                                                onClick={backToSizeSystemList}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="submit">
                                                Back to list
                                          </Button>
                                    </>
                              )}
                        </div>
                  </form>
            </AsyncOpBgComponent>
      )
}

export default EditSizeChartForm;