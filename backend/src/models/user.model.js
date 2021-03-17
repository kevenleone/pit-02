const mongoose = require("mongoose");

const {CarSchema} = require('./cars.model');

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    birthday: Date,
    login: String,
    phone: String,
    password: String,
    email: String,
    lastLogin: Date,
    cars: [CarSchema]
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
