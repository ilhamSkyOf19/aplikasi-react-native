import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from 'uuid';


const saveToken = async (username: string) => {
    const tokenData = {
        token: uuidv4(),
        username: username
    }
    try {
        await AsyncStorage.setItem('token', JSON.stringify(tokenData));
    } catch (error) {
        console.error('error dari AsyncStorage', error);
    }
}


export default saveToken