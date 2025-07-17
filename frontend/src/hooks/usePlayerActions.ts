import { useState, useCallback } from 'react';
import { api } from '../services/api';
import type { PlayerType } from '../types/PlayerType';

interface UsePlayerActionsResult {
	loading: boolean;
	error: string | null;
	createPlayer: (playerData: Omit<PlayerType, 'id'>) => Promise<PlayerType | null>;
	updatePlayer: (id: number | string, playerData: Partial<Omit<PlayerType, 'id'>>) => Promise<PlayerType | null>;
	deletePlayer: (id: number | string) => Promise<boolean>;
	getPlayer: (id: number | string) => Promise<PlayerType | null>;
}

/**
 * CRUD actions hook for players.
 * 
 * @returns {UsePlayerActionsResult} An object containing loading state, error message, and CRUD methods for players.
 */
export function usePlayerActions(): UsePlayerActionsResult {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createPlayer = useCallback(async (playerData: Omit<PlayerType, 'id'>): Promise<PlayerType | null> => {
		setLoading(true);
		setError(null);

		try {
			const result = await api.players.create(playerData);
			return result;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création du joueur';
			setError(errorMessage);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	const updatePlayer = useCallback(async (
		id: number | string,
		playerData: Partial<Omit<PlayerType, 'id'>>
	): Promise<PlayerType | null> => {
		setLoading(true);
		setError(null);

		try {
			const result = await api.players.update(id, playerData);
			return result;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour du joueur';
			setError(errorMessage);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	const deletePlayer = useCallback(async (id: number | string): Promise<boolean> => {
		setLoading(true);
		setError(null);

		try {
			await api.players.delete(id);
			return true;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression du joueur';
			setError(errorMessage);
			return false;
		} finally {
			setLoading(false);
		}
	}, []);

	const getPlayer = useCallback(async (id: number | string): Promise<PlayerType | null> => {
		setLoading(true);
		setError(null);

		try {
			const result = await api.players.getById(id);
			return result;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération du joueur';
			setError(errorMessage);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		loading,
		error,
		createPlayer,
		updatePlayer,
		deletePlayer,
		getPlayer,
	};
}
