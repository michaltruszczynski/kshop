import { required, requiredNumber, length } from '../../../utility/validators';
import { numberToFixed } from '../../../utility/sanitizers';

export const productDescriptionInputsConfig = {
   category: {
      elementName: 'Product category',
      elementType: 'select',
      elementConfig: {
         name: 'category',
         id: 'category',
         defaultValue: '',
         placeholder: 'Select category.',
         options: [
            { value: 'Kites', displayValue: 'Kites' },
            { value: 'Boards', displayValue: 'Boards' },
            { value: 'Accesories', displayValue: 'Accessories' },
            { value: 'Wetsiuts', displayValue: 'Wetsiuts' },
         ],
         validators: [{ check: required(), message: 'Please choose product category.' }],
         addClassName: [],
      },
   },
   name: {
      elementName: 'Product name',
      elementType: 'inputText',
      elementConfig: {
         type: 'text',
         name: 'name',
         id: 'name',
         defaultValue: '',
         placeholder: 'Enter product name.',
         validators: [
            // { check: length(), message: 'Product name must be 5 - 40 characters long.' }
            { check: length({ min: 3, max: 20 }), message: 'Product name must be 3 - 20 characters long.' },
         ],
         addClassName: [],
      },
   },
   type: {
      elementName: 'Product type',
      elementType: 'inputText',
      elementConfig: {
         type: 'text',
         name: 'type',
         id: 'type',
         defaultValue: '',
         placeholder: 'Enter product type.',
         validators: [
            // { check: length(), message: 'Product type must be 5 - 10 characters long.' }
            { check: length({ min: 3, max: 20 }), message: 'Product type must be 3 - 20 characters long.' },
         ],
         addClassName: [],
      },
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
            // { check: length(), message: 'Product description must be 5 - 10 characters long.' }
            { check: length({ min: 100, max: 800 }), message: 'Product description must be 100 - 800 characters long.' },
         ],
         addClassName: [],
      },
   },
   price: {
      elementName: 'Price',
      elementType: 'inputNumber',
      elementConfig: {
         type: 'number',
         name: 'price',
         id: 'price',
         defaultValue: 0,
         placeholder: 'Enter product price.',
         validators: [{ check: requiredNumber, message: 'Please enter product price.' }],
         sanitizers: [numberToFixed],
         addClassName: [],
      },
   },
};
