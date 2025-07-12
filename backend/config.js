require("dotenv").config();

module.exports = {
	port: process.env.BACKEND_PORT || 8000,
	databaseUrl: process.env.DATABASE_URL,
	nodeEnv: process.env.BACKEND_ENV || "development",
};
