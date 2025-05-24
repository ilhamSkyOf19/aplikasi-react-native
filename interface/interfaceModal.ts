import { CurrencyInfo } from "@/data/typeCurrency";

export interface ModalProps {
    isVisible: boolean;
    onCancel: () => void;
    title?: string;
    idSetoran?: string;
    type?: string;
    handleEdit?: (id: string, typeModal: string) => void;
    data?: number;
    handleUri?: (uri: string | null) => void;
    kurangOrTambah?: string;
    typeModal?: string;
    currency?: CurrencyInfo;
}