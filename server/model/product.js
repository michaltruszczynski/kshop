const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
      name: {
            type: String,
            required: true
      },
      type: {
            type: String,
            required: true
      },
      category: {
            type: String,
            required: true
      },
      brand: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true
      },
      sizeSystem: {
            type: String,
            required: true
      },
      sizeSystemId: {
            type: String,
            required: true
      },
      sizeChart: {
            type: [{ sizeDescription: String }],
            required: true,
            _id: false
      },
      price: {
            type: String,
            required: true
      },
      images: {
            type: [{
                  name: {
                        type: String,
                        required: true
                  },
                  fileName: {
                        type: String,
                        required: true
                  },
                  url: {
                        type: String,
                        required: true
                  }
            }],
            required: true,
            _id: false
      },
      primaryImage: {
            type: {
                  name: {
                        type: String,
                  },
                  fileName: {
                        type: String,
                  },
                  url: {
                        type: String
                  }
            },
            required: true
      },
      owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
      },
      removeDate: {
            type: Date
      },
      inStock: {
            type: Boolean
      },
      inOffer: {
            type: Boolean
      }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);