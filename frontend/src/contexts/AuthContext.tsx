import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import authService from '../services/authService';
import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/AuthType';

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = authService.getStoredToken();
		if (storedToken && authService.isTokenValid(storedToken)) {
			const decoded = authService.decodeToken(storedToken);
			setToken(storedToken);
			setUser({
				id: decoded.id,
				tag: decoded.tag,
			});
		}
		setLoading(false);
	}, []);

	const login = async (credentials: LoginCredentials) => {
		const response = await authService.login(credentials);
		const decoded = authService.decodeToken(response.token);

		setToken(response.token);
		setUser({
			id: decoded.id,
			tag: decoded.tag,
		});

		authService.setStoredToken(response.token);
	};

	const register = async (credentials: RegisterCredentials) => {
		const response = await authService.register(credentials);
		const decoded = authService.decodeToken(response.token);

		setToken(response.token);
		setUser({
			id: decoded.id,
			tag: decoded.tag,
			avatar: credentials.avatar,
		});

		authService.setStoredToken(response.token);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		authService.removeStoredToken();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated: !!token,
				login,
				register,
				logout,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
