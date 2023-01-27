const aws = require('aws-sdk');

const s3 = new aws.S3({
      apiVersion: '2006-03-01',
      accessKeyId: 'AKIAVHE4FP6KYLAK62QK',
      secretAccessKey: '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'

});

const bucketName = 'reactshop';

module.exports = {
      s3,
      bucketName
}