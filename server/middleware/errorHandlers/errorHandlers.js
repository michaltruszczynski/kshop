const { validationResult } = require('express-validator');

const defaultErrorMessage = 'Input data validation failed';

const dataErrorHandler = (req, res, next) => {
      const errors = validationResult(req);
      console.log('errors', errors.isEmpty(), errors);

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

// const multerErrorHandler = (errorMessage = defaultErrorMessage) => (req, res, next) => {
//       if (!req.multerError && !req.filesNumberError) return next()

//       if (!req.dataError) {
//             const error = new Error(errorMessage)
//             error.statusCode = 422;
//             error.data = [];
//             req.dataError = error
//       }

//       if (req.multerError) {
//             req.dataError.data.push(req.multerError);
//       }

//       if (req.filesNumberError) {
//             req.dataError.data.push(req.filesNumberError);
//       }

//       next();
// }

// const throwError = (req, res, next) => {
//       if (!req.dataError) return next();
//       console.log('req.dataError', req.dataError)
//       throw req.dataError;
// }

// const dataErrorHandler = (errorMessage = defaultErrorMessage) => (req, res, next) => {
//       const errors = validationResult(req);
//       console.log('errors', errors.isEmpty())
//       if (errors.isEmpty()) return next();

//       if (!req.dataError) {
//             const error = new Error(errorMessage)
//             error.statusCode = 422;
//             error.data = [];
//             req.dataError = error
//       }

//       req.dataError.data = req.dataError.data.concat(errors.array());

//       next();
// }