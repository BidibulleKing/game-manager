const Player = require("../services/db/models").Player;

class PlayerRepository {
	async findAll() {
		return await Player.fetchAll();
	}

	async filter(queryParams) {
		const {
			search,
			page = 1,
			limit = 10,
			sortBy = "minutes_spent",
			sortOrder = "desc",
		} = queryParams;

		let query = Player.query((qb) => {
			qb.leftJoin("game_player", "players.id", "game_player.player_id")
				.select("players.*")
				.select("game_player.minutes_spent")
				.select("game_player.added_at");

			if (search) {
				qb.where("tag", "like", `%${search}%`);
			}

			qb.groupBy("players.id");

			// Apply sorting
			if (sortBy === "minutes_spent") {
				qb.orderByRaw(
					`COALESCE(game_player.minutes_spent, 0) ${sortOrder}`
				);
			} else {
				qb.orderBy(sortBy, sortOrder);
			}

			// Pagination
			const offset = (page - 1) * limit;
			qb.limit(limit).offset(offset);
		});

		const players = await query.fetchAll();

		const totalQuery = Player.query((qb) => {
			if (search) {
				qb.where("tag", "like", `%${search}%`);
			}
		});
		const total = await totalQuery.count();

		return {
			players,
			pagination: {
				page: parseInt(page),
				limit: parseInt(limit),
				total: parseInt(total),
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	async findById(id) {
		return await Player.where({ id }).fetch();
	}

	async findByTag(tag) {
		return await Player.where({ tag }).fetch();
	}

	async create(playerData) {
		return await Player.forge(playerData).save();
	}

	async update(id, playerData) {
		const player = await this.findById(id);
		if (!player) {
			return null;
		}
		return await player.save(playerData);
	}

	async delete(id) {
		const player = await this.findById(id);
		if (!player) {
			return false;
		}
		await player.destroy();
		return true;
	}
}

module.exports = new PlayerRepository();
