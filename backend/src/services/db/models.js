const bookshelf = require("./db.js");

const Game = bookshelf.model("Game", {
	tableName: "games",
	players() {
		return this.belongsToMany("Player");
	},
});

const Player = bookshelf.model("Player", {
	tableName: "players",
	games() {
		return this.belongsToMany("Game");
	},
});

module.exports = {
	Game,
	Player,
};
