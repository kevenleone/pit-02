const UserModel = require("../models/user.model");

class UserController {
  async index(req, res) {
    const users = await UserModel.find();

    res.send({ users });
  }
}

module.exports = new UserController();
