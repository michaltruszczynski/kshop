import { useState } from 'react';

import { validateInput } from '../utility/validators';

const useInput = inputConfiguration => {
      const [inputData, setInputData] = useState(() => {
            console.log(inputConfiguration)
            const [[inpuKeyName, input]] = Object.entries(inputConfiguration);
            return {
                  value: input.elementConfig.defaultValue,
                  touched: false,
                  isValid: false,
                  errors: [],
                  validators: input.elementConfig.validators
            };
      });

      const inputChangeHandler = (value, touched = true) => {
            setInputData(prevInputData => {
                  const { isValid, errorMessages } = validateInput(prevInputData.validators, value);
                  return {
                        ...prevInputData,
                        value: value,
                        touched: touched,
                        isValid: isValid,
                        errors: errorMessages
                  };
            });
      }
      return [inputData, inputChangeHandler]
}

export default useInput;