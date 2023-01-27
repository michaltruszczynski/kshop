import { required } from '../../../../utility/validators';

export const productSortInputConfig = {
      sortProducts: {
            elementName: 'Sort',
            elementType: 'select',
            elementConfig: {
                  name: 'sortProducts',
                  id: 'sortProducts',
                  defaultValue: '',
                  placeholder: '-',
                  options: [
                        { value: 'asc', displayValue: 'Price (asc)' },
                        { value: 'desc', displayValue: 'Price (desc)' }
                  ],
                  validators: [{ check: required(), message: '' }],
                  addClassName: []
            },
      }

}