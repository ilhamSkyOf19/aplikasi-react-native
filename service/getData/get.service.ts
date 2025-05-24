import { DataKeuangan, TercapaiType } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

// get data
export const getData = async (key: string, tercapai: TercapaiType) => {
    try {
        // ambil data dari lokal storage dengan key yang sesuai
        const storedData: string | null = await AsyncStorage.getItem(key);
        // ambil notTercapai 
        let datas: DataKeuangan[] = storedData ? JSON.parse(storedData) : [];
        if (datas) {
            const kondisi = datas.filter((data: DataKeuangan) => {
                return data.tercapai === tercapai
            })
            return kondisi;
        } else {
            console.log('Data not found');
            return null;
        }
    } catch (error) {
        console.error('error dari AsyncStorage', error);
    }
}
