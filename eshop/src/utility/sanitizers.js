export const sanitizeInput = (sanitizers, value) => {
      if (!sanitizers || !sanitizers.length) return value;
      let sanitizedValue = value;
      sanitizers.forEach(sanitizer => {
            sanitizedValue = sanitizer(value);
      });
      return sanitizedValue;
}


export const numberToFixed = value => {
      if (!value) return value;
      const sanitizedValue = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
      return sanitizedValue;
}