const { body } = require('express-validator');

const sizeSystemDataValidation = () => {
      return [
            body('sizeSystemName')
                  .trim()
                  .isLength({ min: 5, max: 10 })
                  .withMessage('Size chart name must be 5 - 10 characters long.'),
            body('sizeChart')
                  .custom(sizeChart => {
                        let isValid = true;
                        isValid = isValid && Array.isArray(sizeChart);
                        if (!isValid) return false;

                        const sizeChartDescriptionTypes = ['string', 'number'];

                        sizeChart.forEach(size => {
                              isValid = isValid && sizeChartDescriptionTypes.includes(typeof size.sizeDescription)
                        });

                        return isValid;
                  }).withMessage('Incorrect sizeChart format.').bail()
                  .custom(sizeChart => {
                        let isValid = true;

                        sizeChart.forEach(size => {
                              isValid = isValid && size.sizeDescription !== '';
                        });

                        return isValid;
                  })
                  .withMessage('Size chart entries can not be empty.')
      ]
}

module.exports = {
      sizeSystemDataValidation
}