const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.get("/", gameController.findAll);
router.get("/:id", gameController.findById);

router.post("/", gameController.create);

router.put("/:id", gameController.update);

router.delete("/:id", gameController.delete);

module.exports = router;
