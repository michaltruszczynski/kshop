import {arrayLength} from '../../../utility/validators';

export const productImageInputConfig = {
      productImage: {
            elementName: 'Product images (select 3 - 5 images)',
            elementType: '',
            elementConfig: {
                  type: '',
                  name: 'fileList',
                  id: '',
                  defaultValue: [],
                  placeholder: '',
                  validators: [
                        { check: arrayLength({min: 1, max: 3}), message: 'Product must be created with 1 image minimum' }
                  ],
                  addClassName: []
            }
      }
}