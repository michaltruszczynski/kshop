import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { passwordInputConfig } from './passwordInputConfig';

const PasswordInput = ({ passwordData, passwordChangeHandler}) => {

      const passwordInput = Object.values(passwordInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={formElement.elementName}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={passwordData[formElement.elementConfig.name].value}
                  touched={passwordData[formElement.elementConfig.name].touched}
                  isValid={passwordData[formElement.elementConfig.name].isValid}
                  errors={passwordData[formElement.elementConfig.name].errors}
                  onInputChange={passwordChangeHandler(formElement.elementConfig.name)}
            />
      ));

      return (
            <div>
                  {passwordInput}
            </div>
      )
}

export default PasswordInput;