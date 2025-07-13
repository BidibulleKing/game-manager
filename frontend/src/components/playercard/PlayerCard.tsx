import Clock from "../icons/Clock";
import type { PlayerType } from "../../types/PlayerType";
import styles from './playercard.module.css';

export default function PlayerCard({ card }: { card: PlayerType }) {
	return (
		<article className={styles.playerCard}>
			<img className={styles.avatar} src={card.avatar} alt={`${card.tag}'s avatar`} />

			<div className={styles.info}>
				<h3 className={styles.tag}>{card.tag}</h3>

				<span className={styles.scores}>
					{card.minutesSpent} <Clock />
				</span>
			</div>
		</article>
	);
}