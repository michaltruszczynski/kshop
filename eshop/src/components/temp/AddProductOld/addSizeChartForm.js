
import { sizeChartIsEmpty } from '../../utility/validators'

export const addSizeChartForm = {
      sizeChart: {
            elementName: '',
            elementType: '',
            elementConfig: {
                  type: '',
                  name: 'sizeChart',
                  id: '',
                  defaultValue: [{ sizeDescription: '' }],
                  placeholder: '',
                  validators: [
                        { check: sizeChartIsEmpty, message: 'Size chart entries can not be empty.' }
                  ],
                  addClassName: []
            }
      }
}