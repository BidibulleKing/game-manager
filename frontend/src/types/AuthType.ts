export interface AuthUser {
	id: number;
	tag: string;
	avatar?: string;
}

export interface LoginCredentials {
	tag: string;
	password: string;
}

export interface RegisterCredentials {
	tag: string;
	password: string;
	avatar?: string;
}

export interface AuthResponse {
	token: string;
}

export interface AuthContextType {
	user: AuthUser | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	logout: () => void;
	loading: boolean;
}
