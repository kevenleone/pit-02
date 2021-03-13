const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const schema = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  phone: Joi.number().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  birthday: Joi.date().greater("1-1-1900"),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const saltRounds = 10;

class UserController {
  async auth(req, res) {
    const { login, password } = req.body;

    try {
      const user = await UserModel.findOne({ login }).lean();

      if (!user) {
        throw new Error("User not exists");
      }

      const compareResult = await bcrypt.compare(body.password, user.password);

      if (!compareResult) {
        throw new Error("Invalid Password");
      }

      delete user.password;

      const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

      res.send({ token });
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: "Invalid login or password" });
    }
  }

  async index(req, res) {
    const data = await UserModel.find();

    res.send({ data });
  }

  async store(req, res) {
    const validation = schema.validate(req.body);

    let { login, password, email } = req.body;

    if (validation.error) {
      res
        .status(400)
        .send({ message: "Invalid Fields", error: validation.error.message });
    }

    if (password) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      password = hash;
    }

    const user = await UserModel.findOne({
      $or: [
        {
          login,
        },
        {
          email,
        },
      ],
    });

    if (user) {
      if (user.email === email) {
        return res.status(400).send({ message: "Email already exists" });
      }

      if (user.login === login) {
        return res.status(400).send({ message: "Login already exists" });
      }
    }

    const newUser = await UserModel.create(req.body);

    res.send({ user: newUser });
  }

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findById(id);
      res.send({ user });
    } catch (e) {
      res.status(400).send({ message: "User not exists" });
    }
  }

  async update(req, res) {
    const {
      params: { id },
      body,
    } = req;

    if (body.password) {
      const password = body.password;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      body.password = hash;
    }

    const user = await UserModel.findOneAndUpdate(id, body).lean();

    res.send({
      user: {
        ...user,
        ...body,
      },
    });
  }

  async remove(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (user) {
        res.send({ message: "User removed" });
      }
      throw new Error("User not exist");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async me(req, res) {
    res.send({ loggedUser: req.headers.loggedUser });
  }
}

module.exports = new UserController();
