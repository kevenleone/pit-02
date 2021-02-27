const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    age: {type: Number, default: 1},
    phone: {
      ddd: Number,
      num: Number
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
