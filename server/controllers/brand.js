const Brand = require("../model/brand");

const { getUpdatedFilesArr } = require("../utility/utility");
const { deleteFilesFromS3, copyFilesS3Promise } = require("../middleware/utility");

const getParsedFileName = (fileNameJSON) => {
   if (!fileNameJSON) return [];
   if (!Array.isArray(fileNameJSON)) {
      console.log("JSON.parse(fileNameJSON): ", JSON.parse(fileNameJSON));
      return [JSON.parse(fileNameJSON)];
   }
   // console.log('second: ', fileNameJSON.map(singlefilenameJSON => JSON.parse(singlefilenameJSON)));
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

   // console.log('brandImages:', images);
   const newBrand = new Brand({
      brandName,
      images,
      owner: user._id,
   });

   try {
      const result = await newBrand.save();
      res.status(200).json({ message: "Brand created.", brandId: result._id });
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
      const brands = await Brand.find({}, "_id brandName owner");

      const brandsList = brands.map(brand => {
            const {_id, brandName, owner} = brand;

            return {
                  _id,
                  brandName,
                  isOwner: owner ? owner.toString() === user._id.toString() : 1
            };
      })

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
      console.log(brand);
      if (!brand) {
         const error = new Error("Could not find brand.");
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

   try {
      const brand = await Brand.findById(brandId);

      if (!brand) {
         const error = new Error("Could not find brand.");
         error.statusCode = 404;
         throw error;
      }

      const urlImages = getParsedFileName(urlImagesJSON);

      const { updatedFilesList, filesToDelete } = getUpdatedFilesArr(brand.images, brandImages, urlImages);

      const deletedFilesInfo = await deleteFilesFromS3(filesToDelete);

      brand.brandName = brandName;
      brand.images = updatedFilesList;

      const result = await brand.save();
      console.log(result);
      res.status(200).json({ message: "Brand updated.", brandId: result._id });
   } catch (error) {
      console.log(error);
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getRandomBrands = async (req, res, next) => {
      const {count} = req.query
      try {
                  const dbBrandCount = await Brand.find().countDocuments();

                  if (dbBrandCount <= count) {
                     return res.json({ brands: [] });
                  }

                  const randomBrands = await Brand.aggregate([
                     { $sample: { size: parseInt(count) } },
                     { $project: { _id: 1, brandName: 1, images: 1 } },
                  ]);

                  res.status(200).json({ brands: randomBrands });
      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}
