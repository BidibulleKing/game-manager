import { useEffect, useState } from 'react';
import ResultsPage from '../results/ResultsPage';
import { playerApi } from '../../services/api';
import type { PlayerType } from '../../types/PlayerType';

export default function PlayerProfile() {
	const [player, setPlayer] = useState<PlayerType | null>(null);
	const playerId = window.location.pathname.split('/').pop();

	useEffect(() => {
		if (playerId) {
			playerApi.getById(playerId).then(setPlayer).catch(() => setPlayer(null));
		}
	}, [playerId]);

	const title = player ? `Jeux de ${player.tag}` : 'Jeux du joueur';

	return <ResultsPage type="player-games" title={title} />;
}
