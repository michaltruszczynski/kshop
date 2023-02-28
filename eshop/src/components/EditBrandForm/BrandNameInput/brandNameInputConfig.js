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
                        { check: length({min: 3, max: 15}), message: 'Brand name must be 3 - 15 characters long.' }
                  ],
                  addClassName: []
            }
      },
}