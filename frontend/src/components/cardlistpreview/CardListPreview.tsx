import type { GameType } from "../../types/GameType";
import GameCard from "../gamecard/GameCard";
import styles from "./cardlistpreview.module.css";

export default function CardListPreview({ games }: { games: GameType[] }) {
	return (
		<div className={styles.cardList}>
			{games.map((game, index) => (
				<GameCard key={index} game={game} />
			))}
		</div>
	);
}