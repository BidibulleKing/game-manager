const PlayerRepository = require("../repositories/playerRepository");

const playerController = {
	findAll: async (req, res) => {
		try {
			if (Object.keys(req.query).length > 0) {
				const queryParams = {
					search: req.query.search,
					page: req.query.page || 1,
					limit: req.query.limit || 10,
					sortBy: req.query.sortBy || "minutes_spent",
					sortOrder: req.query.sortOrder || "desc",
				};
				const result = await PlayerRepository.filter(queryParams);

				const formattedResult = {
					data: result.players.models || result.players,
					pagination: {
						currentPage: parseInt(result.pagination.page),
						totalPages: result.pagination.totalPages,
						totalItems: result.pagination.total,
						itemsPerPage: parseInt(result.pagination.limit),
						hasNext:
							parseInt(result.pagination.page) <
							result.pagination.totalPages,
						hasPrevious: parseInt(result.pagination.page) > 1,
					},
				};

				res.json(formattedResult);
			} else {
				const result = await PlayerRepository.findAll();
				const players = result.models || result;
				res.json({
					data: players,
					pagination: {
						currentPage: 1,
						totalPages: 1,
						totalItems: players.length,
						itemsPerPage: players.length,
						hasNext: false,
						hasPrevious: false,
					},
				});
			}
		} catch (error) {
			res.json({ error: error.message });
			// res.status(500).json({ error: "Failed to fetch players" });
		}
	},

	findById: async (req, res) => {
		const { id } = req.params;
		try {
			const player = await PlayerRepository.findById(id);
			if (player) {
				res.json(player);
			} else {
				res.status(404).json({ error: "Player not found" });
			}
		} catch (error) {
			res.json({ error: error.message });
			// res.status(500).json({ error: "Failed to fetch player" });
		}
	},

	create: async (req, res) => {
		const { tag, avatar } = req.body;
		try {
			const newPlayer = await PlayerRepository.create({
				tag,
				avatar,
			});
			if (!newPlayer) {
				return res
					.status(400)
					.json({ error: "Failed to create player" });
			}
			res.status(201).json(newPlayer);
		} catch (error) {
			res.status(500).json({ error: "Failed to create player" });
		}
	},

	update: async (req, res) => {
		const { id } = req.params;
		const { tag, avatar } = req.body;
		try {
			const updatedPlayer = await PlayerRepository.update(id, {
				tag,
				avatar,
			});
			if (updatedPlayer) {
				res.json(updatedPlayer);
			} else {
				res.status(404).json({ error: "Player not found" });
			}
		} catch (error) {
			res.status(500).json({ error: "Failed to update player" });
		}
	},

	delete: async (req, res) => {
		const { id } = req.params;
		try {
			const deleted = await PlayerRepository.delete(id);
			if (deleted) {
				res.status(204).send();
			} else {
				res.status(404).json({ error: "Player not found" });
			}
		} catch (error) {
			res.status(500).json({ error: "Failed to delete player" });
		}
	},
};

module.exports = playerController;
