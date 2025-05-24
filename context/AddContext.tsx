//=========
// Imports
//=========
import React, { createContext, useContext, useState } from 'react';

//=========
// ContextType
//=========
interface ContextType {
    triger: boolean;
    setTriger: (triger: boolean) => void;
}

//=========
// ChildrenType
//=========
interface ChildrenType {
    children: React.ReactNode;
}

//=========
// addContext
//=========
const addContext = createContext<ContextType | undefined>(undefined);

//=========
// AddContextProvider
//=========
export const AddContextProvider: React.FC<ChildrenType> = ({ children }) => {

    //========= 
    // state data context 
    //=========
    const [triger, setTriger] = useState<boolean>(false); // Default value set to false

    return (
        <addContext.Provider value={{ triger, setTriger }}>
            {children}
        </addContext.Provider>
    );
};

//=========
// useContextAdd
//=========
export const useContextAdd = () => {
    const context = useContext(addContext);
    if (!context) {
        throw new Error('useContextAdd must be used within an AddContextProvider');
    }
    return context;
};
