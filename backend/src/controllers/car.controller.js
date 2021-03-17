const { CarModel } = require("../models/cars.model");
const UserModel = require("../models/user.model");

const { carSchema, validateForm } = require("../utils/joi.schemas");

const validateCarSchema = validateForm(carSchema);

const getLoggedUser = (req) => {
  return req.headers.loggedUser;
};

class CarController {
  async index(req, res) {
    const { _id } = getLoggedUser(req);

    const user = await UserModel.findOne({ _id }).lean();

    res.send({ data: user.cars });
  }

  async store(req, res) {
    try {
      validateCarSchema(req.body);

      const { _id: userId } = getLoggedUser(req);

      const user = await UserModel.findById(userId);

      if (!user) {
        res.status(400).send({ message: "User not exists" });
      }

      let car = await CarModel.findOne({ licensePlate: req.body.licensePlate });

      if (car) {
        return res
          .status(400)
          .send({ message: "License plate already exists" });
      }

      car = await CarModel.create(req.body);

      user.cars.push(car);

      await user.save();

      res.send({ data: car });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const data = await CarModel.findById(id);
      res.send({ data });
    } catch (e) {
      res.status(400).send({ message: "Car not exists" });
    }
  }

  async update(req, res) {
    const {
      params: { id },
      body,
    } = req;

    try {
      validateCarSchema(body);

      const car = await CarModel.findOneAndUpdate(id, body, { new: true });

      res.send({
        data: car,
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async remove(req, res) {
    const { id } = req.params;

    try {
      const car = await CarModel.findByIdAndDelete(id);
      if (car) {
        res.send({ message: "Car removed" });
      }
      throw new Error("Car not exist");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new CarController();
