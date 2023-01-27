import {required} from '../../../../utility/validators'

export const selectSizeInputConfig = {
      selectedProductSize: {
            elementName: 'Select size',
            elementType: 'select',
            elementConfig: {
                  name: 'selectedProductSize',
                  id: 'selectedProductSize',
                  defaultValue: '',
                  placeholder: null,
                  options: [],
                  validators: [
                        {check: required(), message: 'Please chose size when placing an order.'}
                  ],
                  addClassName: []
            }
      }
}

