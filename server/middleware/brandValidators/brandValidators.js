const { body } = require('express-validator');

const brandDataValidation = () => {
      return [
            body('brandName')
                  .trim()
                  .isLength({ min: 5, max: 35 })
                  .withMessage('Brand name must be at least 5 - 35 characters long.'),
                  body('urlImages')
                  .custom((urlImages, { req }) => {
                        console.log('urlImages: ', urlImages)
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
                        // console.log('req.files', req.files)
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
                        console.log(filesNumber, urlImagesNumber)
                        return (((filesNumber + urlImagesNumber) <= maxFilesNumber) && ((filesNumber + urlImagesNumber) >= minFilesNumber))
                  }).withMessage('Brand image number incorrect, required 0 - 1 images.')

      ]
}

module.exports = {
      brandDataValidation
}

            // body('fileName')
            //       .custom((fileName, { req }) => {
            //             const maxFilesNumber = 1;
            //             const minFilesNumber = 0;
            //             let filesNumber = 0;
            //             let fileNameNumber = 0;
            //             console.log('req.files', req.files)
            //             if (req.files) {
            //                   filesNumber = req.files.length;
            //             }

            //             if (fileName) {
            //                   if (Array.isArray(fileName)) {
            //                         fileNameNumber = fileName.length;
            //                   } else {
            //                         fileNameNumber = 1;
            //                   }
            //             }
            //             return (((filesNumber + fileNameNumber) <= maxFilesNumber) && ((filesNumber + fileNameNumber) >= minFilesNumber))
            //       }).withMessage('Brand image allowed number exceeded, max. 1 image.')