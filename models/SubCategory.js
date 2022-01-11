const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "Category too short"],
      maxlength: [32, "Category too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "category", required: true },
  },
  { timestamps: true }
);

const subCategory = mongoose.model("subcategory", subCategorySchema);

module.exports = subCategory;
