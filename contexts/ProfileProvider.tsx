import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';
import { getProfileInfo } from '../services/profile';
import { useAuth } from './AuthContext';
import { navigate } from '../navigation/service';

interface Profile {
    firstName: string;
    lastName: string;
    contactNumber: string | null;
}

interface ProfileContextProps {
    profile: Profile | null;
    fetchProfileData: () => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const { authToken } = useAuth();

    const fetchProfileData = async () => {
        if (!authToken) return null;
        getProfileInfo(authToken).then((res) => {
            const { firstName, lastName, contactNumber } = res;                        
            // Redirect to ProfileCreation if any profile field is missing
            if (!firstName || !lastName || !contactNumber) {
                navigate('ProfileCreation');
                return
            }
            setProfile(res);
        }).catch((err) => {
            Alert.alert('Error', err?.message || 'Something went wrong');
        });
    };

    useEffect(() => {
        fetchProfileData();
    }, [authToken]);

    return (
        <ProfileContext.Provider value={{ profile, fetchProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextProps => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
