import { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <GlobalContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;