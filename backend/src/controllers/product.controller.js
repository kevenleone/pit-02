const {ProductModel} = require("../models/product.model");

class ProductController {
  async index(req, res) {
    const product = await ProductModel.find().lean();

    res.send({ data: product });
  }

  async store(req, res) {
    try {
      const product = await ProductModel.create(req.body);

      res.send({ data: product });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const data = await ProductModel.findById(id);
      res.send({ data });
    } catch (e) {
      res.status(400).send({ message: "Product not exists" });
    }
  }
}

module.exports = new ProductController();
