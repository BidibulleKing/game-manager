/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("games", (table) => {
			table.increments("id").primary();
			table.string("title").notNullable();
			table.string("cover").nullable();
			table.timestamps(true, true);
		})
		.createTable("players", (table) => {
			table.increments("id").primary();
			table.string("tag").notNullable();
			table.string("avatar").nullable();
			table.timestamps(true, true);
		})
		.createTable("game_player", (table) => {
			table
				.integer("game_id")
				.unsigned()
				.references("id")
				.inTable("games")
				.onDelete("CASCADE");
			table
				.integer("player_id")
				.unsigned()
				.references("id")
				.inTable("players")
				.onDelete("CASCADE");
			table.primary(["game_id", "player_id"]);
			table.decimal("rating").notNullable();
			table.float("minutes_spent").notNullable();
			table.timestamp("added_at").defaultTo(knex.fn.now());
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("game_player")
		.dropTableIfExists("players")
		.dropTableIfExists("games");
};
