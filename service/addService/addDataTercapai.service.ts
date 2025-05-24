import AsyncStorage from "@react-native-async-storage/async-storage";

export const addDataTercapai = async (key: string, data: any) => {
    try {
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