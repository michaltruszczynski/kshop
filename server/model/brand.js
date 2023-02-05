const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brandSchema = new Schema(
   {
      brandName: {
         type: String,
         required: true,
      },
      images: {
         type: [
            {
               name: {
                  type: String,
                  required: true,
               },
               fileName: {
                  type: String,
                  required: true,
               },
               url: {
                  type: String,
                  required: true,
               },
            },
         ],
         _id: false,
      },
      owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      removeDate: {
            type: Date
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
