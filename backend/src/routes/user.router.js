const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const router = Router();

router.get("/user", UserController.index);

module.exports = router;
