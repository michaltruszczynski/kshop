import { required } from '../../../utility/validators';

export const productBrandInputConfig = {
      brand: {
            elementName: 'Brand',
            elementType: 'select',
            elementConfig: {
                  name: 'brand',
                  id: 'brand',
                  defaultValue: '',
                  placeholder: 'Select brand.',
                  options: [
                  ],
                  validators: [
                        { check: required(), message: 'Please select product brand.' }
                  ],
                  addClassName: []
            }
      }
}