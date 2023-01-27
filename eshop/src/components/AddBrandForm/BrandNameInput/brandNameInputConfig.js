import { length } from '../../../utility/validators.js';

export const brandNameInputConfig = {
      brandName: {
            elementName: 'Brand name',
            elementType: 'inputText',
            elementConfig: {
                  type: 'text',
                  name: 'brandName',
                  id: 'brandName',
                  defaultValue: '',
                  placeholder: 'Enter brand name.',
                  validators: [
                        { check: length(), message: 'Brand name must be 5 - 10 characters long.' }
                  ],
                  addClassName: []
            }
      },
}