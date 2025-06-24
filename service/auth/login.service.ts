import { hashPassword } from '@/utils/crypto';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import saveToken from './saveToken.service';

export const loginUser = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
        const userRef = doc(db, 'users', username);
        const userSnap = await getDoc(userRef);

        // check if user exists
        if (!userSnap.exists()) {
            return { success: false, message: 'Username or Password is incorrect' };
        }

        // check password
        const user = userSnap.data();
        const hashPasswordInput = await hashPassword(password);
        if (user.password !== hashPasswordInput) {
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