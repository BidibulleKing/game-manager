export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',

	TIMEOUT: 10000,

	DEFAULT_HEADERS: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},

	ENDPOINTS: {
		GAMES: '/api/games',
		PLAYERS: '/api/players',
		AUTH: '/api/auth',
	},

	PAGINATION: {
		DEFAULT_PAGE: 1,
		DEFAULT_LIMIT: 12,
		DEFAULT_SORT_ORDER: 'desc' as const,
		DEFAULT_GAME_SORT: 'rating' as const,
		DEFAULT_PLAYER_SORT: 'minutes_spent' as const,
	},
} as const;

export type ApiConfig = typeof API_CONFIG;
export type SortOrder = typeof API_CONFIG.PAGINATION.DEFAULT_SORT_ORDER;

export const getApiUrl = (endpoint: string): string => {
	return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const getHeaders = (customHeaders?: Record<string, string>): Record<string, string> => {
	const headers: Record<string, string> = {
		...API_CONFIG.DEFAULT_HEADERS,
		...customHeaders,
	};

	const token = localStorage.getItem('auth_token');
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	return headers;
};

export default API_CONFIG;
