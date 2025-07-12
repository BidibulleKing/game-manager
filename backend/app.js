const express = require("express");
const cors = require("cors");
const {
	errorHandler,
	notFoundHandler,
} = require("./src/middlewares/errorHandler");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
	res.json({ message: "Game Manager Backend is running!" });
});
const gameRoutes = require("./src/routes/games");
const playerRoutes = require("./src/routes/players");
app.use("/api/games", gameRoutes);
app.use("/api/players", playerRoutes);

// Error handling
app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
