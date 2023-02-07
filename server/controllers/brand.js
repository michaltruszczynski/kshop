const Brand = require('../model/brand');

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

exports.postBrand = async (req, res, next) => {
   const { brandName, urlImages: urlImagesJSON } = req.body;
   const brandImages = req.files;
   const { user } = req;

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

   const images = [...formatNewS3Images(brandImages), ...formatDuplicatedS3Images(copiedImages)];

   const newBrand = new Brand({
      brandName,
      images,
      owner: user._id,
   });

   try {
      const result = await newBrand.save();
      res.status(200).json({ message: 'Brand created.', brandId: result._id });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getBands = async (req, res, next) => {
   try {
      const { user } = req;
      const brands = await Brand.find({ removeDate: { $exists: false } }, '_id brandName owner');

      const brandsList = brands.map((brand) => {
         const { _id, brandName, owner } = brand;

         return {
            _id,
            brandName,
            isOwner: owner ? owner.toString() === user._id.toString() : 1,
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

exports.getBrand = async (req, res, next) => {
   const brandId = req.params.id;
   const { user } = req;

   try {
      const brand = await Brand.findById(brandId);

      if (!brand) {
         const error = new Error('Could not find brand.');
         error.statusCode = 404;
         throw error;
      }

      const brandData = brand.toObject();
      brandData.isOwner = brandData.owner ? brandData.owner.toString() === user._id.toString() : 1;

      res.status(200).json(brandData);
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.putBrand = async (req, res, next) => {
   const brandId = req.params.id;
   const { brandName, urlImages: urlImagesJSON } = req.body;
   const brandImages = req.files;
   const { user } = req;

   try {
      const brand = await Brand.findById(brandId);

      if (!brand) {
         const error = new Error('Could not find brand.');
         error.statusCode = 404;
         throw error;
      }

      if (user._id.toString() !== brand.owner.toString()) {
         const error = new Error('You are not authorized to perform this operation.');
         error.statusCode = 403;
         throw error;
      }

      const urlImages = getParsedFileName(urlImagesJSON);

      const { updatedFilesList, filesToDelete } = getUpdatedFilesArr(brand.images, brandImages, urlImages);

      const deletedFilesInfo = await deleteFilesFromS3(filesToDelete);

      brand.brandName = brandName;
      brand.images = updatedFilesList;

      const result = await brand.save();

      res.status(200).json({ message: 'Brand updated.', brandId: result._id });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.removeBrand = async (req, res, next) => {
   let brandId = req.params.id;
   const { user } = req;

   try {
      const response = await Brand.updateOne(
         {
            _id: brandId,
            owner: user._id,
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
         const error = new Error('Could not find brand.');
         error.statusCode = 404;
         throw error;
      }

      res.status(200).json({ message: 'Brand removed.', brandId: brandId });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};
