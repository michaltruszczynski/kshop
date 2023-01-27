import { arrayLength } from '../../../utility/validators';

export const brandImageInputConfig = {
      images: {
            elementName: 'Logo image. Optional field (select 1 file)',
            elementType: '',
            elementConfig: {
                  type: '',
                  name: 'images',
                  id: '',
                  defaultValue: [],
                  placeholder: '',
                  validators: [
                        { check: arrayLength({ min: 0, max: 2 }), message: 'Optional. Please upload brand logo (1 file only).' }
                  ],
                  addClassName: []
            }
      }
}