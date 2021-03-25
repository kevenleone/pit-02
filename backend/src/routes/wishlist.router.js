const { Router } = require("express");

const WishListController = require("../controllers/wishlist.controller");

const router = Router();

router.get("/wishlist", WishListController.getAllWishList);
router.post("/wishlist", WishListController.toggleWishlistProduct);

module.exports = router;
