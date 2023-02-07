const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

const { deleteFilesOnDataErrorS3 } = require('../middleware/utility');

const { productDataValidation, productIdValidation } = require('../middleware/productValidators/productValidator');
const { productImageMulterValidationS3 } = require('../middleware/productValidators/productMulterS3');

const { dataErrorHandler, multerErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers.js');

const { verifyToken } = require('../middleware/auth/authJWT');
const { verifyUserRole } = require('../middleware/auth/authUser');

router.post(
   '/product',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   productImageMulterValidationS3,
   productDataValidation(),
   deleteFilesOnDataErrorS3,
   dataErrorHandler,
   multerErrorHandler,
   throwError('Product data validation failed.'),
   productController.postProduct
);

router.put(
   '/product/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   productImageMulterValidationS3,
   productDataValidation(),
   deleteFilesOnDataErrorS3,
   dataErrorHandler,
   multerErrorHandler,
   throwError('Product data validation failed.'),
   productController.putProduct
);

router.get(
   '/products/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   productIdValidation(),
   dataErrorHandler,
   throwError('Product data validation failed.'),
   productController.getProduct
);

// router.get('/products', verifyToken, verifyUserRole(['admin', 'employee']), productController.getProducts);

router.get('/allproducts', verifyToken, verifyUserRole(['admin', 'employee']), productController.getAllProducts);

router.get(
   '/removeproduct/:id',
   verifyToken,
   verifyUserRole(['admin', 'employee']),
   productIdValidation(),
   dataErrorHandler,
   throwError('Product data validation failed.'),
   productController.deleteProduct
);

module.exports = router;
