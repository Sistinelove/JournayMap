import React, {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {getAttachmentsCount} from '@/controllers/AttractionController';

type AppContextType = {
    isAdmin: boolean;
    toggleAdmin: () => void;
    countAttachments: number;
    updateCountAttachments: () => Promise<void>;
};

type AppContextProviderProps = {
    children: ReactNode;
};

const AppContext = createContext<AppContextType>({
    isAdmin: false,
    toggleAdmin: () => {},
    countAttachments: 0,
    updateCountAttachments: async () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [countAttachments, setCountAttachments] = useState(0);

    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = await getAttachmentsCount();
        setCountAttachments(count);
    };
    const updateCountAttachments = async () => {
        const count = await getAttachmentsCount();
        setCountAttachments(count);
    };

    const toggleAdmin = () => setIsAdmin((prev) => !prev);

    return (
        <AppContext.Provider
            value={{isAdmin, toggleAdmin, countAttachments, updateCountAttachments}}
        >
            {children}
        </AppContext.Provider>
    );
};
