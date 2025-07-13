import { formatMinutes } from '../../services/timeFormatter';
import Clock from '../icons/Clock';
import Star from '../icons/Star';
import styles from './gamecard.module.css';
import type { GameType } from '../../types/GameType';

export default function GameCard({ game }: { game: GameType }) {
	return (
		<article className={styles.gameCard}>
			<img className={styles.cover} src={game.cover} alt={game.title} />

			<div className={styles.info}>
				<h3 className={styles.title}>{game.title}</h3>

				<div className={styles.scores}>
					<span>
						{formatMinutes(game.minutesSpent)}
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