import { TokenData } from "@/interface/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async (): Promise<String | null> => {
    try {
        const tokenString = await AsyncStorage.getItem('token');

        if (tokenString !== null) {
            const parsed: TokenData = JSON.parse(tokenString);
            return parsed.username ?? null;
        }

        return null;
    } catch (error) {
        console.log('Error getting token:', error);
        return null;
    }
};
