import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getFields } from '../services/fields';
import { useAuth } from './AuthContext';
import { showError } from '../components/molecules/OtpTextInput/utils';
import { useLoading } from './LoadingContext';

interface Field {
    fieldName: string;
    size: number;
    fieldType: string;
    fieldId: string;
    fieldAddress: string;
}

interface FieldsContextProps {
    fields: Field[];
    selectedField: string;
    setSelectedField: (fieldId: string) => void;
    fetchFieldsData: () => Promise<void>;
}

const FieldsContext = createContext<FieldsContextProps | undefined>(undefined);

export const FieldsDetailsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fields, setFields] = useState<Field[]>([]);
    const [selectedField, setSelectedField] = useState<string>('');
    const { authToken } = useAuth();

    const fetchFieldsData = async () => {
        if (!authToken) return;
        try {
            const response = await getFields(authToken);            
            setFields(response?.data || []);
        } catch (err) {
            showError(err);
        }
    };

    return (
        <FieldsContext.Provider value={{ fields, selectedField, setSelectedField, fetchFieldsData }}>
            {children}
        </FieldsContext.Provider>
    );
};

export const useFields = (): FieldsContextProps => {
    const context = useContext(FieldsContext);
    if (!context) {
        throw new Error('useFields must be used within a FieldsDetailsProvider');
    }
    return context;
};
