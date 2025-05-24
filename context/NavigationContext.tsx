//=========
// Imports
//=========
import { SelectedType } from "@/interface/type";
import React, { createContext, useContext, useState } from "react";

//=========
// ContextType
//=========
interface ContextType {
    selected: SelectedType;
    setSelected: (selected: SelectedType) => void;
}

//=========
// Children
//=========
interface Children {
    children: React.ReactNode;
}

//=========
// selectedNavigationContext
//=========
export const selectedNavigationContext = createContext<ContextType | undefined>(undefined);

//=========
// SelectedNavigationProvider
//=========
export const SelectedNavigationProvider: React.FC<Children> = ({ children }) => {
    const [selected, setSelected] = useState<SelectedType>('harian');

    return (
        <selectedNavigationContext.Provider value={{ selected, setSelected }}>
            {children}
        </selectedNavigationContext.Provider>
    );
};

//=========
// useSelectedNavigation
//=========
export const useSelectedNavigation = () => {
    const context = useContext(selectedNavigationContext);
    if (!context) {
        throw new Error("useSelectedNavigation must be used within a SelectedNavigationProvider");
    }
    return context;
};
