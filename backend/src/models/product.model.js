const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  path: String,
  brand: Number,
  description: String,
  prices: {
    price: {
      value: Number,
      currencyCode: String,
    },
    salesPrice: Number,
  },
  images: [
    {
      url: String,
      alt: String,
      isDefault: { type: Boolean, default: false },
    },
  ],
  id: Number,
  options: [{}],
  slug: String,
  price: {
    value: Number,
    currencyCode: String,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = {
  ProductModel,
  ProductSchema
};
