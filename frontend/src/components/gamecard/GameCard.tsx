import { formatMinutes } from '../../services/timeFormatter';
import Clock from '../icons/Clock';
import Star from '../icons/Star';
import styles from './gamecard.module.css';
import type { GameType } from '../../types/GameType';

interface GameCardProps {
	game: GameType;
	showEditButton?: boolean;
	onEdit?: () => void;
}

export default function GameCard({ game, showEditButton = false, onEdit }: GameCardProps) {
	return (
		<article className={styles.gameCard}>
			<img className={styles.cover} src={game.cover} alt={game.title} />

			<div className={styles.info}>
				<div className={styles.header}>
					<h3 className={styles.title}>{game.title}</h3>
					{showEditButton && onEdit && (
						<button className={styles.editButton} onClick={onEdit} title="Modifier le jeu">
							✎
						</button>
					)}
				</div>

				<div className={styles.scores}>
					<span>
						{formatMinutes(game.minutes_spent)}
						<Clock />
					</span>
					<span>
						{game.rating}/5
						<Star />
					</span>
				</div>
			</div>
		</article>
	);
}