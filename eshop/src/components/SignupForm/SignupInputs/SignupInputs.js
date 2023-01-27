import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { signupInputConfig } from './signupInputsConfig'

const SignupInputs = ({ inputSignupData, inputSignupDataChangeHandler, disabled }) => {

      const signupInputs = Object.values(signupInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={formElement.elementName}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={inputSignupData[formElement.elementConfig.name].value}
                  touched={inputSignupData[formElement.elementConfig.name].touched}
                  isValid={inputSignupData[formElement.elementConfig.name].isValid}
                  errors={inputSignupData[formElement.elementConfig.name].errors}
                  onInputChange={inputSignupDataChangeHandler(formElement.elementConfig.name)}
                  disabled={disabled}
            />
      ));

      return (signupInputs)
}

export default SignupInputs;