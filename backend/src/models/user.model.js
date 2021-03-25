const mongoose = require("mongoose");

const { ProductSchema } = require("./product.model");

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    birthday: Date,
    login: String,
    phone: String,
    password: String,
    lastLogin: Date,
    wishlist: [
      {
        productId: mongoose.ObjectId,
      },
    ],
    cart: [
      {
        productId: mongoose.ObjectId,
        size: String,
        color: String,
        quantity: Number,
      },
    ],
    purchasedProducts: [ProductSchema],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
