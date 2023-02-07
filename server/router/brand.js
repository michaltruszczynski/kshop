const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brand');

const { deleteFilesOnDataErrorS3 } = require('../middleware/utility');

const { brandDataValidation, brandIdValidation } = require('../middleware/brandValidators/brandValidators');
const { brandImageMulterValidationS3 } = require('../middleware/brandValidators/brandMulterS3');

const { dataErrorHandler, multerErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers.js');

const { verifyToken } = require('../middleware/auth/authJWT');
const { verifyUserRole } = require('../middleware/auth/authUser');

router.post(
   '/brand',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   brandImageMulterValidationS3,
   brandDataValidation(),
   deleteFilesOnDataErrorS3,
   dataErrorHandler,
   multerErrorHandler,
   throwError('Brand data validation failed.'),
   brandController.postBrand
);

router.put(
   '/brand/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   brandImageMulterValidationS3,
   brandDataValidation(),
   deleteFilesOnDataErrorS3,
   dataErrorHandler,
   multerErrorHandler,
   throwError('Brand data validation failed.'),
   brandController.putBrand
);

router.get('/brands', verifyToken, verifyUserRole(['admin', 'employee']), brandController.getBands);

router.get(
   '/brands/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   brandIdValidation(),
   dataErrorHandler,
   throwError('Brand data validation failed.'),
   brandController.getBrand
);

router.get(
   '/removebrand/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   brandIdValidation(),
   dataErrorHandler,
   throwError('Brand data validation failed.'),
   brandController.removeBrand
);

module.exports = router;
