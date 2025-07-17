import { useEffect, useState } from 'react';
import ResultsPage from '../results/ResultsPage';
import type { SearchParams } from '../../types/SearchResultType';

export default function PlayerResults() {
	const [initialParams, setInitialParams] = useState<SearchParams>({});

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		const params: SearchParams = {
			search: urlParams.get('search') || undefined,
			page: parseInt(urlParams.get('page') || '1'),
			limit: parseInt(urlParams.get('limit') || '12'),
			sortBy: urlParams.get('sortBy') || 'minutes_spent',
		};

		setInitialParams(params);
	}, []);

	return (
		<ResultsPage
			type="players"
			title="Recherche de joueurs"
			initialParams={initialParams}
		/>
	);
}
