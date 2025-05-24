//=========
// Imports
//=========
import React, { createContext, useContext, useState } from 'react';

//=========
// ContextType
//=========
interface ContextType {
    id: string;
    setId: (id: string) => void;
}

//=========
// Children
//=========
interface Children {
    children: React.ReactNode
}

//=========
// idContext
//=========
const idContext = createContext<ContextType | undefined>(undefined);

//=========
// IdContextProvider
//=========
const IdContextProvider: React.FC<Children> = ({ children }) => {
    const [id, setId] = useState<string>('');
    return (
        <idContext.Provider value={{ id, setId }}>
            {children}
        </idContext.Provider>
    )
}

//=========
// useIdContext
//=========
export const useIdContext = () => {
    const context = useContext(idContext);
    if (!context) {
        throw new Error('useNameBackContext must be used within a NameBackContextProvider')
    }
    return context;
}

//=========
// Export Default
//=========
export default IdContextProvider;
