import Clock from "../icons/Clock";
import type { PlayerType } from "../../types/PlayerType";
import styles from './playercard.module.css';
import { formatMinutes } from "../../services/timeFormatter.ts";
import { useLocation } from "wouter";

export default function PlayerCard({ card }: { card: PlayerType }) {
	const [, setLocation] = useLocation();

	const handleClick = () => {
		setLocation(`/players/${card.id}`);
	};

	return (
		<article className={styles.playerCard} onClick={handleClick} style={{ cursor: 'pointer' }}>
			<img className={styles.avatar} src={card.avatar} alt={`${card.tag}'s avatar`} />

			<div className={styles.info}>
				<h3 className={styles.tag}>{card.tag}</h3>

				<span className={styles.scores}>
					{formatMinutes(card.minutes_spent)} <Clock />
				</span>
			</div>
		</article>
	);
}