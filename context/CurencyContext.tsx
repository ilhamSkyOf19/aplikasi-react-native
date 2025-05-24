//=========
// Imports
//=========
import React, { createContext, useContext, useState } from "react";

//=========
// ContextType
//=========
interface ContextType {
    currency: number;
    setCurrency: (currency: number) => void;
}

//=========
// Children
//=========
interface Children {
    children: React.ReactNode;
}

//=========
// currencyContext
//=========
export const currencyContext = createContext<ContextType | undefined>(undefined);

//=========
// CurrencyProvider
//=========
export const CurrencyProvider: React.FC<Children> = ({ children }) => {
    const [currency, setCurrency] = useState<number>(1); // Default value set to 1

    return (
        <currencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </currencyContext.Provider>
    );
};

//=========
// useCurrencyContext
//=========
export const useCurrencyContext = () => {
    const context = useContext(currencyContext);
    if (!context) {
        throw new Error("useCurrencyContext must be used within a CurrencyProvider");
    }
    return context;
};
