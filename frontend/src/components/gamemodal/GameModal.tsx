import { useState } from 'react';
import { useGameActions } from '../../hooks/useGameActions';
import type { GameType } from '../../types/GameType';
import styles from './gameModal.module.css';

interface GameModalProps {
	isOpen: boolean;
	onClose: () => void;
	onGameAdded?: (game: GameType) => void;
}

export default function GameModal({ isOpen, onClose, onGameAdded }: GameModalProps) {
	const [formData, setFormData] = useState({
		title: '',
		cover: '',
		rating: '',
		minutes_spent: '',
	});
	const [error, setError] = useState('');

	const { createGame, loading } = useGameActions();

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!formData.title.trim() || !formData.cover.trim()) {
			setError('Le titre et la cover sont requis');
			return;
		}

		try {
			const gameData = {
				title: formData.title.trim(),
				cover: formData.cover.trim(),
				rating: formData.rating ? parseFloat(formData.rating) : 0,
				minutes_spent: formData.minutes_spent ? parseInt(formData.minutes_spent) : 0,
			};

			const newGame = await createGame(gameData);
			if (newGame) {
				onGameAdded?.(newGame);
				setFormData({ title: '', cover: '', rating: '', minutes_spent: '' });
				onClose();
			}
		} catch {
			setError('Erreur lors de l\'ajout du jeu');
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<h2>Ajouter un jeu</h2>
					<button className={styles.closeBtn} onClick={onClose}>×</button>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.field}>
						<label>Titre *</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
							disabled={loading}
							placeholder="Nom du jeu"
						/>
					</div>

					<div className={styles.field}>
						<label>Cover (URL) *</label>
						<input
							type="url"
							name="cover"
							value={formData.cover}
							onChange={handleChange}
							required
							disabled={loading}
							placeholder="https://example.com/cover.jpg"
						/>
					</div>

					<div className={styles.field}>
						<label>Note</label>
						<input
							type="number"
							name="rating"
							value={formData.rating}
							onChange={handleChange}
							disabled={loading}
							min="0"
							max="5"
							step="0.1"
							placeholder="0.0 - 5.0"
						/>
					</div>

					<div className={styles.field}>
						<label>Temps joué (minutes)</label>
						<input
							type="number"
							name="minutes_spent"
							value={formData.minutes_spent}
							onChange={handleChange}
							disabled={loading}
							min="0"
							placeholder="0"
						/>
					</div>

					{error && <div className={styles.error}>{error}</div>}

					<button type="submit" disabled={loading} className={styles.submitBtn}>
						{loading ? 'Ajout...' : 'Ajouter le jeu'}
					</button>
				</form>
			</div>
		</div>
	);
}
