import { useState, useEffect, useCallback } from 'react';
import { getDataByType } from '../services/api';
import type { SearchResultType, SearchParams } from '../types/SearchResultType';
import type { GameType } from '../types/GameType';
import type { PlayerType } from '../types/PlayerType';

interface UseSearchResult<T> {
	data: SearchResultType<T> | null;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useSearch<T extends GameType | PlayerType>(
	type: 'games' | 'players',
	params: SearchParams,
	isUserSpecific: boolean = false,
	playerId?: string
): UseSearchResult<T> {
	const [data, setData] = useState<SearchResultType<T> | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const result = await getDataByType<T>(type, params, isUserSpecific, playerId);
			setData(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Une erreur est survenue');
		} finally {
			setLoading(false);
		}
	}, [type, params, isUserSpecific, playerId]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		data,
		loading,
		error,
		refetch: fetchData
	};
}
