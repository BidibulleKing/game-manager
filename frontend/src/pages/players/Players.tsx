import PlayerCard from "../../components/playercard/PlayerCard";
import type { PlayerType } from "../../types/PlayerType";
import Topbar from "../../components/topbar/Topbar";

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
				{players.map((player) => (
					<PlayerCard key={player.tag} card={player} />
				))}
			</section>
		</>
	);
}