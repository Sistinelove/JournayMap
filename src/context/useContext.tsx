import React, {ReactNode, createContext, useContext, useState} from 'react';

type AppContextType = {
    isAdmin: boolean;
    toggleAdmin: () => void;
};

type AppContextProviderProps = {
    children: ReactNode;
};

const AppContext = createContext<AppContextType>({
    isAdmin: false,
    toggleAdmin: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleAdmin = () => setIsAdmin((prev) => !prev);

    return <AppContext.Provider value={{isAdmin, toggleAdmin}}>{children}</AppContext.Provider>;
};
