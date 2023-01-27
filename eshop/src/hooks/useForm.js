import { useState, useLayoutEffect } from 'react';

import { validateInput } from '../utility/validators';
import { sanitizeInput } from '../utility/sanitizers'

const useForm = fromData => {
      const [formInput, setFormInput] = useState(() => {
            const formInputKeys = Object.keys(fromData);
            const formInput = {};

            formInputKeys.forEach(key => {
                  //dodana validacja dle default value!!!!
                  const { isValid, errorMessages } = validateInput(fromData[key].elementConfig.validators, fromData[key].elementConfig.defaultValue);
                  formInput[key] = {
                        value: fromData[key].elementConfig.defaultValue,
                        touched: false,
                        isFocus: false,
                        isValid: isValid,
                        errors: errorMessages,
                        validators: fromData[key].elementConfig.validators,
                        sanitizers: fromData[key].elementConfig.sanitizers
                  }
            });

            return formInput;
      });

      const [formIsValid, setFormIsValid] = useState(false);

      useLayoutEffect(() => {
            const checkIsFormValid = () => {
                  const inputKeys = Object.keys(formInput);
                  const formIsValid = inputKeys.reduce((valid, key) => {
                        return valid && formInput[key].isValid
                  }, true);
                  setFormIsValid(formIsValid);
            }

            checkIsFormValid();
      }, [formInput])


      const inputChangeHandler = key => (value, touched = true) => {
            // console.log('value', value, key)

            setFormInput(formInput => {
                  const { isValid, errorMessages } = validateInput(formInput[key].validators, value);
                  const sanitizedValue = sanitizeInput(formInput[key].sanitizers, value)

                  const newFormInput = {
                        ...formInput,
                        [key]: {
                              ...formInput[key],
                              value: sanitizedValue,
                              touched: touched,
                              isValid: isValid,
                              errors: errorMessages
                        }
                  };

                  return newFormInput;
            })
      }

      const focusChangeHandler = key => () => {
            setFormInput(formInput => {
                  const { isFocus } = formInput[key];
                  const newFromInput = {
                        ...formInput,
                        [key]: {
                              ...formInput[key],
                              isFocus: !isFocus
                        }
                  }
                  return newFromInput
            })
      }

      return [formInput, formIsValid, inputChangeHandler, focusChangeHandler]

}

export default useForm;