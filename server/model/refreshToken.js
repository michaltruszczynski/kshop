const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
      refreshToken: {
            type: String,
            required: true
      },
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
      },
      expiryDate: {
            type: Date,
            required: true
      }
}, { timestamps: true });

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);