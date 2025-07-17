const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", playerController.findAll);
router.get("/:id", playerController.findById);

router.post("/", authMiddleware, playerController.create);

router.put("/:id", authMiddleware, playerController.update);

router.delete("/:id", authMiddleware, playerController.delete);

module.exports = router;
