import { required } from '../../../../utility/validators';

export const definedSizeChartInputConfig = {
      definedSizeChart: {
            elementName: 'Please select predefined size chart',
            elementType: 'select',
            elementConfig: {
                  name: 'definedSizeChart',
                  id: 'definedSizeChart',
                  defaultValue: '',
                  placeholder: 'Select predefined size chart.',
                  options: [],
                  validators: [
                        { check: required(), message: 'Please select defined size chart.' }
                  ],
                  addClassName: []
            }
      }
}