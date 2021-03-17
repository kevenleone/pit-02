const { Router } = require("express");

const CarController = require("../controllers/car.controller");

const router = Router();

router.get("/car", CarController.index);
router.get("/car/:id", CarController.getOne);
router.put("/car/:id", CarController.update);
router.delete("/car/:id", CarController.remove);
router.post("/car", CarController.store);

module.exports = router;
