import { DataSetoran } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateSetoran = async (
    id: string,          // ID dari data yang ingin diubah
    valueSetoran: number,       // Nama field yang ingin diubah (misal: 'nama', 'jumlah', dll)
    valueKeterangan: string,     // Nilai baru untuk field tersebut
    key: string
): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(key);
        let datas: DataSetoran[] = storedData ? JSON.parse(storedData) : [];

        // Update data berdasarkan ID dan field yang dipilih
        const updated = datas.map(item =>
            item.id === id ? { ...item, setoran: valueSetoran, ket: valueKeterangan } : item
        );

        // Simpan kembali ke AsyncStorage
        await AsyncStorage.setItem(key, JSON.stringify(updated));
        console.log('data berhasil di update');
    } catch (error) {
        console.error('Gagal mengubah data:', error);
    }
};
