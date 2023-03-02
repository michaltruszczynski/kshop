const { validationResult } = require('express-validator');

const defaultErrorMessage = 'Input data validation failed';

const dataErrorHandler = (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) return next();

      if (!req.dataError) {
            req.dataError = errors.array();
            return next();
      }

      req.dataError = req.dataError.concat(errors.array());

      next();
}

const multerErrorHandler = (req, res, next) => {
      if (!req.multerError ) return next();

      if (!req.dataError) {
            req.dataError = [...req.multerError];
            return next();
      }

      req.dataError = req.dataError.concat(req.multerError);

      next();
}



const throwError = (errorMessage = defaultErrorMessage ) => (req, res, next) => {
      if (!req.dataError) return next();

      const error = new Error(errorMessage)
      error.statusCode = 422;
      error.data = [...req.dataError];

      throw error;
}

module.exports = {
      dataErrorHandler,
      multerErrorHandler,
      throwError
}
