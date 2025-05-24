import { DataKeuangan } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const updateTabungan = async (id: string, key: string, keyData: string, value: number | string): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(key)
        let datas: DataKeuangan[] = storedData ? JSON.parse(storedData) : []

        // update data berdasarkan data yang di pilih 
        const updated = datas.map((item) => {
            if (item.id === id) {
                return { ...item, [keyData]: value }
            }
            return item;
        })

        await AsyncStorage.setItem(key, JSON.stringify(updated));
        console.log('data berhasil di update oke')
    } catch (error) {
        console.error('data gagal di update', error)
    }
}