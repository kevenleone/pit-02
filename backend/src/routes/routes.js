const express = require("express");

const TodoRouter = require("./todo.router");
const UserRouter = require("./user.router");

const Router = express.Router();

Router.use(TodoRouter);
Router.use(UserRouter);

module.exports = Router;
