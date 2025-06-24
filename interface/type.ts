//=====================
// Interface: Setoran
//=====================
export interface DataSetoran {
    id?: number;
    idKeuangan: number;
    setoran: number;
    plus: boolean;
    date: string;
    ket: string;
}

//=====================
// Interface: Keuangan
//=====================
export interface DataKeuangan {
    id?: number;
    idCurrency: number;
    img: string;
    nama: string;
    target: number;
    targetSetoran: number;
    tabungan: number;
    date: string;
    tercapai: TercapaiType;
    dateTercapai?: string;
}

//=====================
// Interface: Tercapai
//=====================
export interface DataTercapai {
    id?: number;
    idCurrency: number;
    img: string;
    nama: string;
    target: number;
    targetSetoran: number;
    tabungan: number;
    date: string;
    typeData: string;
    dataSetoran: DataSetoran[];
}

// ====================
// Interface: tokenData
// ====================
// types.ts (bisa kamu pisah ke file tersendiri jika mau)
export interface TokenData {
    token: string;
    username: string;
}


//=====================
// Type Aliases
//=====================
export type TercapaiType = "tercapai" | "belum" | "";
export type SelectedType = "harian" | "mingguan" | "bulanan" | "";
export type TypeData = "dataHarian" | "dataMingguan" | "dataBulanan" | "";
