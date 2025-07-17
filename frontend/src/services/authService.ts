import { API_CONFIG, getApiUrl, getHeaders } from '../config/api';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/AuthType';

class AuthService {
	private baseUrl = API_CONFIG.BASE_URL;

	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await fetch(getApiUrl('/api/auth/login'), {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error('Identifiants invalides');
		}

		return response.json();
	}

	async register(credentials: RegisterCredentials): Promise<AuthResponse> {
		const response = await fetch(getApiUrl('/api/auth/register'), {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error('Erreur lors de l\'inscription');
		}

		return response.json();
	}

	getStoredToken(): string | null {
		return localStorage.getItem('auth_token');
	}

	setStoredToken(token: string): void {
		localStorage.setItem('auth_token', token);
	}

	removeStoredToken(): void {
		localStorage.removeItem('auth_token');
	}

	decodeToken(token: string): any {
		try {
			const payload = token.split('.')[1];
			const decoded = atob(payload);
			return JSON.parse(decoded);
		} catch {
			return null;
		}
	}

	isTokenValid(token: string): boolean {
		const decoded = this.decodeToken(token);
		if (!decoded) return false;

		const now = Date.now() / 1000;
		return decoded.exp > now;
	}
}

export default new AuthService();
