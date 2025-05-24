//=========
// Imports
//=========
import React, { createContext, useState } from "react";

//=========
// ContextProps
//=========
interface ContextProps {
    isVisibleModalDeleteTabungan: boolean;
    setVisibleModalDeleteTabungan: (value: boolean) => void;
}

//=========
// Children
//=========
interface Children {
    children: React.ReactNode;
}

//=========
// ModalDeleteTabunganContext
//=========
const ModalDeleteTabunganContext = createContext<ContextProps | undefined>(undefined);

//=========
// ModalDeleteTabunganProvider
//=========
export const ModalDeleteTabunganProvider: React.FC<Children> = ({ children }) => {
    const [isVisibleModalDeleteTabungan, setVisibleModalDeleteTabungan] = useState<boolean>(false);

    return (
        <ModalDeleteTabunganContext.Provider value={{ isVisibleModalDeleteTabungan, setVisibleModalDeleteTabungan }}>
            {children}
        </ModalDeleteTabunganContext.Provider>
    )
}

//=========
// useModalDeleteTabungan
//=========
export const useModalDeleteTabungan = () => {
    const context = React.useContext(ModalDeleteTabunganContext);
    if (!context) {
        throw new Error('useModalTabunganContext must be used within a ModalTabunganProvider');
    }
    return context;
};
