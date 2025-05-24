import { DataSetoran } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

// get data
export const getDataSetoran = async (key: string) => {
    try {
        // ambil data dari lokal storage dengan key yang sesuai
        const storedData: string | null = await AsyncStorage.getItem(key);

        // jika data ada, parse data 
        if (storedData !== null) {
            const dataKeungan: DataSetoran[] = JSON.parse(storedData);
            return dataKeungan;
        } else {
            console.log('Data not found');
            return null;
        }
    } catch (error) {
        console.error('error dari AsyncStorage', error);
    }
}
