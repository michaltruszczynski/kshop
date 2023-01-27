import {required} from '../../../../utility/validators';

export const productBrandInputConfig = {
      productBrand: {
            elementName: 'Brand',
            elementType: 'select',
            elementConfig: {
                  name: 'productBrand',
                  id: 'productBrand',
                  defaultValue: '',
                  placeholder: 'Brand',
                  options: [],
                  validators: [
                        { check: required(), message: '' }
                  ],
                  addClassName: []
            }
      }
}