import { required } from '../../../../utility/validators';

export const definedSizeChartInputConfigId = {
      sizeSystemId: {
            elementName: 'Please select predefined size chart',
            elementType: 'select',
            elementConfig: {
                  name: 'sizeSystemId',
                  id: 'sizeSystemId',
                  defaultValue: '',
                  placeholder: 'Select predefined size chart.',
                  options: [],
                  validators: [
                        { check: required(''), message: 'Please select defined size chart.' }
                  ],
                  addClassName: []
            }
      }
}