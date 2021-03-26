const UserModel = require("../models/user.model");
const { ProductModel } = require("../models/product.model");

const { cartSchema, validateForm } = require("../utils/joi.schemas");

const getUserOrFail = async (req, lean) => {
  const {
    headers: {
      loggedUser: { _id: userId },
    },
  } = req;

  try {
    if (lean) {
      return UserModel.findById(userId).lean();
    }

    return UserModel.findById(userId);
  } catch (error) {
    throw new Error(error.message);
  }
};

class CartController {
  async getAllCart(req, res) {
    const user = await getUserOrFail(req, true);
    
    const productIds = user.cart.map(({ productId }) => productId);

    const products = await ProductModel.find({
      _id: {
        $in: productIds,
      },
    }).lean();

    const cartProducts = user.cart.map((cart) => {
      return {
        ...cart,
        product: products.find(
          (product) => cart.productId.toString() === product._id.toString()
        ),
      };
    });

    res.send(cartProducts);
  }

  async addProductToCart(req, res) {
    const data = req.body;

    try {
      validateForm(cartSchema)(data);

      const user = await getUserOrFail(req);

      let cart = user.cart;

      const isProductInCart = user.cart.find(
        (cart) => cart.productId.toString() === data.productId
      );

      if (isProductInCart) {
        cart = cart.map((product) => {
          if (product.productId.toString() === data.productId) {
            return data;
          }

          return product;
        });

        user.cart = cart;
      } else {
        user.cart.push(data);
      }

      await user.save();

      res.send({ user });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new CartController();
