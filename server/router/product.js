const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

const { deleteFilesOnDataErrorS3 } = require("../middleware/utility");

const { productDataValidation } = require("../middleware/productValidators/productValidator");
const { productImageMulterValidationS3 } = require("../middleware/productValidators/productMulterS3");

const { dataErrorHandler, multerErrorHandler, throwError } = require("../middleware/errorHandlers/errorHandlers.js");

const { verifyToken } = require("../middleware/auth/authJWT");
const { verifyUserRole } = require("../middleware/auth/authUser");

router.post(
   "/product",
   verifyToken,
   verifyUserRole(["admin", "employee"]),
   productImageMulterValidationS3,
   productDataValidation(),
   deleteFilesOnDataErrorS3,
   dataErrorHandler,
   multerErrorHandler,
   throwError("Product data validation failed."),
   productController.postProduct
);

router.put(
   "/product/:id",
   verifyToken,
   verifyUserRole(["admin", "employee"]),
   productImageMulterValidationS3,
   productDataValidation(),
   deleteFilesOnDataErrorS3,
   dataErrorHandler,
   multerErrorHandler,
   throwError("Product data validation failed."),
   productController.putProduct
);

router.get(
   "/products/random",
   // verifyToken,
   productController.getRadomProducts
);

router.get("/products/:id", verifyToken, verifyUserRole(["admin", "employee"]), productController.getProduct);

router.get("/products", verifyToken, verifyUserRole(["admin", "employee"]), productController.getProducts);

router.get("/allproducts", verifyToken, verifyUserRole(["admin", "employee"]), productController.getAllProducts);

router.delete(
   "/products/delete/:id",
   // verifyToken,
   productController.deleteProduct
);

// router.delete('/products/delete/:id',
//       // verifyToken,
//       productController.deleteProduct);

module.exports = router;
