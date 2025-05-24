//=========
// Imports
//=========
import React, { createContext, useState } from "react";

//=========
// ModalDeleteTercapaiProps
//=========
interface ModalDeleteTercapaiProps {
    isModalDeleteTercapai: boolean;
    setIsModalDeleteTercapai: (value: boolean) => void;
}

//=========
// Children
//=========
interface Children {
    children: React.ReactNode;
}

//=========
// ModalDeleteTercapaiContext
//=========
const ModalDeleteTercapaiContext = createContext<ModalDeleteTercapaiProps | undefined>(undefined)

//=========
// ModalDeleteTercapaiProvider
//=========
export const ModalDeleteTercapaiProvider = ({ children }: Children) => {
    const [isModalDeleteTercapai, setIsModalDeleteTercapai] = useState<boolean>(false);

    return (
        <ModalDeleteTercapaiContext.Provider value={{ isModalDeleteTercapai, setIsModalDeleteTercapai }}>
            {children}
        </ModalDeleteTercapaiContext.Provider>
    )
}

//=========
// useModalDeleteTercapaiContext
//=========
export const useModalDeleteTercapaiContext = () => {
    const context = React.useContext(ModalDeleteTercapaiContext);
    if (!context) {
        throw new Error('useModalDeleteContext must be used within a ModalDeleteContextProvider');
    }
    return context
}
