import { arrayLength, required } from '../../../utility/validators';

export const productImageInputConfig = {
      images: {
            elementName: 'Product images (select 1 - 5 images)',
            elementType: '',
            elementConfig: {
                  type: '',
                  name: 'images',
                  id: '',
                  defaultValue: [],
                  placeholder: '',
                  validators: [
                        { check: arrayLength({ min: 1, max: 5 }), message: 'Product must have 1-5 images.' }
                  ],
                  addClassName: []
            }
      },
      primaryImage: {
            elementName: 'Primary image',
            elementType: 'radio',
            elementConfig: {
                  name: 'primaryImage',
                  id: 'primaryImage',
                  defaultValue:'',
                  placeholder: 'Select primary image',
                  options: [],
                  validators: [
                        { check: required(), message: 'Product primary image must be selected.' }
                  ],
                  addClassName: []
            }
      }
}