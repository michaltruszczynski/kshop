import React, { useLayoutEffect } from 'react';

import InputField from '../../Form/InputField/InputField';

import { confirmPasswordInputConfig } from './confirmPasswordInputConfig';
import { passwordMatchDirect } from '../../../utility/validators';

const ConfirmPasswordInput = ({ confirmPasswordData, confirmPasswordChangeHandler, passwordData }) => {

      const { value, touched, isValid, errors } = confirmPasswordData;
      const { value: passwordValue } = passwordData.password;

      const onConfirmPasswordChange = value => {
            confirmPasswordChangeHandler(prevState => {
                  const confirmPasswordIsValid = passwordMatchDirect(passwordValue, value);

                  let errorMessage = [];
                  if (!confirmPasswordIsValid) {
                        errorMessage = ['Passwords does not match.'];
                  }
                  const newState = {
                        ...prevState,
                        value: value,
                        touched: true,
                        isValid: confirmPasswordIsValid,
                        errors: errorMessage
                  }
                  return newState;
            })
      }

      useLayoutEffect(() => {
            confirmPasswordChangeHandler(prevState => {
                  const { value } = prevState;
                  const confirmPasswordIsValid = passwordMatchDirect(passwordValue, value);
                  let errorMessage = [];
                  if (!confirmPasswordIsValid) {
                        errorMessage = ['Passwords does not match.'];
                  }
                  const newState = {
                        ...prevState,
                        isValid: confirmPasswordIsValid,
                        errors: errorMessage
                  }
                  return newState;
            })
      }, [passwordValue, confirmPasswordChangeHandler])

      const confirmPasswordInput = Object.values(confirmPasswordInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={formElement.elementName}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={value}
                  touched={touched}
                  isValid={isValid}
                  errors={errors}
                  onInputChange={onConfirmPasswordChange}
            />
      ));

      return (confirmPasswordInput)
}

export default ConfirmPasswordInput;