const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.get("/", playerController.findAll);
router.get("/:id", playerController.findById);

router.post("/", playerController.create);

router.put("/:id", playerController.update);

router.delete("/:id", playerController.delete);

module.exports = router;
