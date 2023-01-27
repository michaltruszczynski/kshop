const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sizeSystemSchema = new Schema({
     sizeSystemName: {
            type: String,
            required: true
      },
      sizeChart: {
            type: [],
            required: true
      }
}, {timestamps: true});

module.exports = mongoose.model('SizeSystem', sizeSystemSchema)