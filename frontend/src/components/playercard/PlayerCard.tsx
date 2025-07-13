import Clock from "../icons/Clock";
import type { PlayerCardType } from "./PlayerCardType";
import styles from './playercard.module.css';

export default function PlayerCard({ card }: { card: PlayerCardType }) {
	return (
		<article className={styles.playerCard}>
			<img className={styles.avatar} src={card.avatar} alt={`${card.tag}'s avatar`} />

			<div className={styles.info}>
				<h3 className={styles.tag}>{card.tag}</h3>

				<span>{card.minutesSpent} <Clock /></span>
			</div>
		</article>
	);
}