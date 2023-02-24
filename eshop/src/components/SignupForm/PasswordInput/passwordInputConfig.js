import { length, containNumber, containSpecialChar, containCapitalLetter } from '../../../utility/validators';

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
                        { check: length({ min: 4 }), message: '4 characters minimum.' },
                        { check: containCapitalLetter, message: 'Contains at least 1 capital letter' },
                        { check: containNumber, message: 'Contains at least 1 number' },
                        { check: containSpecialChar, message: 'Contains !@#$%^&*' }
                  ],
                  addClassName: []
            }
      }
}