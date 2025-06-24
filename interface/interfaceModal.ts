import { CurrencyInfo } from "@/data/typeCurrency";

export interface ModalProps {
    isVisible: boolean;
    onCancel: () => void;
    title?: string;
    idSetoran?: number;
    type?: string;
    handleEdit?: (id: number, typeModal: string, kurangOrTambah: string) => void;
    data?: number;
    handleUri?: (uri: string | null) => void;
    kurangOrTambah?: string;
    typeModal?: string;
    currency?: CurrencyInfo;

}