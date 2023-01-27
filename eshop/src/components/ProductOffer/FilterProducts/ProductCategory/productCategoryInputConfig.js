import { required } from '../../../../utility/validators';

export const producCategoryInputConfig = {
      productCategory: {
            elementName: 'Product category',
            elementType: 'select',
            elementConfig: {
                  name: 'productCategory',
                  id: 'productCategory',
                  defaultValue: '',
                  placeholder: 'Category',
                  options: [
                        { value: 'Kites', displayValue: 'Kites' },
                        { value: 'Boards', displayValue: 'Boards' },
                        { value: 'Accesories', displayValue: 'Accessories' },
                        { value: 'Wetsiuts', displayValue: 'Wetsiuts' }
                  ],
                  validators: [
                        { check: required(), message: '' }
                  ],
                  addClassName: []
            },
      }
}