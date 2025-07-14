/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("players").del();
	await knex("players").insert([
		{
			id: 1,
			tag: "TheGuy",
			avatar: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg",
		},
		{
			id: 2,
			tag: "TheGirl",
			avatar: "https://img.freepik.com/premium-vector/cute-woman-avatar-profile-vector-illustration_1058532-14592.jpg",
		},
	]);
};
