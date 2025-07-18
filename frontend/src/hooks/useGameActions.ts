import { useState, useCallback } from 'react';
import { api } from '../services/api';
import type { GameType } from '../types/GameType';

interface UseGameActionsResult {
	loading: boolean;
	error: string | null;
	createGame: (gameData: Omit<GameType, 'id'>) => Promise<GameType | null>;
	updateGame: (id: number | string, gameData: Partial<Omit<GameType, 'id'>>) => Promise<GameType | null>;
	deleteGame: (id: number | string) => Promise<boolean>;
	removeFromLibrary: (id: number | string) => Promise<boolean>;
	getGame: (id: number | string) => Promise<GameType | null>;
}

/**
 * CRUD actions hook for games.
 * 
 * @returns {UseGameActionsResult} An object containing loading state, error message, and CRUD methods for games.
 */
export function useGameActions(): UseGameActionsResult {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createGame = useCallback(async (gameData: Omit<GameType, 'id'>): Promise<GameType | null> => {
		setLoading(true);
		setError(null);

		try {
			const result = await api.games.create(gameData);
			return result;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création du jeu';
			setError(errorMessage);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	const updateGame = useCallback(async (
		id: number | string,
		gameData: Partial<Omit<GameType, 'id'>>
	): Promise<GameType | null> => {
		setLoading(true);
		setError(null);

		try {
			const result = await api.games.update(id, gameData);
			return result;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour du jeu';
			setError(errorMessage);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteGame = useCallback(async (id: number | string): Promise<boolean> => {
		setLoading(true);
		setError(null);

		try {
			await api.games.delete(id);
			return true;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression du jeu';
			setError(errorMessage);
			return false;
		} finally {
			setLoading(false);
		}
	}, []);

	const removeFromLibrary = useCallback(async (id: number | string): Promise<boolean> => {
		setLoading(true);
		setError(null);

		try {
			await api.games.removeFromLibrary(id);

			return true;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression du jeu de la bibliothèque';
			setError(errorMessage);

			return false;
		} finally {
			setLoading(false);
		}
	}, []);

	const getGame = useCallback(async (id: number | string): Promise<GameType | null> => {
		setLoading(true);
		setError(null);

		try {
			const result = await api.games.getById(id);
			return result;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération du jeu';
			setError(errorMessage);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		loading,
		error,
		createGame,
		updateGame,
		deleteGame,
		removeFromLibrary,
		getGame,
	};
}
