const Product = require('../model/product');
const Brand = require('../model/brand');

exports.getProducts = async (req, res, next) => {
   try {
      const { productsCategory, productsBrand, productsSort } = req.query;
      const page = parseInt(req.query.page) || 1;
      const pageLimit = parseInt(req.query.pageLimit) || 4;

      const searchParams = {};
      if (productsCategory) {
         searchParams.category = productsCategory;
      }
      if (productsBrand) {
         searchParams.brand = productsBrand;
      }
      let sortProductsParam;
      if (productsSort) {
         sortProductsParam = { createdAt: productsSort };
      }

      const productsCount = await Product.find({ ...searchParams, removeDate: { $exists: false } }).countDocuments();

      const skipProductCount = (page - 1) * pageLimit;

      const products = await Product.find({ ...searchParams, removeDate: { $exists: false } }, 'name type category brand price images primaryImage')
         .skip(skipProductCount)
         .limit(+pageLimit)
         .sort(sortProductsParam);

      const productsList = products.map((product) => {
         const { _id, name, type, category, brand, images, price, primaryImage } = product;

         return {
            _id,
            name,
            type,
            category,
            brand,
            images,
            primaryImage,
            price: parseFloat(price).toFixed(2),
         };
      });
      res.status(200).json({
         products: productsList,
         productsCount: productsCount,
      });
   } catch (error) {
      if (!error.stausCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getProduct = async (req, res, next) => {
   const productId = req.params.id;

   try {
      const product = await Product.findById(productId);

      if (!product) {
         const error = new Error('Could not find product.');
         error.statusCode = 404;
         throw error;
      }

      const productData = product.toObject();
      const { price } = productData;

      //TODO tempporary product price
      productData.price = parseFloat(price).toFixed(2);

      res.status(200).json(productData);
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getBrands = async (req, res, next) => {
   try {
      const { user } = req;
      const brands = await Brand.find({ removeDate: { $exists: false } }, '_id brandName');

      const brandsList = brands.map((brand) => {
         const { _id, brandName } = brand;

         return {
            _id,
            brandName,
         };
      });

      res.status(200).json({ brands: brandsList });
   } catch (error) {
      if (!error.stausCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};
