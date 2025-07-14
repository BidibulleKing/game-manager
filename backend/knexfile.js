require("dotenv").config();

module.exports = {
	development: {
		client: "mysql",
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: "./src/services/db/migrations",
			tableName: "knex_migrations",
		},
		seeds: {
			directory: "./src/services/db/seeds",
		},
	},
};
