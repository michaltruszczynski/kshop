const { body, check, param } = require('express-validator');

const productDataValidation = () => {
   return [
      body('category').trim().not().isEmpty().withMessage('Product category must be provided.'),
      body('name').trim().isLength({ min: 5, max: 40 }).withMessage('Product name must be 5 - 40 characters long.'),
      body('type').trim().isLength({ min: 5, max: 50 }).withMessage('Product type must be 5 - 50 characters long.'),
      body('brand').trim().not().isEmpty().withMessage('Product brand must be provided.'),
      body('description').trim().isLength({ min: 100, max: 700 }).withMessage('Product description must be 100 - 800 characters long.'),
      body('sizeSystem').trim().not().isEmpty().withMessage('Size system must be provided.'),
      check('sizeChart')
         .isJSON()
         .withMessage('Incorrect sizeChart format. It must be JSON.')
         .bail()
         .custom((sizeChartJSON) => {
            let isValid = true;
            try {
               const sizeChart = JSON.parse(sizeChartJSON);
               isValid = isValid && Array.isArray(sizeChart);
               if (!isValid) return false;

               const sizeChartDescriptionTypes = ['string', 'number'];

               sizeChart.forEach((size) => {
                  isValid = isValid && sizeChartDescriptionTypes.includes(typeof size.sizeDescription);
               });
            } catch (error) {
               return false;
            }

            return isValid;
         })
         .withMessage('Incorrect sizeChart format.')
         .bail()
         .custom((sizeChartJSON) => {
            let isValid = true;
            try {
               const sizeChart = JSON.parse(sizeChartJSON);
               sizeChart.forEach((size) => {
                  isValid = isValid && size.sizeDescription !== '';
               });
            } catch (error) {
               return false;
            }
            return isValid;
         })
         .withMessage('Size chart entries can not be empty.'),
      body('urlImages')
         .custom((urlImages, { req }) => {

            try {
               if (!urlImages) return true;
               if (Array.isArray(urlImages)) {
                  urlImages.forEach((file) => JSON.parse(file));
                  return true;
               }
               JSON.parse(urlImages);
               return true;
            } catch (error) {
               return false;
            }
         })
         .withMessage('Incorrect fileName format. It must be JSON.'),
      body('urlImages')
         .custom((urlImages, { req }) => {
            const maxFilesNumber = 6;
            const minFilesNumber = 3;
            let filesNumber = 0;
            let urlImagesNumber = 0;

            if (req.files) {
               filesNumber = req.files.length;
            }

            if (urlImages) {
               if (Array.isArray(urlImages)) {
                  urlImagesNumber = urlImages.length;
               } else if (urlImages === 'empty') {
                  urlImagesNumber = 0;
               } else {
                  urlImagesNumber = 1;
               }
            }

            return filesNumber + urlImagesNumber <= maxFilesNumber && filesNumber + urlImagesNumber >= minFilesNumber;
         })
         .withMessage('Product image number incorrect, required 3 - 6 images.'),
   ];
};

const productIdValidation = () => {
   return [param('id').isMongoId().withMessage('Invalid productId.')];
};

module.exports = {
   productDataValidation,
   productIdValidation,
};
