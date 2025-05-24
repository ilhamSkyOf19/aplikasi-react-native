import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteAll = async (key: string) => {
    try {
        // Hapus data dari AsyncStorage
        await AsyncStorage.removeItem(key);

        console.log('data berhasil dihapus');
    } catch (error) {
        console.error('Gagal menghapus data', error);
    }
};
