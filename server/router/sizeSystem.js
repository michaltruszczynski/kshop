const express = require('express');
const router = express.Router();

const sizeSystemController = require('../controllers/sizeSystem');

const { sizeSystemDataValidation } = require('../middleware/sizeSystemValidators/sizeSystemValidators');

const { dataErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers');

router.post('/sizesystem',
      sizeSystemDataValidation(),
      dataErrorHandler,
      throwError('Size system data validation failed.'),
      sizeSystemController.postSizeSystem);

router.put('/sizesystem/:id',
      sizeSystemDataValidation(),
      dataErrorHandler,
      throwError('Size system data validation failed.'),
      sizeSystemController.putSizeSystem);

router.get('/sizesystems', sizeSystemController.getSizeSystems);

router.get('/sizesystems/:id', sizeSystemController.getSizeSystem);

module.exports = router;