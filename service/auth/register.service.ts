import { hashPassword } from '@/utils/crypto';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';

export const registerUser = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    const userRef = doc(db, 'users', username);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return { success: false, message: 'Username already exists' };
    }

    password = await hashPassword(password);
    await setDoc(userRef, { username, password, img: '' });

    return { success: true, message: 'Register success' };
};
