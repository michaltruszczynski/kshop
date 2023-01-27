
const multerS3 = require('multer-s3');
const path = require('path');
const { validationResult } = require('express-validator');
const { s3, bucketName } = require('./awsS3/awsS3');
const { v4: uuidv4 } = require('uuid');
const { imageS3URL } = require('../config/config');

const deleteFilesFromS3 = async (filesS3Array) => {
      if (!filesS3Array.length) return;
      return await s3.deleteObjects({
            Bucket: bucketName,
            Delete: { Objects: filesS3Array }
      }).promise();
}

const deleteFilesOnDataErrorS3 = async (req, res, next) => {

      try {
            const dataErrors = validationResult(req);
            if (req.multerError) return next();

            if (!dataErrors.isEmpty() || req.filesNumberError) {
                  if (!req.files.length) return next();
                  const filesToRemove = req.files;
                  const filesS3Array = filesToRemove.map(file => ({ Key: file.key }));

                  const response = await deleteFilesFromS3(filesS3Array);
            }

            next();

      } catch (error) {
            if (!error.stausCode) {
                  error.statusCode = 500
            }
            next(error);
      }
}

const copyFilesS3Promise = async (filesList) => {
      console.log('copyFilesS3_filesList: ', filesList)
      if (!filesList.length) return [];
      let imagesData = [];

      const promisesList = filesList.map(file => {
            const uuidv4Name = uuidv4();

            imagesData.push({
                  url: `${imageS3URL}/${uuidv4Name}${path.extname(file.fileName)}`,
                  name: `${file.name}`,
                  fileName: `${uuidv4Name}${path.extname(file.fileName)}`
            });

            return s3.copyObject({
                  Bucket: bucketName,
                  CopySource: `${bucketName}/${file.fileName}`,
                  Key: `${uuidv4Name}${path.extname(file.fileName)}`,
                  ACL: 'public-read'
            }).promise()
      })

      const filesCopied = await Promise.all(promisesList);

      console.log('copyFilesS3: ', imagesData);

      return imagesData;
}

module.exports = {
      deleteFilesOnDataErrorS3,
      deleteFilesFromS3,
      copyFilesS3Promise
}