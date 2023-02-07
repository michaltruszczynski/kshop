const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

const { productIdValidation } = require('../middleware/productValidators/productValidator');

const { dataErrorHandler, throwError } = require('../middleware/errorHandlers/errorHandlers.js');

router.get('/products', shopController.getProducts);

router.get('/products/random', shopController.getRadomProducts);

router.get('/products/:id', productIdValidation(), dataErrorHandler, throwError('Product data validation failed.'), shopController.getProduct);

router.get('/brands', shopController.getBrands);

router.get('/brands/random', shopController.getRandomBrands);

module.exports = router;
