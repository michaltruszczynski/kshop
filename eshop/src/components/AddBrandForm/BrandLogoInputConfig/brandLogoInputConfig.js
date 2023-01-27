import { arrayLength } from '../../../utility/validators';

export const brandLogoInputConfig = {
      brandImage: {
            elementName: 'Logo image. Optional field (select 1 file)',
            elementType: '',
            elementConfig: {
                  type: '',
                  name: 'fileList',
                  id: '',
                  defaultValue: [],
                  placeholder: '',
                  validators: [
                        { check: arrayLength({ min: 0, max: 1 }), message: 'Optional. Please upload brand logo (1 file only).' }
                  ],
                  addClassName: []
            }
      }
}