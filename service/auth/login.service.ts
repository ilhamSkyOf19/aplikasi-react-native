import AsyncStorage from '@react-native-async-storage/async-storage';
import * as bycrypt from 'bcryptjs';
import { doc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/firebase.config';

export const loginUser = async (username: string, password: string): Promise<any> => {
    try {
        const userRef = doc(db, 'users', username);
        const userSnap = await getDoc(userRef);

        // check if user exists
        if (!userSnap.exists()) {
            return { success: false, message: 'Username or Password is incorrect' };
        }

        // check password
        const passwordMatch = await bycrypt.compare(password, userSnap.data().password as string);
        if (!passwordMatch) {
            return { success: false, message: 'Username or Password is incorrect' };
        }


        await AsyncStorage.setItem('token', uuidv4());


        // success
        return { success: true, message: 'Login success' };
    } catch (error) {
        console.log('Login error:', error);
        return { success: false, message: 'Terjadi kesalahan saat login' };
    }
}