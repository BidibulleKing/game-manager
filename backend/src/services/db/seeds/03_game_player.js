/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("game_player").del();
	await knex("game_player").insert([
		{ game_id: 1, player_id: 1, rating: 4.5, minutes_spent: 120 },
		{ game_id: 2, player_id: 2, rating: 5, minutes_spent: 200 },
		{ game_id: 3, player_id: 1, rating: 4, minutes_spent: 150 },
		{ game_id: 4, player_id: 2, rating: 3.5, minutes_spent: 180 },
		{ game_id: 5, player_id: 1, rating: 4.8, minutes_spent: 300 },
		{ game_id: 6, player_id: 2, rating: 4.2, minutes_spent: 250 },
		{ game_id: 7, player_id: 1, rating: 4.9, minutes_spent: 400 },
		{ game_id: 8, player_id: 2, rating: 5, minutes_spent: 350 },
		{ game_id: 9, player_id: 1, rating: 4.3, minutes_spent: 220 },
		{ game_id: 10, player_id: 2, rating: 4.6, minutes_spent: 270 },
	]);
};
