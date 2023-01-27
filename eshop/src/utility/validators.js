export const required = defineEmpty => value => {
      // console.log('required', value);
      if (defineEmpty) {
            return value.trim() !== defineEmpty;
      }
      return value.trim() !== '';
}

export const requiredNumber = value => {
      // console.log(typeof value)
      // console.log(value > 0, value)
      return value > 0;
}

export const length = (config = { min: 5, max: 10 }) => value => {
      if (!value.trim()) return false;
      let isValid = true;
      // console.log(config, value)
      if (config.min) {
            // console.log('inCheck', value.trim().length)
            isValid = isValid && value.trim().length >= config.min;
      }
      if (config.max) {
            isValid = isValid && value.trim().length <= config.max;
      }
      // console.log('inCheck', isValid)
      return isValid;
}

export const containNumber = value => {
      if (!value.trim()) return false;
      const regex = new RegExp(/\d/);
      return regex.test(value);
}

export const containSpecialChar = value => {
      if (!value) return false;
      const regex = new RegExp(/[!@#$%^&*]/);
      return regex.test(value);
}

export const containCapitalLetter = value => {
      if (!value) return false;
      const regex = new RegExp(/[A-Z]/);
      return regex.test(value);
}

export const email = value => {
      if (!value) return false;
      const regex = new RegExp(/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/);
      return regex.test(value);
}

export const passwordMatch = (refValue) => {
      if (!refValue) {
            return value => {
                  return false;
            }
      } else {
            return value => {
                  if (!value) return false;
                  return value === refValue;
            }
      }
}

export const passwordMatchDirect = (password, confirmPassword) => {
      if (!password && !confirmPassword) return false;
      return password === confirmPassword;
}

export const arrayLength = (config = { min: 5, max: 6 }) => value => {
      if (!Array.isArray(value)) return false;
      return value.length <= config.max && value.length >= config.min
}

export const isArrayNotEmpty = value => {
      if (!value || value.length === 0) return false;
      let isValid = true;
      value.forEach(element => {
            isValid = isValid && element.trim() !== ''
      })
      return isValid;
}

//Size chart validators

export const sizeChartIsEmpty = value => {
      if (!value || value.length === 0) return false;
      let isValid = true;
      value.forEach(size => {
            isValid = isValid && size.sizeDescription.trim() !== ''
      })
      return isValid;
}

//File picker validators

export const filePickerIsEmpty = value => {
      if (!value || value.length === 0) return false;
      return true;
}

export const fileSize = (maxFileSize = 1500) => value => {
      return value.size <= maxFileSize * 1000;
}

export const fileType = (fileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'text/plain']) => value => {
      return fileTypes.some(type => type === value.type)
}

export const duplicated = (array, elementKey, allowDuplicate = false) => value => {
      if (allowDuplicate) return true;
      return !array.some(element => element[elementKey] === value[elementKey])
}
// let validators = [{check: required, errorMessage: 'Input is required.'}]

export const validateInput = (validators, value) => {
      if (!validators || !validators.length) return { isValid: true, errorMessages: [] };
      let isValid = true;
      const errorMessages = [];
      validators.forEach(validator => {
            const valid = validator.check(value);
            if (valid) return;
            isValid = isValid && valid;
            errorMessages.push(validator.message)
      })

      return { isValid, errorMessages }
}