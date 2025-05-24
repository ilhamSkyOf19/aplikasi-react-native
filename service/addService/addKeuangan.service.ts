import { DataKeuangan } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';
export const addDataKeuangan = async (key: string, data: DataKeuangan) => {
    try {
        data.id = uuid4();

        // ambil data sebelumnya 
        const storedData: string | null = await AsyncStorage.getItem(key);
        let datas = storedData ? JSON.parse(storedData) : [];

        // tambahkan data baru 
        datas.push(data);

        // simpan kembali data ke lokal storage
        await AsyncStorage.setItem(key, JSON.stringify(datas));
        console.log('data tersimpan', data);
    } catch (error) {
        console.error('data not found', error);
    }
}
