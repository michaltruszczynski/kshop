import React from 'react';

import InputField from '../../Form/InputField/InputField';
import PasswordErrors from './PasswordErrors/PasswordErrors';
import ToggleContent from '../../ToggleContent/ToggleContent'

import { passwordInputConfig } from './passwordInputConfig';

const PasswordInput = ({ passwordData, passwordChangeHandler, passwordFocusChangeHandler, disabled }) => {
      const { value, touched, validators, isFocus, isValid } = passwordData.password;

      let errorMessage = [];
      if (!isValid) {
            errorMessage = ['Please enter a valid password.'];
      }

      const passwordInput = Object.values(passwordInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={formElement.elementName}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={passwordData[formElement.elementConfig.name].value}
                  touched={passwordData[formElement.elementConfig.name].touched}
                  isValid={passwordData[formElement.elementConfig.name].isValid}
                  errors={errorMessage}
                  onInputChange={passwordChangeHandler(formElement.elementConfig.name)}
                  onFocusChange={passwordFocusChangeHandler(formElement.elementConfig.name)}
                  disabled={disabled}
            />
      ));

      return (
            <div>
                  {passwordInput}
                  <ToggleContent show={isFocus && !isValid }>
                        <PasswordErrors
                              value={value}
                              touched={touched}
                              validators={validators} />
                  </ToggleContent>
            </div>
      )
}

export default PasswordInput;