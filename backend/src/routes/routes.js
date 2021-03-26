const express = require("express");

const UserRouter = require("./user.router");
const WishListRouter = require("./wishlist.router");
const ProductRouter = require("./product.router");
const CartRouter = require("./cart.route");

const Router = express.Router();

Router.use(UserRouter);
Router.use(CartRouter);
Router.use(WishListRouter);
Router.use(ProductRouter);

module.exports = Router;
