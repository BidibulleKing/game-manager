const GameRepository = require("../repositories/gameRepository");

const gameController = {
	findAll: async (req, res) => {
		try {
			if (Object.keys(req.query).length > 0) {
				const queryParams = {
					search: req.query.search,
					page: req.query.page || 1,
					limit: req.query.limit || 10,
					sortBy: req.query.sortBy || "rating",
					sortOrder: req.query.sortOrder || "desc",
				};
				const result = await GameRepository.filter(queryParams);

				const formattedResult = {
					data: result.games.models || result.games,
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
				const result = await GameRepository.findAll();
				const games = result.models || result;
				res.json({
					data: games,
					pagination: {
						currentPage: 1,
						totalPages: 1,
						totalItems: games.length,
						itemsPerPage: games.length,
						hasNext: false,
						hasPrevious: false,
					},
				});
			}
		} catch (error) {
			res.json({ error: error.message });
			// res.status(500).json({ error: "Failed to fetch games" });
		}
	},

	findById: async (req, res) => {
		const { id } = req.params;
		try {
			const game = await GameRepository.findById(id);
			if (game) {
				res.json(game);
			} else {
				res.status(404).json({ error: "Game not found" });
			}
		} catch (error) {
			res.json({ error: error.message });
			// res.status(500).json({ error: "Failed to fetch game" });
		}
	},

	create: async (req, res) => {
		const { title, cover } = req.body;
		try {
			const newGame = await GameRepository.create({
				title,
				cover,
			});
			if (!newGame) {
				return res.status(400).json({ error: "Failed to create game" });
			}
			res.status(201).json(newGame);
		} catch (error) {
			res.status(500).json({ error: "Failed to create game" });
		}
	},

	update: async (req, res) => {
		const { id } = req.params;
		const { title, cover } = req.body;
		try {
			const updatedGame = await GameRepository.update(id, {
				title,
				cover,
			});
			if (updatedGame) {
				res.json(updatedGame);
			} else {
				res.status(404).json({ error: "Game not found" });
			}
		} catch (error) {
			res.status(500).json({ error: "Failed to update game" });
		}
	},

	delete: async (req, res) => {
		const { id } = req.params;
		try {
			const deleted = await GameRepository.delete(id);
			if (deleted) {
				res.status(204).send();
			} else {
				res.status(404).json({ error: "Game not found" });
			}
		} catch (error) {
			res.status(500).json({ error: "Failed to delete game" });
		}
	},
};

module.exports = gameController;
