import { length, email } from '../../../utility/validators';

export const userInfoInputConfig = {
      name: {
            elementName: 'Name',
            elementType: 'inputText',
            elementConfig: {
                  type: 'text',
                  name: 'name',
                  id: 'name',
                  defaultValue: '',
                  placeholder: 'Enter name.',
                  validators: [
                        { check: length({ min: 5, max: 10 }), message: 'Brand name must be 5 - 10 characters long.' }
                  ],
                  addClassName: []
            }
      },
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
                  addClassName: [],
                  editable: false
            }
      }
}