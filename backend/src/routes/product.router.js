const { Router } = require("express");

const ProductController = require("../controllers/product.controller");

const router = Router();

router.get("/product", ProductController.index);
router.post("/product", ProductController.store);

module.exports = router;
