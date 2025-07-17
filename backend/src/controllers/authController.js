const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const playerRepository = require("../repositories/playerRepository");

const authController = {
	login: async (req, res) => {
		const { tag, password } = req.body;
		try {
			const player = await playerRepository.findByTag(tag);
			if (!player)
				return res.status(401).json({ error: "invalid credentials" });

			const valid = await bcrypt.compare(
				password,
				player.get("password")
			);
			if (!valid)
				return res.status(401).json({ error: "invalid credentials" });

			const token = jwt.sign(
				{ id: player.get("id"), tag: player.get("tag") },
				process.env.JWT_SECRET,
				{ expiresIn: "7d" }
			);
			res.json({ token });
		} catch (error) {
			res.status(500).json({ error: "Login failed" });
		}
	},

	register: async (req, res) => {
		const { tag, password, avatar } = req.body;
		try {
			const existingPlayer = await playerRepository.findByTag(tag);
			if (existingPlayer) {
				return res.status(400).json({ error: "Player already exists" });
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			const newPlayer = await playerRepository.create({
				tag,
				password: hashedPassword,
				avatar,
			});

			if (!newPlayer) {
				return res
					.status(400)
					.json({ error: "Failed to create player" });
			}

			res.status(201).json(newPlayer);
		} catch (error) {
			res.status(500).json({ error: "Registration failed" });
		}
	},
};

module.exports = authController;
