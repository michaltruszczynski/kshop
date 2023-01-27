import { length } from '../../../utility/validators.js';

export const sizeChartNameInputConfig = {
      sizeChartName: {
            elementName: 'Size chart system name',
            elementType: 'inputText',
            elementConfig: {
                  type: 'text',
                  name: 'sizeChartName',
                  id: 'sizeChartName',
                  defaultValue: '',
                  placeholder: 'Enter size chart name.',
                  validators: [
                        { check: length(), message: 'Size chart name must be 5 - 10 characters long.' }
                  ],
                  addClassName: []
            }
      }
}