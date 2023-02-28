const { body, param } = require('express-validator');

const brandDataValidation = () => {
      return [
            body('brandName')
                  .trim()
                  .isLength({ min: 3, max: 15 })
                  .withMessage('Brand name must be at least 3 - 15 characters long.'),
                  body('urlImages')
                  .custom((urlImages, { req }) => {
                        try {
                              if (!urlImages) return true;
                              if (Array.isArray(urlImages)) {
                                    urlImages.forEach(file => JSON.parse(file))
                                    return true;
                              }
                              JSON.parse(urlImages)
                              return true;
                        } catch (error) {
                              return false;
                        }
                  })
                  .withMessage('Incorrect fileName format. It must be JSON.'),
            body('urlImages')
                  .custom((urlImages, { req }) => {
                        const maxFilesNumber = 1;
                        const minFilesNumber = 0;
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

                        return (((filesNumber + urlImagesNumber) <= maxFilesNumber) && ((filesNumber + urlImagesNumber) >= minFilesNumber))
                  }).withMessage('Brand image number incorrect, required 0 - 1 images.')
      ]
}

const brandIdValidation = () => {
      return [
            param('id')
            .isMongoId()
            .withMessage('Invalid brandId.')
      ]
}

module.exports = {
      brandDataValidation,
      brandIdValidation
}