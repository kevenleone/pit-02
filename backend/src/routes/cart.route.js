const { Router } = require("express");

const CartController = require("../controllers/cart.controller");

const router = Router();

router.get("/cart", CartController.getAllCart);
router.post("/cart", CartController.saveProductToCart);
router.delete("/cart/:id", CartController.removeProductCart);

module.exports = router;
