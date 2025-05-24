import { DataTercapai } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

// get data
export const getDataTercapai = async (key: string) => {
    try {
        // ambil data dari lokal storage dengan key yang sesuai
        const storedData: string | null = await AsyncStorage.getItem(key);
        // ambil notTercapai 
        let datas: DataTercapai[] = storedData ? JSON.parse(storedData) : [];
        if (datas) {
            return datas;
        } else {
            console.log('Data not found');
            return null;
        }
    } catch (error) {
        console.error('error dari AsyncStorage', error);
    }
}
