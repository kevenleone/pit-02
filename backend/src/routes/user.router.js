const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const router = Router();

router.get("/user", UserController.index);
router.get("/user/:id", UserController.getOne);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.remove);
router.post("/user", UserController.store);
router.post('/auth', UserController.auth)
router.post('/me', UserController.me)

module.exports = router;
