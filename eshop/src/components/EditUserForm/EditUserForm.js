import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserInfoInputs from './UserInfoInputs/UserInfoInputs';
import UserRoleInput from './UserRoleInput/UserRoleInput';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { userInfoInputConfig } from './UserInfoInputs/userInfoInputsConfig';
import { userRoleInputConfig } from './UserRoleInput/userRoleInputConfig';

import { adminService } from '../../services/adminService';
import { ErrorMessage } from '../../utility/helpers';

import styles from './EditUserForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const EditUserForm = () => {
      const [userInfoData, userInfoDataIsValid, userInfoDataChangeHandler] = useForm(userInfoInputConfig);
      const [userRoleData, userRoleDataIsValid, userRoleDataChangeHandler] = useForm(userRoleInputConfig);
      const [error, setError] = useState(null);
      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
      const [userId, setUserId] = useState(null);
      const [editing, setEditing] = useState(false);
      const { id } = useParams();
      const history = useHistory();

      const authState = useSelector(state => state.auth);

      useEffect(() => {
            if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);
            if (editing) return;

            const getUserDetails = async () => {
                  setAsyncCallStatus(asyncOperation.LOADING);
                  try {
                        const response = await adminService.getUser(id)
                        const { user } = response.data;
                        const { _id, email, name, userRole } = user;
                        setUserId(_id);
                        userInfoDataChangeHandler('name')(name);
                        userInfoDataChangeHandler('email')(email);
                        userRoleDataChangeHandler('userRole')(userRole.name);
                        setAsyncCallStatus(asyncOperation.SUCCESS);
                  } catch (error) {
                        const errorMsg = new ErrorMessage(error);
                        setError(errorMsg);
                        setAsyncCallStatus(asyncOperation.ERROR);
                  }
            }

            getUserDetails();

      }, [id, editing]);

      const updateHandler = async (event) => {
            event.preventDefault();

            const updatedUser = {
                  name: userInfoData.name.value,
                  userRole: userRoleData.userRole.value
            }
            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await adminService.putUser(userId, updatedUser);
                  setEditing(prevState => !prevState);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
            }
            catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  const errorFormFieldsName = errorMsg.getErrorFormFieldsName();
                        if (errorFormFieldsName.length) {
                              errorFormFieldsName.forEach(fieldName => {
                                    if (fieldName === 'name') {
                                          userInfoDataChangeHandler('name')('', true);
                                    }
                              });
                        }
                  setError(errorMsg);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const changeEditModeHandler = () => {
            setEditing(prevState => !prevState)
      }

      const backToSizeSystemList = () => {
            history.push('/admin/users');
      }

      const isFormDataValid = !(userInfoDataIsValid && userRoleDataIsValid);


      return (
            <AsyncOpBgComponent status={asyncCallStatus} error={error} showErrorMessage={true}>
                  <form className={styles['form']}>
                        <UserInfoInputs
                              userInfoData={userInfoData}
                              userInfoDataChangeHandler={userInfoDataChangeHandler}
                              disabled={!editing && !!id} />
                        <UserRoleInput
                              userRoleData={userRoleData}
                              userRoleDataChangeHandler={userRoleDataChangeHandler}
                              disabled={!editing && !!id} />
                        <div className={styles['form__buttons']} >
                              {(editing && userId) && (
                                    <>
                                          <Button
                                                onClick={updateHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                disabled={isFormDataValid} type="submit">
                                                Update
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
                              {((!editing && userId) && (userId !== authState.userId)) && (
                                    <Button
                                          onClick={changeEditModeHandler}
                                          buttonType="success"
                                          buttonStyle="standard"
                                          type="submit">
                                          Edit
                                    </Button>
                              )}
                              {(!editing && userId) && (
                                    <Button
                                          onClick={backToSizeSystemList}
                                          buttonType="success"
                                          buttonStyle="standard"
                                          type="submit">
                                          Back to list
                                    </Button>
                              )}
                        </div>
                  </form>
            </AsyncOpBgComponent>
      )
}

export default EditUserForm;