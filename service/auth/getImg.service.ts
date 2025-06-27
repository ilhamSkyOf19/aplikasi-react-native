import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";


export const getImg = async (username: string): Promise<{ success: boolean; message: string; data?: string }> => {
    try {
        // cek token 
        // const token = await getToken();
        // if (token === null) {
        //     return { success: false, message: 'Unauthorized' };
        // }

        const userRef = doc(db, 'users', username);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const user = userSnap.data().img as string;
            return { success: true, message: 'Success', data: user };
        } else {
            return { success: false, message: 'User not found', data: '' };
        }

    } catch (error) {
        console.log('Get img error:', error);
        return { success: false, message: 'Terjadi kesalahan saat mengambil gambar', data: '' };
    }

}