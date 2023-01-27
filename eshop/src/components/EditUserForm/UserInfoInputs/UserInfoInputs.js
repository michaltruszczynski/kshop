import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { userInfoInputConfig } from './userInfoInputsConfig';

const UserInfoInputs = ({ userInfoData, userInfoDataChangeHandler, disabled }) => {

      const userInfoInputs = Object.values(userInfoInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={formElement.elementName}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={userInfoData[formElement.elementConfig.name].value}
                  touched={userInfoData[formElement.elementConfig.name].touched}
                  isValid={userInfoData[formElement.elementConfig.name].isValid}
                  errors={userInfoData[formElement.elementConfig.name].errors}
                  onInputChange={userInfoDataChangeHandler(formElement.elementConfig.name)}
                  disabled={disabled}
                  editable={formElement.elementConfig.editable}
            />
      ));

      return (userInfoInputs)
}

export default UserInfoInputs;