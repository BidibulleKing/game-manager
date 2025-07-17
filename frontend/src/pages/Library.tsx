import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { GameType } from "../types/GameType";
import Topbar from "../components/topbar/Topbar";
import styles from './Library.module.css';
import GameCard from "../components/gamecard/GameCard";
import { gameApi } from "../services/api";
import AuthModal from "../components/auth/AuthModal";

export default function Library() {
	const { isAuthenticated, loading: authLoading } = useAuth();
	const [mostPlayed, setMostPlayed] = useState<GameType[]>([]);
	const [bestRated, setBestRated] = useState<GameType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showAuthModal, setShowAuthModal] = useState(false);

	useEffect(() => {
		if (!isAuthenticated || authLoading) return;

		const fetchUserGames = async () => {
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
				console.error('Erreur lors du chargement de la bibliothèque:', err);
				setError('Impossible de charger votre bibliothèque. Veuillez réessayer.');
			} finally {
				setLoading(false);
			}
		};

		fetchUserGames();
	}, [isAuthenticated, authLoading]);

	const handleAddGame = () => {
		console.log('Ajout de jeu demandé');
		alert('Fonctionnalité d\'ajout de jeu à implémenter');
	};

	if (authLoading) {
		return (
			<>
				<Topbar />
				<div className={styles.loading}>Chargement...</div>
			</>
		);
	}

	if (!isAuthenticated) {
		return (
			<>
				<Topbar />
				<div className={styles.authSection}>
					<h2>Connexion requise</h2>
					<p>Vous devez être connecté pour accéder à votre bibliothèque de jeux.</p>
					<button className={styles.mainButton} onClick={() => setShowAuthModal(true)}>
						Se connecter
					</button>
				</div>
				<AuthModal
					isOpen={showAuthModal}
					onClose={() => setShowAuthModal(false)}
				/>
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