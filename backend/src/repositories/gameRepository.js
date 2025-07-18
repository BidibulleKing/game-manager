const Game = require("../services/db/models").Game;

class GameRepository {
	async findAll() {
		return await Game.fetchAll();
	}

	async filter(queryParams) {
		const {
			search,
			page = 1,
			limit = 10,
			sortBy = "rating",
			sortOrder = "desc",
			playerId,
		} = queryParams;

		let query = Game.query((qb) => {
			if (playerId) {
				qb.innerJoin("game_player", "games.id", "game_player.game_id")
					.select("games.*")
					.select("game_player.rating")
					.select("game_player.minutes_spent")
					.select("game_player.added_at")
					.where("game_player.player_id", playerId);
			} else {
				qb.leftJoin("game_player", "games.id", "game_player.game_id")
					.select("games.*")
					.select("game_player.rating")
					.select("game_player.minutes_spent")
					.select("game_player.added_at");
			}

			if (search) {
				qb.where("title", "like", `%${search}%`);
			}

			qb.groupBy("games.id");

			if (sortBy === "rating") {
				qb.orderByRaw(`COALESCE(game_player.rating, 0) ${sortOrder}`);
			} else if (sortBy === "minutes_spent") {
				qb.orderByRaw(
					`COALESCE(game_player.minutes_spent, 0) ${sortOrder}`
				);
			} else {
				qb.orderBy(sortBy, sortOrder);
			}

			const offset = (page - 1) * limit;
			qb.limit(limit).offset(offset);
		});

		const games = await query.fetchAll();

		const totalQuery = Game.query((qb) => {
			qb.leftJoin("game_player", "games.id", "game_player.game_id");

			if (playerId) {
				qb.where("game_player.player_id", playerId);
			}

			if (search) {
				qb.where("title", "like", `%${search}%`);
			}
		});
		const total = await totalQuery.count();

		return {
			games,
			pagination: {
				page: parseInt(page),
				limit: parseInt(limit),
				total: parseInt(total),
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	async findById(id) {
		return await Game.where({ id }).fetch();
	}

	async create(gameData) {
		return await Game.forge(gameData).save();
	}

	async update(id, gameData) {
		const game = await this.findById(id);
		if (!game) {
			return null;
		}
		return await game.save(gameData);
	}

	async delete(id) {
		const game = await this.findById(id);
		if (!game) {
			return false;
		}
		await game.destroy();
		return true;
	}
}

module.exports = new GameRepository();
