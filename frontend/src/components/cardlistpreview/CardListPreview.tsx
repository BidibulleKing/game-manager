import GameCard from "../gamecard/GameCard";
import type { GameCardType } from "../gamecard/GameCardType";
import styles from "./cardlistpreview.module.css";

export default function CardListPreview({ cards }: { cards: GameCardType[] }) {
	return (
		<div className={styles.cardList}>
			{cards.map((card, index) => (
				<GameCard key={index} card={card} />
			))}
		</div>
	);
}