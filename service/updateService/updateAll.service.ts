import { DataKeuangan } from '@/interface/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateAllData = async (id: string, key: string, data: DataKeuangan): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(key);
        let datas: DataKeuangan[] = storedData ? JSON.parse(storedData) : [];

        console.log('Data yang ada:', datas);

        const updated = datas.map((item) => {
            if (item.id === id) {
                return { ...item, ...data };
            }
            return item;
        });

        await AsyncStorage.setItem(key, JSON.stringify(updated));

        console.log('Data berhasil diupdate');
    } catch (error) {
        console.error('Gagal mengupdate data:', error);
    }
};


export default UpdateAllData
