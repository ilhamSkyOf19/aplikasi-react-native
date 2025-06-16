import * as bycrypt from 'bcryptjs';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import saveToken from './saveToken.service';

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

        // save token
        await saveToken(username);


        // success
        return { success: true, message: 'Login success' };
    } catch (error) {
        console.log('Login error:', error);
        return { success: false, message: 'Terjadi kesalahan saat login' };
    }
}