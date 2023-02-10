const express = require('express');
const router = express.Router();

const sizeSystemController = require('../controllers/sizeSystem');

const { sizeSystemDataValidation, sizeSystemIdValidation } = require('../middleware/sizeSystemValidators/sizeSystemValidators');

const { dataErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers');

const { verifyToken } = require('../middleware/auth/authJWT');
const { verifyUserRole } = require('../middleware/auth/authUser');

router.post(
   '/sizesystem',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   sizeSystemDataValidation(),
   dataErrorHandler,
   throwError('Size system data validation failed.'),
   sizeSystemController.postSizeSystem
);

router.put(
   '/sizesystem/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   sizeSystemDataValidation(),
   dataErrorHandler,
   throwError('Size system data validation failed.'),
   sizeSystemController.putSizeSystem
);

router.get('/sizesystems', verifyToken, verifyUserRole(['admin', 'employee']), sizeSystemController.getSizeSystems);

router.get(
   '/sizesystems/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   sizeSystemIdValidation(),
   dataErrorHandler,
   throwError('Size system data validation failed.'),
   sizeSystemController.getSizeSystem
);

router.get(
   '/removesizesystem/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   sizeSystemIdValidation(),
   dataErrorHandler,
   throwError('Size system data validation failed.'),
   sizeSystemController.removeSizeSystem
);

module.exports = router;
