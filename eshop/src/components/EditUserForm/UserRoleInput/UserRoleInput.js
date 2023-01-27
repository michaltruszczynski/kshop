import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { userRoleInputConfig} from './userRoleInputConfig';

const UserRoleInput = ({ userRoleData, userRoleDataChangeHandler, disabled }) => {

      const userRoleInput = Object.values(userRoleInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={formElement.elementName}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={userRoleData[formElement.elementConfig.name].value}
                  touched={userRoleData[formElement.elementConfig.name].touched}
                  isValid={userRoleData[formElement.elementConfig.name].isValid}
                  errors={userRoleData[formElement.elementConfig.name].errors}
                  onInputChange={userRoleDataChangeHandler(formElement.elementConfig.name)}
                  disabled={disabled}
                  editable={formElement.elementConfig.editable}
            />
      ));

      return (userRoleInput)
}

export default UserRoleInput;