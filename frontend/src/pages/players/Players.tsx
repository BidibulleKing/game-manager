import { useEffect, useState } from "react";
import PlayerCard from "../../components/playercard/PlayerCard";
import type { PlayerType } from "../../types/PlayerType";
import Topbar from "../../components/topbar/Topbar";
import styles from './players.module.css';
import { playerApi } from "../../services/api";

export default function Players() {
	const [players, setPlayers] = useState<PlayerType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPlayers = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await playerApi.getAll({
					sortBy: 'minutes_spent',
					limit: 20
				});

				setPlayers(response.data);
			} catch (err) {
				console.error('Erreur lors du chargement des joueurs:', err);
				setError('Impossible de charger les joueurs. Veuillez réessayer.');
			} finally {
				setLoading(false);
			}
		};

		fetchPlayers();
	}, []);

	if (loading) {
		return (
			<>
				<Topbar />
				<div className="loading-container">Chargement des joueurs...</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Topbar />
				<div className="error-container">{error}</div>
			</>
		);
	}

	return (
		<>
			<Topbar />

			<section className={styles.section}>
				<h1 className={styles.title}>Les plus grands joueurs</h1>

				<ul className={styles.playerList}>
					{players.map((player) => (
						<li key={player.tag}>
							<PlayerCard card={player} />
						</li>
					))}
				</ul>
			</section>
		</>
	);
}