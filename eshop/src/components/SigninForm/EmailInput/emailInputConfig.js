import { email } from '../../../utility/validators';

export const emailInputConfig = {
      email: {
            elementName: 'Email',
            elementType: 'inputText',
            elementConfig: {
                  type: 'text',
                  name: 'email',
                  id: 'email',
                  defaultValue: '',
                  placeholder: 'Enter email.',
                  validators: [
                        { check: email, message: 'Please enter a valid email.' }
                  ],
                  addClassName: []
            }
      }
}