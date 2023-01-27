import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import SignupInputs from './SignupInputs/SignupInputs';
import PasswordInput from './PasswordInput/PasswordInput';
import ConfirmPasswordInput from './ConfirmPasswordInput/ConfirmPasswordInput';
import Button from '../Button/Button';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useForm from '../../hooks/useForm';

import { signupInputConfig } from './SignupInputs/signupInputsConfig';
import { passwordInputConfig } from './PasswordInput/passwordInputConfig';

import { setMessage } from '../../store/actions';

import { authService } from '../../services/authService';
import { Message, ErrorMessage } from '../../utility/helpers';

import styles from './SignupForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const SignupForm = () => {
      const [loading, setLoading] = useState(asyncOperation.SUCCESS);
      const [error, setError] = useState(null);
      const [signupSuccess, setSignupSuccess] = useState(false);
      const dispatch = useDispatch();
      const [inputSignupData, inputSignupDataIsValid, inputSignupDataChangeHandler] = useForm(signupInputConfig)
      const [passwordData, passwordIsValid, passwordChangeHandler, passwordFocusChangeHandler] = useForm(passwordInputConfig)
      const [confirmPasswordData, confirmPasswordChangeHandler] = useState({
            value: '',
            touched: false,
            isValid: false,
            errors: []
      });

      const resetInputFields = () => {
            inputSignupDataChangeHandler('name')('', false);
            inputSignupDataChangeHandler('email')('', false);
            passwordChangeHandler('password')('', false);
            confirmPasswordChangeHandler({
                  value: '',
                  touched: false,
                  isValid: false,
                  errors: []
            });
      }

      const showSuccessSignupMessage = () => {
            const signupMessage = new Message('You have been successfully registered.');
            signupMessage.addMessageDetails('Please signin.');
            const { message, messageDetailsArray } = signupMessage.getMessageData();
            dispatch(setMessage(message, messageDetailsArray));

      }

      const signupErrorHandler = (error) => {
            console.log(error.response, error.request)
            const errorMsg = new ErrorMessage(error);
            const errorFormFieldsName = errorMsg.getErrorFormFieldsName();
            console.log(errorFormFieldsName)
            if (errorFormFieldsName.length) {
                  errorFormFieldsName.forEach(fieldName => {
                        if (fieldName === 'name') {
                              inputSignupDataChangeHandler('name')('', true);
                        }

                        if (fieldName === 'email') {
                              inputSignupDataChangeHandler('email')('', true);
                        }

                        if (fieldName === 'password') {
                              passwordChangeHandler('password')('', true);
                              confirmPasswordChangeHandler({
                                    value: '',
                                    touched: true,
                                    isValid: false,
                                    errors: ['Passwords does not match.']
                              });
                        }

                        if (fieldName === 'confirmPassword') {
                              passwordChangeHandler('password')('', true);
                              confirmPasswordChangeHandler({
                                    value: '',
                                    touched: true,
                                    isValid: false,
                                    errors: ['Passwords does not match.']
                              });
                        }
                  });
            }
            setError(errorMsg);
            const { errorMessage, errorDetailsArray } = errorMsg.getErrorMessageData();
            dispatch(setMessage(errorMessage, errorDetailsArray));
      }

      const submitHandler = async (event) => {
            event.preventDefault();
            const newUser = {
                  name: inputSignupData.name.value,
                  email: inputSignupData.email.value,
                  password: passwordData.password.value,
                  confirmPassword: confirmPasswordData.value
            }
            console.log(newUser);

            try {
                  setLoading(asyncOperation.LOADING);
                  setError(null);
                  const response = await authService.signupUser(newUser);
                  console.log(response.data);
                  resetInputFields();
                  setLoading(asyncOperation.SUCCESS);
                  showSuccessSignupMessage();
                  setSignupSuccess(true);
            } catch (error) {
                  signupErrorHandler(error);
                  setLoading(asyncOperation.ERROR);
            }
      }

      const { isValid: confirmPasswordIsValid } = confirmPasswordData;
      const isFormDataValid = confirmPasswordIsValid && passwordIsValid && inputSignupDataIsValid;

      if (signupSuccess) {
            return (
                  <Redirect to="/signin" />
            )
      }

      return (
            <AsyncOpBgComponent status={loading} error={error}>
                  <form className={styles['form']}>
                        <SignupInputs
                              inputSignupData={inputSignupData}
                              inputSignupDataChangeHandler={inputSignupDataChangeHandler}
                        />
                        <PasswordInput
                              passwordData={passwordData}
                              passwordChangeHandler={passwordChangeHandler}
                              passwordFocusChangeHandler={passwordFocusChangeHandler}
                        />
                        <ConfirmPasswordInput
                              confirmPasswordData={confirmPasswordData}
                              confirmPasswordChangeHandler={confirmPasswordChangeHandler}
                              passwordData={passwordData}
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
                        <p className={styles['form__info']}>Already have an account? <NavLink to="/signin" >Sign in</NavLink>.</p>
                  </form>
            </AsyncOpBgComponent>
      )
}

export default SignupForm;