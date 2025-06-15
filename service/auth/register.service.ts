import * as bcrypt from 'bcryptjs';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';

export const registerUser = async (username: string, password: string) => {
    const userRef = doc(db, 'users', username);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return { success: false, message: 'Username already exists' };
    }

    password = await bcrypt.hash(password, 10);
    await setDoc(userRef, { username, password });

    return { success: true, message: 'Register success' };
};
