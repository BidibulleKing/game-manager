import { createContext } from 'react';
import type { AuthContextType } from '../types/AuthType';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
