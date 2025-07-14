/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("games").del();
	await knex("games").insert([
		{
			id: 1,
			title: "The Witcher 3: Wild Hunt",
			cover: "https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/fcaa0ba91e2368e2aef8c0d556692307768fad49-1920x1080.jpg",
		},
		{
			id: 2,
			title: "Blue Prince",
			cover: "https://gaming-cdn.com/images/products/18776/orig/blue-prince-pc-steam-cover.jpg?v=1750336441",
		},
		{
			id: 3,
			title: "Tomb Raider",
			cover: "https://i.imgur.com/eOtEAB7.jpg",
		},
		{
			id: 4,
			title: "Cyberpunk 2077",
			cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?t=1693526400",
		},
		{
			id: 5,
			title: "Hades",
			cover: "https://cdn1.epicgames.com/min/offer/1200x1600-1200x1600-e92fa6b99bb20c9edee19c361b8853b9.jpg",
		},
		{
			id: 6,
			title: "Stardew Valley",
			cover: "https://stardewvalleywiki.com/mediawiki/images/7/75/Soundtrack_Album_Cover.png",
		},
		{
			id: 7,
			title: "Hollow Knight",
			cover: "https://cdn.wikimg.net/en/hkwiki/images/e/e6/Hollow_Knight_VoidHeart_Edition_Xbox_One_Front_Cover.jpg",
		},
		{
			id: 8,
			title: "Celeste",
			cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Celeste_box_art_cropped.png/1200px-Celeste_box_art_cropped.png",
		},
		{
			id: 9,
			title: "Undertale",
			cover: "https://e.snmc.io/lk/l/x/16ff906ed589772893da8602a02651a6/10965847",
		},
		{
			id: 10,
			title: "Red Dead Redemption",
			cover: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/03/Red-Dead-Cover-John-Marston.jpg",
		},
	]);
};
