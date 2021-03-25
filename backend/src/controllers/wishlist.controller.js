const UserModel = require("../models/user.model");
const { ProductModel } = require("../models/product.model");

class WishListController {
  async getAllWishList(req, res) {
    const {
      headers: {
        loggedUser: { _id: userId },
      },
    } = req;

    const user = await UserModel.findById(userId).lean();

    const productIds = user.wishlist.map(({ productId }) => productId);

    const products = await ProductModel.find({
      _id: {
        $in: productIds,
      },
    });

    res.send(products);
  }

  async toggleWishlistProduct(req, res) {
    const {
      body,
      headers: {
        loggedUser: { _id: userId },
      },
    } = req;

    const user = await UserModel.findById(userId);

    const { productId } = body;

    const alreadyOnWishList = user.wishlist.find((wish) => {
      return wish.productId.toString() === productId;
    });

    let wishlist = [...user.wishlist];

    if (alreadyOnWishList) {
      wishlist = wishlist.filter(
        (wish) => wish.productId.toString() !== productId
      );
    } else {
      wishlist = [...wishlist, { productId }];
    }

    user.wishlist = wishlist;

    await user.save();

    res.send(user);
  }
}

module.exports = new WishListController();
