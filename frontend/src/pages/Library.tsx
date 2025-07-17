import { useEffect, useState } from "react";
import type { GameType } from "../types/GameType";
import Topbar from "../components/topbar/Topbar";
import styles from './Library.module.css';
import GameCard from "../components/gamecard/GameCard";
import { gameApi } from "../services/api";

export default function Library() {
	const [mostPlayed, setMostPlayed] = useState<GameType[]>([]);
	const [bestRated, setBestRated] = useState<GameType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Simulation d'authentification - pour le moment, toujours false
	// TODO: Implémenter un vrai système d'authentification
	useEffect(() => {
		// Simulation d'une vérification d'authentification
		const checkAuth = () => {
			// Pour le moment, on considère que l'utilisateur n'est pas authentifié
			setIsAuthenticated(false);
		};
		checkAuth();
	}, []);

	useEffect(() => {
		if (!isAuthenticated) return;

		const fetchUserGames = async () => {
			try {
				setLoading(true);
				setError(null);

				// TODO: Remplacer par des appels API spécifiques à la bibliothèque utilisateur
				// Pour le moment, on utilise les mêmes endpoints que la page Games
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
				console.error('Erreur lors du chargement de la bibliothèque:', err);
				setError('Impossible de charger votre bibliothèque. Veuillez réessayer.');
			} finally {
				setLoading(false);
			}
		};

		fetchUserGames();
	}, [isAuthenticated]);

	const handleLogin = () => {
		// TODO: Implémenter la logique de connexion
		console.log('Connexion demandée');
		// Pour le moment, on simule une connexion réussie
		setIsAuthenticated(true);
	};

	const handleAddGame = () => {
		// TODO: Implémenter la logique d'ajout de jeu
		console.log('Ajout de jeu demandé');
		alert('Fonctionnalité d\'ajout de jeu à implémenter');
	};

	// Si l'utilisateur n'est pas authentifié, afficher l'écran de connexion
	if (!isAuthenticated) {
		return (
			<>
				<Topbar />
				<div className={styles.authSection}>
					<h2>Connexion requise</h2>
					<p>Vous devez être connecté pour accéder à votre bibliothèque de jeux.</p>
					<button className={styles.mainButton} onClick={handleLogin}>
						Se connecter
					</button>
				</div>
			</>
		);
	}

	if (loading) {
		return (
			<>
				<Topbar />
				<div className={styles.loading}>Chargement de votre bibliothèque...</div>
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
			<Topbar>
				<button className={styles.mainButton} onClick={handleAddGame}>
					+ Ajouter un jeu
				</button>
			</Topbar>


			<section className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2>Mes jeux les plus joués</h2>
				</div>

				<div className={styles.cardList}>
					{mostPlayed.map((game, index) => (
						<GameCard
							key={index}
							game={game}
							showEditButton={true}
							onEdit={() => {
								// TODO: Implémenter la logique d'édition
								console.log('Édition du jeu:', game.title);
								alert(`Édition du jeu "${game.title}" à implémenter`);
							}}
						/>
					))}
				</div>
			</section>

			<section className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2>Mes jeux les mieux notés</h2>
				</div>

				<div className={styles.cardList}>
					{bestRated.map((game, index) => (
						<GameCard
							key={index}
							game={game}
							showEditButton={true}
							onEdit={() => {
								// TODO: Implémenter la logique d'édition
								console.log('Édition du jeu:', game.title);
								alert(`Édition du jeu "${game.title}" à implémenter`);
							}}
						/>
					))}
				</div>
			</section>
		</>
	);
}