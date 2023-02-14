import React, { useEffect } from 'react';

import InputError from '../InpurtError/InputError';
import Checkbox from '../Checkbox/Checkbox';

import styles from './InputField.module.scss';

const InputField = ({ label, elementType, elementConfig, value, onInputChange, onFocusChange = () => {}, touched, isValid, disabled = false, editable = true, errors }) => {
   const inputChangeHandler = (event) => {
      const { value } = event.target;
      onInputChange(value);
   };

   const inputFieldClasses = (htmlElementType) => {
      let classesArray = [styles[`field__${htmlElementType}`]];
      if (!isValid && touched) {
         classesArray.push(styles[`field__${htmlElementType}--error`]);
      }
      return classesArray.join(' ');
   };

   let inputElement = null;
   switch (elementType) {
      case 'inputText':
         inputElement = (
            <input
               value={value}
               type={elementConfig.type}
               name={elementConfig.name}
               id={elementConfig.id}
               placeholder={elementConfig.placeholder}
               onChange={inputChangeHandler}
               onFocus={onFocusChange}
               onBlur={onFocusChange}
               className={inputFieldClasses('input')}
               disabled={editable ? disabled : true}
            />
         );
         break;
      case 'inputNumber':
         inputElement = (
            <input
               value={value > 0 || (!isValid && touched) ? value : ''}
               type={elementConfig.type}
               name={elementConfig.name}
               id={elementConfig.id}
               placeholder={elementConfig.placeholder}
               onChange={inputChangeHandler}
               onFocus={onFocusChange}
               onBlur={onFocusChange}
               className={inputFieldClasses('number')}
               min='0'
               disabled={editable ? disabled : false}
               onWheel={(e) => e.target.blur()}
            />
         );
         break;
      case 'textarea':
         inputElement = (
            <textarea
               value={value}
               name={elementConfig.name}
               id={elementConfig.id}
               placeholder={elementConfig.placeholder}
               onChange={inputChangeHandler}
               className={inputFieldClasses('textarea')}
               maxLength='500'
               disabled={editable ? disabled : true}
            />
         );
         break;
      case 'select':
         inputElement = (
            <select
               value={value}
               name={elementConfig.name}
               id={elementConfig.id}
               onChange={inputChangeHandler}
               className={inputFieldClasses('select')}
               disabled={editable ? disabled : true}
            >
               <option
                  key={'empty'}
                  value={''}
               >
                  {elementConfig.placeholder}
               </option>
               {elementConfig.options.length
                  ? elementConfig.options.map((option) => (
                       <option
                          key={option.value}
                          value={option.value}
                       >
                          {option.displayValue}
                       </option>
                    ))
                  : null}
            </select>
         );
         break;
      case 'radio':
         inputElement = elementConfig.options.map((radio) => (
            <label
               key={radio.name}
               className={styles['field__name']}
            >
               <input
                  type='radio'
                  value={radio.name}
                  name={elementConfig.name}
                  id={elementConfig.id}
                  onChange={inputChangeHandler}
                  className={styles['field__radio']}
                  checked={radio.name === value}
                  disabled={editable ? disabled : true}
               />
               <span>{radio.displayValue}</span>
            </label>
         ));
         break;

      case 'checkbox':
         inputElement = (
            <Checkbox
               elementConfig={elementConfig}
               editable={editable}
               disabled={disabled}
               value={value}
               onInputChange={onInputChange}
            />
         );
         break;
      case 'none':
         inputElement = null;
         break;
      case 'password':
         inputElement = null;
         break;
      default:
         inputElement = (
            <input
               value={value}
               type={elementConfig.type}
               name={elementConfig.name}
               id={elementConfig.id}
               placeholder={elementConfig.placeholder}
               onChange={inputChangeHandler}
               className={inputFieldClasses('input')}
               disabled={editable ? disabled : true}
            />
         );
   }

   if (elementType === 'radio') {
      return (
         <div className={styles['field']}>
            <p className={styles['field__name']}>{label}:</p>
            {inputElement}
            {errors ? (
               <InputError
                  touched={touched}
                  isValid={isValid}
                  errors={errors}
               />
            ) : null}
         </div>
      );
   }

   return (
      <div className={styles['field']}>
         {label && (
            <label
               htmlFor={elementConfig.name}
               className={styles['field__name']}
            >
               {label}:
            </label>
         )}
         {inputElement}
         {errors ? (
            <InputError
               touched={touched}
               isValid={isValid}
               errors={errors}
            />
         ) : null}
      </div>
   );
};

export default InputField;
