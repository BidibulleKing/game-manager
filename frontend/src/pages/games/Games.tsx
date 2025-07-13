import CardListPreview from "../../components/cardlistpreview/CardListPreview";
import type { GameType } from "../../types/GameType";
import Topbar from "../../components/topbar/Topbar";
import styles from './games.module.css';

export default function Games() {
	// TODO: Fetch games from the API
	const mostPlayed: GameType[] = [
		{
			title: "Cyberpunk 2077",
			cover: "https://static.wikia.nocookie.net/g-c-a/images/0/0b/Cover-art-6.jpg",
			rating: 3.7,
			minutesSpent: 10000
		},
		{
			title: "The Sims 3",
			cover: "https://upload.wikimedia.org/wikipedia/en/6/6f/Sims3cover.jpg",
			rating: 4.5,
			minutesSpent: 8000
		}
	];
	const bestRated: GameType[] = [
		{
			title: "The Witcher 3",
			cover: "https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/fcaa0ba91e2368e2aef8c0d556692307768fad49-1920x1080.jpg",
			rating: 4.9,
			minutesSpent: 5000
		},
		{
			title: "Blue Prince",
			cover: "https://xboxwire.thesourcemediaassets.com/sites/2/2025/02/Hero-51d60586bd954886bee2-1024x576.jpg",
			rating: 5,
			minutesSpent: 3000
		}
	];

	return (
		<>
			<Topbar />

			<section className={styles.section}>
				<h2>Les plus joués</h2>
				<CardListPreview games={mostPlayed} />
			</section>

			<section className={styles.section}>
				<h2>Les mieux notés</h2>
				<CardListPreview games={bestRated} />
			</section>
		</>
	);
}