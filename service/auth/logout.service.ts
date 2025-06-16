import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('token')
        console.log('berhasil logout')
    } catch (error) {
        console.log(error)
    }
}