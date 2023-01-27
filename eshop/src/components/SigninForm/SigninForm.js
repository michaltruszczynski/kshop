import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';

import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import Button from '../Button/Button';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useForm from '../../hooks/useForm';

import { emailInputConfig } from './EmailInput/emailInputConfig';
import { passwordInputConfig } from './PasswordInput/passwordInputConfig';

import { authSigninSuccess, setMessage, setRedirectPath } from '../../store/actions';

import { authService } from '../../services/authService';
import { Message, ErrorMessage } from '../../utility/helpers';

import styles from './SigninForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const SigninForm = () => {
      const [loading, setLoading] = useState(asyncOperation.SUCCESS);
      const [error, setError] = useState(null);
      const dispatch = useDispatch();
      const history = useHistory();
      const [emailData, emailIsValid, emailDataChangeHandler] = useForm(emailInputConfig);
      const [passwordData, passwordIsValid, passwordChangeHandler] = useForm(passwordInputConfig);

      const authState = useSelector(state => state.auth);
      const { userId, redirectPath } = authState;

      useLayoutEffect(() => {
            if (!userId) { return; }

            if (!redirectPath) {
                  return history.push('/shop');
            }

            history.push(redirectPath);

      }, [userId, redirectPath, history, dispatch])

      useEffect(() => {
            return () => {
                  dispatch(setRedirectPath(null))
            }
      }, [dispatch])

      const resetInputFields = () => {
            emailDataChangeHandler('email')('', false);
            passwordChangeHandler('password')('', false);
      }

      const showSuccessSigninMessage = (userRole) => {
            const signinMessage = new Message('You are logged in.');
            if (userRole === 'client') {
                  signinMessage.addMessageDetails('Enjoy shopping.');
            }
            const { message, messageDetailsArray } = signinMessage.getMessageData();
            dispatch(setMessage(message, messageDetailsArray));
      }

      const submitHandler = async (event) => {
            event.preventDefault();
            const userCredentials = {
                  email: emailData.email.value,
                  password: passwordData.password.value
            }
            try {
                  setLoading(asyncOperation.LOADING);
                  const response = await authService.signinUser(userCredentials);
                  console.log(response.data);
                  const { userId, token, userRole, userName, orders, userEmail } = response.data;
                  resetInputFields();
                  setLoading(asyncOperation.SUCCESS);
                  if (!redirectPath) showSuccessSigninMessage(userRole);
                  dispatch(authSigninSuccess(token, userId, userRole, userName, userEmail, orders));
            } catch (error) {
                  console.log(error.response, error.request)
                  const errorMsg = new ErrorMessage(error);
                  const errorFormFieldsName = errorMsg.getErrorFormFieldsName();
                  if (errorFormFieldsName.length) {
                        errorFormFieldsName.forEach(fieldName => {
                              if (fieldName === 'password') {
                                    passwordChangeHandler('password')('', true);
                              }

                              if (fieldName === 'email') {
                                    emailDataChangeHandler('email')('', false);
                                    passwordChangeHandler('password')('', false);
                              }
                        });
                  }
                  setError(errorMsg);
                  setLoading(asyncOperation.ERROR);
            }
      }

      const isFormDataValid = passwordIsValid && emailIsValid;

      return (
            <AsyncOpBgComponent status={loading} error={error} showErrorMessage={true}>
                  <form className={styles['form']}>
                        <EmailInput
                              emailData={emailData}
                              emailDataChangeHandler={emailDataChangeHandler}
                        />
                        <PasswordInput
                              passwordData={passwordData}
                              passwordChangeHandler={passwordChangeHandler}
                        />
                        <Button
                              onClick={submitHandler}
                              buttonType="success"
                              buttonStyle="standard"
                              disabled={!isFormDataValid}
                              type="submit"
                        >
                              Submit
                        </Button>
                        <p className={styles['form__info']}>If you don't have an account <NavLink to="/signup" >Sign up</NavLink>.</p>

                  </form>

            </AsyncOpBgComponent>
      )
}

export default SigninForm;