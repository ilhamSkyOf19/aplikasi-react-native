import { DataSetoran } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const kurangTabungan = async (
    id: string,          // ID dari data yang ingin diubah
    valueTabungan: any,     // Nilai baru untuk field tersebut
    valueKet: string,
    key: string
): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(key);
        let datas: DataSetoran[] = storedData ? JSON.parse(storedData) : [];

        // Update data berdasarkan ID dan field yang dipilih
        const updated = datas.map(item =>
            item.id === Number(id) ? { ...item, tabungan: valueTabungan, ket: valueKet } : item
        );

        // Simpan kembali ke AsyncStorage
        await AsyncStorage.setItem(key, JSON.stringify(updated));
    } catch (error) {
        console.error('Gagal mengubah data:', error);
    }
};
