import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase.config";


interface UserData {
    username: string;
    password: string;
}
export const deleteUser = async (username: string): Promise<{ success: boolean; message: string }> => {
    try {
        // ambil data
        const userRef = doc(db, 'users', username);
        await deleteDoc(userRef);

        return { success: true, message: 'Delete success' };
    } catch (error) {
        console.log('Delete error:', error);
        return { success: false, message: 'Terjadi kesalahan saat delete' };
    }
}