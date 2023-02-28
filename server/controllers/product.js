const Product = require('../model/product');

const { getUpdatedFilesArr } = require('../utility/utility');
const { deleteFilesFromS3, copyFilesS3Promise } = require('../middleware/utility');

const getParsedFileName = (fileNameJSON) => {
   if (!fileNameJSON) return [];
   if (!Array.isArray(fileNameJSON)) {
      console.log('JSON.parse(fileNameJSON): ', JSON.parse(fileNameJSON));
      return [JSON.parse(fileNameJSON)];
   }

   return fileNameJSON.map((singlefilenameJSON) => JSON.parse(singlefilenameJSON));
};

exports.getProduct = async (req, res, next) => {
   try {
      const productId = req.params.id;
      const { user } = req;
      const product = await Product.findById(productId);

      if (!product) {
         const error = new Error('Could not find product.');
         error.statusCode = 404;
         throw error;
      }

      const productData = product.toObject();

      productData.isOwner = productData.owner ? productData.owner.toString() === user._id.toString() : 1;
      productData.primaryImage = productData.primaryImage.name;
      res.status(200).json(productData);
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getAllProducts = async (req, res, next) => {
   try {
      const { user } = req;
      const products = await Product.find({ removeDate: { $exists: false } }, 'name type category brand price owner inStock inOffer');

      const productsList = products.map((product) => {
         const { _id, name, type, category, brand, price, owner, inStock, inOffer } = product;
         return {
            _id,
            name,
            type,
            category,
            brand,
            price: parseFloat(price).toFixed(2),
            isOwner: owner ? owner.toString() === user._id.toString() : false,
            inStock,
            inOffer,
         };
      });
      res.status(200).json({
         products: productsList,
      });
   } catch (error) {
      if (!error.stausCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.postProduct = async (req, res, next) => {
   try {
      const { category, name, type, brand, description, sizeSystem, sizeSystemId, sizeChart: sizeChartJSON, urlImages: urlImagesJSON, price, primaryImage, inOffer } = req.body;

      const productImages = req.files;
      const { user } = req;

      const sizeChart = JSON.parse(sizeChartJSON);
      const urlImages = getParsedFileName(urlImagesJSON);

      const copiedImages = await copyFilesS3Promise(urlImages);

      const formatNewS3Images = (images) => {
         if (!images || !images.length) return [];

         const formatedImages = images.map((image) => {
            const imageDBData = {
               name: image.originalname,
               fileName: image.key,
               url: image.location,
            };
            return imageDBData;
         });

         return formatedImages;
      };

      const formatDuplicatedS3Images = (images) => {
         if (!images || !images.length) return [];

         const formatedImages = images.map((image) => {
            const imageDBData = {
               name: image.name,
               fileName: image.fileName,
               url: image.url,
            };
            return imageDBData;
         });
         return formatedImages;
      };

      const images = [...formatNewS3Images(productImages), ...formatDuplicatedS3Images(copiedImages)];

      const primaryImageDB = images.find((image) => image.name === primaryImage);

      const newProduct = new Product({
         category,
         name,
         type,
         brand,
         description,
         sizeSystem,
         sizeSystemId,
         sizeChart,
         price: parseFloat(price).toFixed(2),
         images,
         primaryImage: primaryImageDB,
         owner: user._id,
         inOffer,
      });

      const response = await newProduct.save();
      res.status(200).json({ message: 'Product created.', productId: response._id });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.putProduct = async (req, res, next) => {
   try {
      const { user } = req;
      const productId = req.params.id;
      const { category, name, type, brand, description, sizeSystem, sizeSystemId, sizeChart: sizeChartJSON, urlImages: urlImagesJSON, price, primaryImage, inOffer } = req.body;

      const productImages = req.files;
      console.log('sizeSystemId: ', sizeSystemId);
      const product = await Product.findById(productId);

      if (!product) {
         const error = new Error('Could not find product.');
         error.statusCode = 404;
         throw error;
      }

      if (product.owner.toString() !== user._id.toString()) {
         const error = new Error('You are not authorized to perform this operation.');
         error.statusCode = 401;
         throw error;
      }

      const urlImages = getParsedFileName(urlImagesJSON);

      const sizeChart = JSON.parse(sizeChartJSON);

      const { updatedFilesList, filesToDelete } = getUpdatedFilesArr(product.images, productImages, urlImages);

      const primaryImageDB = updatedFilesList.find((file) => file.name === primaryImage);

      const deletedFilesInfo = await deleteFilesFromS3(filesToDelete);

      product.name = name;
      product.type = type;
      product.category = category;
      product.brand = brand;
      product.description = description;
      product.price = JSON.parse(price).toFixed(2);
      product.sizeSystem = sizeSystem;
      product.sizeChart = sizeChart;
      product.sizeSystemId = sizeSystemId;
      product.images = updatedFilesList;
      product.primaryImage = primaryImageDB;
      product.inOffer = inOffer;

      const response = await product.save();

      res.status(200).json({ message: 'Product updated.', productId: response._id });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.deleteProduct = async (req, res, next) => {
   const productId = req.params.id;

   try {
      const response = await Product.deleteOne({ _id: productId });
   } catch (error) {
      console.log(error);
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.removeProduct = async (req, res, next) => {
   try {
      const productId = req.params.id;
      const { user } = req;

      const product = await Product.findById(productId);

      if (!product) {
         const error = new Error('Could not find product.');
         error.statusCode = 404;
         throw error;
      }

      if (product.owner.toString() !== user._id.toString()) {
         const error = new Error('You are not authorized to perform this operation.');
         error.statusCode = 401;
         throw error;
      }

      const response = await Product.updateOne(
         {
            _id: productId,
            removeDate: {
               $exists: false,
            },
         },
         {
            $set: {
               removeDate: new Date().toISOString(),
            },
         }
      );

      const { modifiedCount } = response;

      if (!modifiedCount) {
         const error = new Error('Could not find product.');
         error.statusCode = 404;
         throw error;
      }

      res.status(200).json({ message: 'Product removed.', productId: productId });
   } catch (error) {
      console.log(error);
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};
