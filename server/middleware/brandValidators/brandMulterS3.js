const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const multerS3 = require('multer-s3');
const path = require('path');

const { s3, bucketName } = require('../awsS3/awsS3');

const brandFileFilterConfig = ['image/png', 'image/jpg', 'image/jpeg'];
const brandMaxFileSize = 1000000;
const brandMaxFileNumber = 1;

const getFileFilter = (allowedFilesTypeArr = defaultAllowedFilesTypeArr) => {
      return (req, file, cb) => {
            if (allowedFilesTypeArr.includes(file.mimetype)) {
                  cb(null, true);
            } else {
                  const error = new Error('Incorrect file type.');
                  cb(error, false);
            }
      }
}

const brandFileFilter = getFileFilter(brandFileFilterConfig);

const brandUploadMiddlewareMulter = multer({
      storage: multerS3({
            s3,
            acl: 'public-read',
            bucket: bucketName,
            metadata: (req, file, cb) => {
                  cb(null, { fieldName: file.fieldname });
            },
            key: (req, file, cb) => {
                  const ext = path.extname(file.originalname);
                  cb(null, `${uuidv4()}${ext}`);
            }
      }),
      fileFilter: brandFileFilter,
      limits: { fileSize: brandMaxFileSize }
}).array('images', brandMaxFileNumber);

const brandImageMulterValidationS3 = (req, res, next) => {
      brandUploadMiddlewareMulter(req, res, (error) => {
            const errorMessage = {
                  value: 'productImages',
                  msg: 'File/files validation failed.',
                  param: 'productImage',
                  location: 'files'
            }

            if (error instanceof multer.MulterError) {
                  if (error.message) {
                        errorMessage.msg = error.message
                  }
                  req.multerError = [errorMessage];
                  return next();

            } else if (error) {
                  if (error.message) {
                        errorMessage.msg = error.message
                  }
                  req.multerError = [errorMessage];
                  return next();
            }

            next();

      })
}

module.exports = {
      brandImageMulterValidationS3
}