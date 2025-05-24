import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataKeuangan, DataSetoran } from "../../interface/type";
import deleteImg from "./deleteImg.service";

export const deleteData = async (id: string, key: string, keySetoran: string): Promise<void> => {
    try {
        console.log('Mulai deleteData');
        console.log('ID yang mau dihapus:', id);
        console.log('Key:', key);
        console.log('Key Setoran:', keySetoran);

        // data keuangan last
        const storedData = await AsyncStorage.getItem(key);
        let datas: DataKeuangan[] = storedData ? JSON.parse(storedData) : [];
        console.log('Data keuangan sebelum delete:', datas);

        if (!datas || datas.length === 0) {
            console.log('Data keuangan kosong.');
            return;
        }

        const dataImg = datas.find((item) => item.id === id)?.img;
        if (dataImg) {
            console.log('Menghapus gambar:', dataImg);
            await deleteImg(dataImg);
        } else {
            console.log('Gambar tidak ditemukan untuk ID ini.');
        }

        const filterData = datas.filter((item) => item.id !== id);
        console.log('Data keuangan sesudah filter:', filterData);

        await AsyncStorage.setItem(key, JSON.stringify(filterData));
        console.log('Data keuangan berhasil diupdate');

        // data setoran last
        const storedSetoran = await AsyncStorage.getItem(keySetoran);
        let datasSetoran: DataSetoran[] = storedSetoran ? JSON.parse(storedSetoran) : [];
        console.log('Data setoran sebelum delete:', datasSetoran);

        if (datasSetoran && datasSetoran.length > 0) {
            const filterDataSetoran = datasSetoran.filter((item) => item.idKeuangan !== id);
            console.log('Data setoran sesudah filter:', filterDataSetoran);

            await AsyncStorage.setItem(keySetoran, JSON.stringify(filterDataSetoran));
            console.log('Data setoran berhasil diupdate');
        }

        console.log('Data berhasil dihapus');

    } catch (error) {
        console.error('Gagal menghapus data', error);
    }
};
