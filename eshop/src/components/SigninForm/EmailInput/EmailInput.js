import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { emailInputConfig } from './emailInputConfig'

const EmailInput = ({ emailData, emailDataChangeHandler}) => {

      const emailInput = Object.values(emailInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={formElement.elementName}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={emailData[formElement.elementConfig.name].value}
                  touched={emailData[formElement.elementConfig.name].touched}
                  isValid={emailData[formElement.elementConfig.name].isValid}
                  errors={emailData[formElement.elementConfig.name].errors}
                  onInputChange={emailDataChangeHandler(formElement.elementConfig.name)}
            />
      ));

      return (emailInput)
}

export default EmailInput;