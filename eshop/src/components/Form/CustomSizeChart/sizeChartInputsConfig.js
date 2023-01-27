import { sizeChartIsEmpty } from '../../../utility/validators';

export const sizeChartInputConfig = {
      sizeChart: {
            elementName: 'Please define custom size chart.',
            elementType: '',
            elementConfig: {
                  type: '',
                  name: 'sizeChart',
                  id: 'sizeChart',
                  defaultValue: [{ sizeDescription: '' }],
                  placeholder: 'Size description (dimensions)',
                  validators: [
                        { check: sizeChartIsEmpty, message: 'Size chart entries can not be empty.' }
                  ],
                  addClassName: []
            }
      }
}