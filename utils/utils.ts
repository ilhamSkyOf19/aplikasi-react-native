import { addDays, format, isValid, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { Dimensions } from 'react-native';

// export const formatRupiah = (angka: number): string => {
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//         minimumFractionDigits: 0
//     }).format(angka);
// };

// format currency 
export const formatCurrency = (angka: number, locale: string, currency: string): string => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    }).format(angka || 0);
};


// format persentase
export const formatPersentase = (value: number): string => {
    if (value === 0) return '0';
    return value.toFixed(0); // misalnya maksimal 2 angka di belakang koma
}


// gradient color
export const getProgressColor = (percentage: number): string => {
    if (percentage < 30) return "red";      // 0% - 30% → Merah
    if (percentage < 60) return "#ff7f00";      // 0% - 30% → Merah
    if (percentage < 80) return "#FFC800";   // 30% - 60% → Kuning
    if (percentage < 90) return "#33FF00";   // 30% - 60% → Kuning
    return "#2cb609";                         // 60% - 100% → Hijau
};

// format input
export const formatNumber = (value: string): string => {
    let number = value.replace(/\D/g, ''); // Hapus karakter selain angka
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Tambah titik setiap ribuan
};

// fungsi format number 
export const formattedNonDecimal = (value: string): string => {
    return value.replace(/\D/g, ''); // Hapus karakter non-numerik
}


// format date 
export const formatDate = (value: string, formatDate: string): string => {
    if (value && value.trim() !== "" && !isNaN(new Date(value).getTime())) {
        const date = parseISO(value);
        if (isValid(date)) {
            return format(date, formatDate, { locale: id })
        }
    }

    return "";
}


// width and height responsif 
export const { height, width }: { height: number; width: number } = Dimensions.get("screen");


// fungsi estimasi pencapaian
export const estimasiPencapaian = (target: number, estimasi: number, startDate: Date): string => {
    if (!target || !estimasi || isNaN(target) || isNaN(estimasi)) {
        return '-';
    }
    const jumlahHari: number = Math.ceil(target / estimasi);
    const tanggalCapai: Date = addDays(startDate, jumlahHari);

    return format(tanggalCapai, 'dd MMMM yyyy', { locale: id })
}


// fungsi penghitungan kurang
export const penghitunganKurang = (target: number | undefined, tabungan: number | undefined): number => {
    const kurang: number = (target !== undefined && tabungan !== undefined) ? target - tabungan : 0;
    return kurang
}



// fungsi tercapai 
export const waktuTercapai = (dateAkhir: string, dateAwal: string): string => {
    return (Math.ceil(new Date(dateAkhir).getTime() - new Date(dateAwal).getTime()) / (1000 * 60 * 60 * 24)
    ).toFixed(0)
}