const bookshelf = require("./db.js");

const Game = bookshelf.model("Game", {
	tableName: "games",
	players() {
		return this.belongsToMany(
			"Player",
			"game_player",
			"game_id",
			"player_id"
		);
	},
});

const Player = bookshelf.model("Player", {
	tableName: "players",
	games() {
		return this.belongsToMany(
			"Game",
			"game_player",
			"player_id",
			"game_id"
		);
	},
});

module.exports = {
	Game,
	Player,
};
