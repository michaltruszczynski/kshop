import { required } from '../../../utility/validators';

export const sizeChartSystemInputConfig = {
      sizeSystem: {
            elementName: 'Size chart system',
            elementType: 'radio',
            elementConfig: {
                  name: 'sizeSystem',
                  id: 'sizeSystem',
                  defaultValue: 'predefined',
                  placeholder: 'Select chart system.',
                  options: [
                        { system: "predefined", displayValue: "Predefined size chart (i.e. defined for product type)." },
                        { system: "custom", displayValue: "Custom numeric size chart (e.g. 12m, 123x123)." }
                  ],
                  validators: [{
                        check: required('empty'), message: 'Please define product size chart.'
                  }],
                  addClassName: []
            }
      }
}