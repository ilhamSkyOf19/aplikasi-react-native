//=====================
// Interface: Setoran
//=====================
export interface DataSetoran {
    id: string;
    idKeuangan: string;
    setoran: number;
    plus: boolean;
    date: string;
    ket: string;
}

//=====================
// Interface: Keuangan
//=====================
export interface DataKeuangan {
    id: string;
    idCurrency: number;
    img: string;
    nama: string;
    target: number;
    targetSetoran: number;
    tabungan: number;
    date: string;
    tercapai: TercapaiType;
}

//=====================
// Interface: Tercapai
//=====================
export interface DataTercapai {
    id: string;
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

//=====================
// Type Aliases
//=====================
export type TercapaiType = "tercapai" | "belum" | "";
export type SelectedType = "harian" | "mingguan" | "bulanan" | "";
export type DataPath = "dataKeuanganHarian" | "dataKeuanganMingguan" | "dataKeuanganBulanan" | "";
export type DataPathSetoran = "dataSetoranHarian" | "dataSetoranMingguan" | "dataSetoranBulanan" | "";
