import { useEffect, useState } from "react";
import type { GameType } from "../../types/GameType";
import Topbar from "../../components/topbar/Topbar";
import styles from './games.module.css';
import GameCard from "../../components/gamecard/GameCard";
import { gameApi } from "../../services/api";

export default function Games() {
	const [mostPlayed, setMostPlayed] = useState<GameType[]>([]);
	const [bestRated, setBestRated] = useState<GameType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				setLoading(true);
				setError(null);

				const mostPlayedResponse = await gameApi.getAll({
					sortBy: 'minutes_spent',
					limit: 6
				});

				const bestRatedResponse = await gameApi.getAll({
					sortBy: 'rating',
					limit: 6
				});

				setMostPlayed(mostPlayedResponse.data);
				setBestRated(bestRatedResponse.data);
			} catch (err) {
				console.error('Erreur lors du chargement des jeux:', err);
				setError('Impossible de charger les jeux. Veuillez réessayer.');
			} finally {
				setLoading(false);
			}
		};

		fetchGames();
	}, []);

	if (loading) {
		return (
			<>
				<Topbar />
				<div className={styles.loading}>Chargement des jeux...</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Topbar />
				<div className={styles.error}>{error}</div>
			</>
		);
	}

	return (
		<>
			<Topbar />

			<section className={styles.section}>
				<h2>Les plus joués</h2>

				<div className={styles.cardList}>
					{mostPlayed.map((game, index) => (
						<GameCard key={index} game={game} />
					))}
				</div>
			</section>

			<section className={styles.section}>
				<h2>Les mieux notés</h2>

				<div className={styles.cardList}>
					{bestRated.map((game, index) => (
						<GameCard key={index} game={game} />
					))}
				</div>
			</section>
		</>
	);
}