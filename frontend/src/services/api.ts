import { API_CONFIG, getApiUrl, getHeaders } from '../config/api';
import type { SearchResultType, SearchParams } from '../types/SearchResultType';
import type { GameType } from '../types/GameType';
import type { PlayerType } from '../types/PlayerType';

/**
 * Build query parameters for the API request.
 *
 * @param params The search parameters.
 * @returns A string of query parameters.
 */
const buildQueryParams = (params: SearchParams): string => {
	const queryParams = new URLSearchParams();

	if (params.search) queryParams.append('search', params.search);
	if (params.page) queryParams.append('page', params.page.toString());
	if (params.limit) queryParams.append('limit', params.limit.toString());
	if (params.sortBy) queryParams.append('sortBy', params.sortBy);

	return queryParams.toString();
};

/**
 * Build the API URL for a specific endpoint with optional query parameters.
 * 
 * @param endpoint The API endpoint.
 * @param params The query parameters.
 * @returns The full API URL with query parameters.
 */
const buildUrl = (endpoint: string, params?: SearchParams): string => {
	const query = params ? buildQueryParams(params) : '';
	return `${getApiUrl(endpoint)}${query ? '?' + query : ''}`;
};

class ApiError extends Error {
	status: number;
	statusText: string;

	constructor(status: number, statusText: string, message?: string) {
		super(message || `Erreur ${status}: ${statusText}`);
		this.name = 'ApiError';
		this.status = status;
		this.statusText = statusText;
	}
}

/**
 * Fetch data from a REST API endpoint.
 * 
 * @param url The API endpoint URL.
 * @param options Fetch API options.
 * @returns The JSON response from the API or throws an error.
 */
const fetchApi = async <T>(url: string, options?: RequestInit): Promise<T> => {
	try {
		const response = await fetch(url, {
			headers: getHeaders(options?.headers as Record<string, string>),
			...options,
		});

		if (!response.ok) {
			throw new ApiError(response.status, response.statusText);
		}

		return await response.json();
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new Error('Erreur de connexion au serveur');
	}
};

export const gameApi = {
	/**
	 * Get all games with optional filters.
	 * 
	 * @param {SearchParams} params - The search parameters.
	 * @returns {Promise<SearchResultType<GameType>>} The search results.
	 */
	getAll: async (params?: SearchParams): Promise<SearchResultType<GameType>> => {
		const url = buildUrl(API_CONFIG.ENDPOINTS.GAMES, params);
		return fetchApi<SearchResultType<GameType>>(url);
	},

	/**
	 * Get a game by ID.
	 * 
	 * @param {number | string} id - The ID of the game.
	 * @returns {Promise<GameType>} The game data.
	 */
	getById: async (id: number | string): Promise<GameType> => {
		const url = buildUrl(`${API_CONFIG.ENDPOINTS.GAMES}/${id}`);
		return fetchApi<GameType>(url);
	},

	/**
	 * Create a new game.
	 * 
	 * @param {Omit<GameType, 'id'>} gameData - The data for the new game.
	 * @returns {Promise<GameType>} The created game.
	 */
	create: async (gameData: Omit<GameType, 'id'>): Promise<GameType> => {
		const url = buildUrl(API_CONFIG.ENDPOINTS.GAMES);
		return fetchApi<GameType>(url, {
			method: 'POST',
			body: JSON.stringify(gameData),
		});
	},

	/**
	 * Update an existing game.
	 * 
	 * @param {number | string} id - The ID of the game to update.
	 * @param {Partial<Omit<GameType, 'id'>>} gameData - The data to update the game with.
	 * @returns {Promise<GameType>} The updated game.
	 */
	update: async (id: number | string, gameData: Partial<Omit<GameType, 'id'>>): Promise<GameType> => {
		const url = buildUrl(`${API_CONFIG.ENDPOINTS.GAMES}/${id}`);
		return fetchApi<GameType>(url, {
			method: 'PUT',
			body: JSON.stringify(gameData),
		});
	},

	/**
	 * Delete a game by ID.
	 * 
	 * @param {number | string} id - The ID of the game to delete.
	 * @returns {Promise<void>} A promise that resolves when the game is deleted.
	 */
	delete: async (id: number | string): Promise<void> => {
		const url = buildUrl(`${API_CONFIG.ENDPOINTS.GAMES}/${id}`);
		return fetchApi<void>(url, {
			method: 'DELETE',
		});
	},

	/**
	 * Search for games with optional filters.
	 * 
	 * @param {SearchParams} searchParams - The search parameters.
	 * @returns {Promise<SearchResultType<GameType>>} The search results.
	 */
	search: async (searchParams: SearchParams): Promise<SearchResultType<GameType>> => {
		return gameApi.getAll(searchParams);
	},
};

export const playerApi = {
	/**
	 * Get all players with optional filters.
	 * 
	 * @param {SearchParams} params - The search parameters.
	 * @returns {Promise<SearchResultType<PlayerType>>} The search results.
	 */
	getAll: async (params?: SearchParams): Promise<SearchResultType<PlayerType>> => {
		const url = buildUrl(API_CONFIG.ENDPOINTS.PLAYERS, params);
		return fetchApi<SearchResultType<PlayerType>>(url);
	},

	/**
	 * Get a player by ID.
	 * 
	 * @param {number | string} id - The ID of the player.
	 * @returns {Promise<PlayerType>} The player data.
	 */
	getById: async (id: number | string): Promise<PlayerType> => {
		const url = buildUrl(`${API_CONFIG.ENDPOINTS.PLAYERS}/${id}`);
		return fetchApi<PlayerType>(url);
	},

	/**
	 * Create a new player.
	 * 
	 * @param {Omit<PlayerType, 'id'>} playerData - The data for the new player.
	 * @returns {Promise<PlayerType>} The created player.
	 */
	create: async (playerData: Omit<PlayerType, 'id'>): Promise<PlayerType> => {
		const url = buildUrl(API_CONFIG.ENDPOINTS.PLAYERS);
		return fetchApi<PlayerType>(url, {
			method: 'POST',
			body: JSON.stringify(playerData),
		});
	},

	/**
	 * Update an existing player.
	 * 
	 * @param {number | string} id - The ID of the player to update.
	 * @param {Partial<Omit<PlayerType, 'id'>>} playerData - The data to update the player with.
	 * @returns {Promise<PlayerType>} The updated player.
	 */
	update: async (id: number | string, playerData: Partial<Omit<PlayerType, 'id'>>): Promise<PlayerType> => {
		const url = buildUrl(`${API_CONFIG.ENDPOINTS.PLAYERS}/${id}`);
		return fetchApi<PlayerType>(url, {
			method: 'PUT',
			body: JSON.stringify(playerData),
		});
	},

	/**
	 * Delete a player by ID.
	 * 
	 * @param {number | string} id - The ID of the player to delete.
	 * @returns {Promise<void>} A promise that resolves when the player is deleted.
	 */
	delete: async (id: number | string): Promise<void> => {
		const url = buildUrl(`${API_CONFIG.ENDPOINTS.PLAYERS}/${id}`);
		return fetchApi<void>(url, {
			method: 'DELETE',
		});
	},

	/**
	 * Search for players with optional filters.
	 * 
	 * @param {SearchParams} searchParams - The search parameters.
	 * @returns {Promise<SearchResultType<PlayerType>>} The search results.
	 */
	search: async (searchParams: SearchParams): Promise<SearchResultType<PlayerType>> => {
		return playerApi.getAll(searchParams);
	},
};

export const api = {
	games: gameApi,
	players: playerApi,
};

/**
 * Get data by type with optional search parameters.
 */
export const getDataByType = async <T extends GameType | PlayerType>(
	type: 'games' | 'players',
	params?: SearchParams
): Promise<SearchResultType<T>> => {
	if (type === 'games') {
		return gameApi.getAll(params) as Promise<SearchResultType<T>>;
	} else {
		return playerApi.getAll(params) as Promise<SearchResultType<T>>;
	}
};

/**
 * Get an item by ID based on type.
 * 
 * @param {string} type - The type of item ('games' or 'players').
 * @param {number | string} id - The ID of the item.
 * @returns {Promise<T>} The item of type T.
 */
export const getByIdByType = async <T extends GameType | PlayerType>(
	type: 'games' | 'players',
	id: number | string
): Promise<T> => {
	if (type === 'games') {
		return gameApi.getById(id) as Promise<T>;
	} else {
		return playerApi.getById(id) as Promise<T>;
	}
};

export default api;
