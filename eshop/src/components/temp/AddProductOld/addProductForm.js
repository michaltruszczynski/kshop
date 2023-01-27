import { required, length } from '../../utility/validators'

export const addProductForm = {
      productCategory: {
            elementName: 'Product category',
            elementType: 'select',
            elementConfig: {
                  name: 'productCategory',
                  id: 'productCategory',
                  defaultValue: '',
                  placeholder: 'Select category.',
                  options: [
                        { value: 'Kites', displayValue: 'Kites' },
                        { value: 'Boards', displayValue: 'Boards' },
                        { value: 'Accesories', displayValue: 'Accessories' },
                        { value: 'Wetsiuts', displayValue: 'Wetsiuts' }
                  ],
                  validators: [
                        { check: required('empty'), message: 'Please choose product category.' },
                  ],
                  addClassName: []
            },
      },
      productName: {
            elementName: 'Product name',
            elementType: 'inputText',
            elementConfig: {
                  type: 'text',
                  name: 'productName',
                  id: 'productName',
                  defaultValue: '',
                  placeholder: 'Enter product name.',
                  validators: [
                        { check: length(), message: 'Product name must be 5 - 10 characters long.' }
                        // { check: length({min: 5, max: 40}), message: 'Product name must be 5 - 40 characters long.' }
                  ],
                  addClassName: []
            }
      },
      productType: {
            elementName: 'Product type',
            elementType: 'inputText',
            elementConfig: {
                  type: 'text',
                  name: 'productType',
                  id: 'productType',
                  defaultValue: '',
                  placeholder: 'Enter product type.',
                  validators: [
                        { check: length(), message: 'Product type must be 5 - 10 characters long.' }
                        // { check: length({min: 5, max: 40}), message: 'Product type must be 5 - 40 characters long.' }
                  ],
                  addClassName: []
            }
      },
      productBrand: {
            elementName: 'Brand',
            elementType: 'select',
            elementConfig: {
                  name: 'productBrand',
                  id: 'productBrand',
                  defaultValue: '',
                  placeholder: 'Select Brand.',
                  options: [
                        { value: 'TheNorthKiteboarding', displayValue: 'TheNorthKiteboarding' },
                        { value: 'MysticBoarding', displayValue: 'MysticBoarding' }
                  ],
                  validators: [
                        { check: required('empty'), message: 'Please select product brand.' }
                  ],
                  addClassName: []
            }
      },
      description: {
            elementName: 'Description',
            elementType: 'textarea',
            elementConfig: {
                  name: 'description',
                  id: 'description',
                  defaultValue: '',
                  placeholder: 'Enter product description.',
                  validators: [
                        { check: length(), message: 'Product description must be 5 - 10 characters long.' }
                        // { check: length({min: 100, max: 360}), message: 'Product description must be 200 - 400 characters long.' }
                  ],
                  addClassName: []
            }
      },
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


// old form array zminiono aby scetralizowac obsluge zmiany valuw inputach

// const formElements = [
//       {
//             elementName: 'Product category',
//             elementType: 'select',
//             elementConfig: {
//                   name: 'productCategory',
//                   id: 'productCategory',
//                   placeholder: 'Select category.',
//                   options: [
//                         { value: 1, displayValue: 'Kites' },
//                         { value: 2, displayValue: 'Boards' },
//                         { value: 3, displayValue: 'Accessories' },
//                         { value: 4, displayValue: 'Wetsiuts' }
//                   ],
//                   validators: [
//                         { check: required('empty'), message: 'Please choose product category.' },
//                   ],
//                   addClassName: []
//             },

//       },
//       {
//             elementName: 'Product name',
//             elementType: 'inputText',
//             elementConfig: {
//                   type: 'text',
//                   name: 'name',
//                   id: 'name',
//                   placeholder: 'Enter product name.',
//                   validators: [
//                         { check: length(), message: 'Product name must be 5 - 10 characters long.' }
//                   ],
//                   addClassName: []
//             }
//       },
//       {
//             elementName: 'Product type',
//             elementType: 'inputText',
//             elementConfig: {
//                   type: 'text',
//                   name: 'productType',
//                   id: 'productType',
//                   placeholder: 'Enter product type.',
//                   validators: [
//                         { check: length(), message: 'Product type must be 5 - 10 characters long.' }
//                   ],
//                   addClassName: []
//             }
//       },
//       {
//             elementName: 'Brand',
//             elementType: 'select',
//             elementConfig: {
//                   name: 'brand',
//                   id: 'brand',
//                   placeholder: 'Select Brand.',
//                   options: [
//                         { value: 'TheNorthKiteboarding', displayValue: 'TheNorthKiteboarding' },
//                         { value: 'MysticBoarding', displayValue: 'MysticBoarding' }
//                   ],
//                   validators: [
//                         { check: required('empty'), message: 'Please select product brand.' }
//                   ],
//                   addClassName: []
//             }
//       },
//       {
//             elementName: 'Description',
//             elementType: 'textarea',
//             elementConfig: {
//                   name: 'description',
//                   id: 'description',
//                   placeholder: 'Enter product description.',
//                   validators: [
//                         { check: length(), message: 'Product description must be 5 - 10 characters long.' }
//                   ],
//                   addClassName: []
//             }
//       },
//       {
//             elementName: 'Size chart system',
//             elementType: 'radio',
//             elementConfig: {
//                   name: 'sizeSystem',
//                   id: 'sizeSystem',
//                   placeholder: 'Select chart system.',
//                   options: [
//                         { system: "predefined", displayValue: "Predefined size chart (i.e. defined for product type)." },
//                         { system: "custom", displayValue: "Custom numeric size chart (e.g. 12m, 123x123)." }
//                   ],
//                   validators: [{
//                         check: required('empty'), message: 'Please define product size chart.'
//                   }],
//                   addClassName: []
//             }
//       }
// ]