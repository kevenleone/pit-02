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

const getCartProducts = async (user) => {
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

  return cartProducts;
};

class CartController {
  async getAllCart(req, res) {
    const user = await getUserOrFail(req, true);

    const cartProducts = await getCartProducts(user);

    res.send(cartProducts);
  }

  async saveProductToCart(req, res) {
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

      const userLean = await getUserOrFail(req, true);

      const cartProducts = await getCartProducts(userLean);

      res.send(cartProducts);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async removeProductCart(req, res) {
    const { id } = req.params;

    const user = await getUserOrFail(req);
    const cart = user.cart;

    const isProductInCart = user.cart.find(
      (cart) => cart.productId.toString() === id
    );

    if (isProductInCart) {
      const cartUpdated = cart.filter(
        (product) => !product.productId.equals(id)
      );
      user.cart = cartUpdated;
      await user.save();
      return res.send({ message: "Item Cart removed" });
    }

    res.status(404).send({ message: "Item cart not exists" });
  }
}

module.exports = new CartController();
