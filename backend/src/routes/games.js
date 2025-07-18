const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", gameController.findAll);
router.get("/my-games", authMiddleware, gameController.findUserGames);
router.get("/player/:playerId", gameController.findPlayerGames);
router.get("/:id", gameController.findById);

router.post("/", authMiddleware, gameController.create);

router.put("/:id", authMiddleware, gameController.update);

router.delete(
	"/:id/remove-from-library",
	authMiddleware,
	gameController.removeFromUserLibrary
);
router.delete("/:id", authMiddleware, gameController.delete);

module.exports = router;
