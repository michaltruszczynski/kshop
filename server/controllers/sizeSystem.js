const SizeSystem = require('../model/sizeSystem');

exports.postSizeSystem = async (req, res, next) => {
      const sizeSystemName = req.body.sizeSystemName;
      const sizeChart = req.body.sizeChart

      try {
            const newSizeSystem = new SizeSystem({
                  sizeSystemName,
                  sizeChart
            });

            const result = await newSizeSystem.save();

            res.status(200).json({ message: 'Size system created.', sizeSystemId: result._id })
      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}

exports.getSizeSystems = async (req, res, next) => {
      try {
            const sizeSystems = await SizeSystem.find({}, 'sizeSystemName sizeChart');

            res.status(200).json({ sizeSystems });
      } catch (error) {
            if (!error.stausCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}

exports.getSizeSystem = async (req, res, next) => {
      const sizeSystemId = req.params.id

      try {
            const sizeSystem = await SizeSystem.findById(sizeSystemId);

            if (!sizeSystem) {
                  const error = new Error('Could not find size system.');
                  error.statusCode = 404;
                  throw (error);
            }

            res.status(200).json(sizeSystem);
      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}

exports.putSizeSystem = async (req, res, next) => {
      const sizeSystemId = req.params.id;
      const sizeSystemName = req.body.sizeSystemName;
      const sizeChart = req.body.sizeChart
      try {
            const sizeSystem = await SizeSystem.findById(sizeSystemId);

            if (!sizeSystem) {
                  const error = new Error('Could not find size system.');
                  error.statusCode = 404;
                  throw (error);
            }

            // sprawdzenie czy dane user może modyfikować, i czy

            sizeSystem.sizeSystemName = sizeSystemName;
            sizeSystem.sizeChart = sizeChart;

            const result = await sizeSystem.save();
            res.status(200).json({ message: 'Size system updated.', sizeSystemId: result._id })

      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error)
      }
}

exports.postNewSizeSystem = async (req, res, next) => {
      const sizeSystemName = req.body.sizeSystemName;
      const sizeChart = req.body.sizeChart

      try {
            const newSizeSystem = new SizeSystem({
                  sizeSystemName,
                  sizeChart
            });

            const result = await newSizeSystem.save();

            res.status(200).json({ message: 'Size system created.', sizeSystemId: result._id })
      } catch (error) {
            if (!error.statusCode) {
                  error.statusCode = 500;
            }
            next(error);
      }
}