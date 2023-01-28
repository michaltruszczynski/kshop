const aws = require('aws-sdk');

const STRIPE_ACCESS_KEYID= process.env.STRIPE_ACCESS_KEYID;
const STRIPE_SECRET_ACCESS_KEYID= process.env.STRIPE_SECRET_ACCESS_KEYID;

const s3 = new aws.S3({
      apiVersion: '2006-03-01',
      accessKeyId: STRIPE_ACCESS_KEYID,
      secretAccessKey: STRIPE_SECRET_ACCESS_KEYID

});

const bucketName = 'reactshop';

module.exports = {
      s3,
      bucketName
}