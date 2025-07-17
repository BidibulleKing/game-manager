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
const authRoutes = require("./src/routes/auth");
app.use("/api/games", gameRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
