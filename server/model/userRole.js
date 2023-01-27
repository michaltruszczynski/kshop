const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userRolechema = new Schema({
      name: {
            type: String,
            required: true
      },
      roleId: {
            type: Number,
            required: true
      }
}, { timestamps: true });

module.exports = mongoose.model('UserRole', userRolechema);