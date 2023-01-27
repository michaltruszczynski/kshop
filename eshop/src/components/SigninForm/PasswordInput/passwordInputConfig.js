import { required } from '../../../utility/validators';

export const passwordInputConfig = {
      password: {
            elementName: 'Password',
            elementType: 'inputText',
            elementConfig: {
                  type: 'password',
                  name: 'password',
                  id: 'password',
                  defaultValue: '',
                  placeholder: 'Enter password.',
                  validators: [
                        { check: required(), message: 'Please enter valid password.' },
                  ],
                  addClassName: []
            }
      }
}