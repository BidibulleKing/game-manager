import PlayerCard from "../../components/playercard/PlayerCard";
import type { PlayerType } from "../../types/PlayerType";
import Topbar from "../../components/topbar/Topbar";
import styles from './players.module.css';

export default function Players() {
	const players: PlayerType[] = [
		{
			tag: "Player1",
			avatar: "https://sm.ign.com/t/ign_fr/cover/a/avatar-gen/avatar-generations_bssq.600.jpg",
			minutesSpent: 1200
		},
		{
			tag: "Player2",
			avatar: "https://sm.ign.com/t/ign_fr/cover/a/avatar-gen/avatar-generations_bssq.600.jpg",
			minutesSpent: 800
		}
	];

	return (
		<>
			<Topbar />

			<section>
				<ul className={styles.playerList}>
					{players.map((player) => (
						<li key={player.tag}>
							<PlayerCard card={player} />
						</li>
					))}
				</ul>
			</section>
		</>
	);
}