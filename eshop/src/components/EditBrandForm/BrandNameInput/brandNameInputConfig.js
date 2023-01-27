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
                        { check: length({min: 5, max: 35}), message: 'Brand name must be 5 - 35 characters long.' }
                  ],
                  addClassName: []
            }
      },
}