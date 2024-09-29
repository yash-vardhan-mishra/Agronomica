import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useLoading } from './LoadingContext';
import { removeToken } from '../services/keychain';

interface AuthContextType {
    isLoggedIn: boolean;
    authToken: string;
    login: (token: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { setLoading } = useLoading();

    // Function to check the token in secure storage
    const checkAuthToken = async () => {
        setLoading(true);
        const token = await SecureStore.getItemAsync('authToken');
        setAuthToken(token);
        setIsLoggedIn(!!token);
        setLoading(false);
    };

    // login function to set the token manually
    const login = (token: string) => {
        setAuthToken(token);
        setIsLoggedIn(true);
    };

    // Function to log the user out by removing the token
    const logout = async () => {
        await removeToken();
        setAuthToken(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, authToken: authToken || '', login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
