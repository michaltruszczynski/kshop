const SizeSystem = require('../model/sizeSystem');

exports.postSizeSystem = async (req, res, next) => {
   const sizeSystemName = req.body.sizeSystemName;
   const sizeChart = req.body.sizeChart;
   const { user } = req;

   try {
      const newSizeSystem = new SizeSystem({
         sizeSystemName,
         sizeChart,
         owner: user._id,
      });

      const result = await newSizeSystem.save();

      res.status(200).json({ message: 'Size system created.', sizeSystemId: result._id });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getSizeSystems = async (req, res, next) => {
   const { user } = req;

   try {
      const sizeSystems = await SizeSystem.find({ removeDate: { $exists: false } }, 'sizeSystemName sizeChart owner');

      const sizeSystemsList = sizeSystems.map((sizeSystem) => {
         const { _id, sizeSystemName, sizeChart, owner } = sizeSystem;
         return {
            _id,
            sizeSystemName,
            sizeChart,
            isOwner: owner ? owner.toString() === user._id.toString() : false,
         };
      });

      res.status(200).json({ sizeSystems: sizeSystemsList });
   } catch (error) {
      if (!error.stausCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.getSizeSystem = async (req, res, next) => {
   const sizeSystemId = req.params.id;
   const { user } = req;

   try {
      const sizeSystem = await SizeSystem.findOne({ _id: sizeSystemId, removeDate: { $exists: false } });

      if (!sizeSystem) {
         const error = new Error('Could not find size system.');
         error.statusCode = 404;
         throw error;
      }

      const sizeSystemData = sizeSystem.toObject();
      sizeSystemData.isOwner = sizeSystem.owner ? sizeSystem.owner.toString() === user._id.toString() : false;

      res.status(200).json(sizeSystemData);
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.putSizeSystem = async (req, res, next) => {
   const sizeSystemId = req.params.id;
   const sizeSystemName = req.body.sizeSystemName;
   const sizeChart = req.body.sizeChart;
   try {
      const sizeSystem = await SizeSystem.findById(sizeSystemId);

      if (!sizeSystem) {
         const error = new Error('Could not find size system.');
         error.statusCode = 404;
         throw error;
      }

      if (user._id.toString() !== sizeSystem.owner.toString()) {
         const error = new Error('You are not authorized to perform this operation.');
         error.statusCode = 403;
         throw error;
      }

      sizeSystem.sizeSystemName = sizeSystemName;
      sizeSystem.sizeChart = sizeChart;

      const result = await sizeSystem.save();
      res.status(200).json({ message: 'Size system updated.', sizeSystemId: result._id });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};

exports.removeSizeSystem = async (req, res, next) => {
   const sizeSystemId = req.params.id;
   const { user } = req;

   try {
      const sizeSystem = await SizeSystem.findById(sizeSystemId);

      if (!sizeSystem) {
         const error = new Error('Could not find size system.');
         error.statusCode = 404;
         throw error;
      }

      if (user._id.toString() !== sizeSystem.owner.toString()) {
         const error = new Error('You are not authorized to perform this operation.');
         error.statusCode = 403;
         throw error;
      }

      const response = await SizeSystem.updateOne(
         {
            _id: sizeSystemId,
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
         const error = new Error('Could not find size system.');
         error.statusCode = 404;
         throw error;
      }

      res.status(200).json({ message: 'SizeSystem removed.', sizeSystemId: sizeSystemId });
   } catch (error) {
      if (!error.statusCode) {
         error.statusCode = 500;
      }
      next(error);
   }
};
