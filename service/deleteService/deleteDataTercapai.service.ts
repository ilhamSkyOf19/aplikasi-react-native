import { DataTercapai } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteDataTercapai = async (id: string, key: string,): Promise<void> => {
    try {
        const storedData = await AsyncStorage.getItem(key);
        let datas: DataTercapai[] = storedData ? JSON.parse(storedData) : [];

        if (datas && datas.length > 0) {

            const filterDatas = datas.filter((item) => item.id !== id);
            await AsyncStorage.setItem(key, JSON.stringify(filterDatas));
            console.log('data berhasil dihapus');
        } else {
            console.log('data not found')
            return;
        }
    } catch (error) {
        console.error('gagal dihapus', error);
    }
};
