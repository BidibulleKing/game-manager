import Tag from '../tag/Tag';
import styles from './gamecard.module.css';
import type { GameCardType } from './GameCardType';

export default function GameCard({ card }: { card: GameCardType }) {
	const { title, cover, tag } = card;

	return (
		<article className={styles.gameCard}>
			<img className={styles.cover} src={cover} alt={title} />

			<div className={styles.info}>
				<h3 className={`${styles.title} font-title`}>{title}</h3>

				<Tag tag={tag} />
			</div>
		</article>
	);
}