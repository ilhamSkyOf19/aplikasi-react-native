import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { deleteUser } from "./delete.service";
import saveToken from "./saveToken.service";
import { getToken } from "./token.service";

interface UpdateUsername {
    username: string
}


export const updateUsername = async (dataOld: string, dataNew: string): Promise<{ success: boolean; message: string }> => {
    try {

        // cek token 
        const token = await getToken();
        if (token === null) {
            return { success: false, message: 'Token not found' };
        }

        // ambil dataa old
        const oldRef = doc(db, 'users', dataOld);
        const oldSnap = await getDoc(oldRef);


        // cek username
        if (oldSnap.data()?.username === dataNew) {
            return { success: false, message: 'Username already exists' };
        }

        // simpan user data old 
        const userOld = oldSnap.data();

        // update username nya 
        await setDoc(
            doc(db, 'users', dataNew), {
            ...userOld,
            username: dataNew
        }
        )


        // hapus user data old
        await deleteUser(dataOld);

        // set token
        await saveToken(dataNew);

        return { success: true, message: 'Update success' };
    } catch (error) {
        console.log('Update error:', error);
        return { success: false, message: 'Terjadi kesalahan saat update' };
    }
}


// update username and img
type Username = {
    username: string;
    data?: UpdateData
}

type UpdateData = {
    img?: string;
    password?: string;
}

export const updateUsernameAndImg = async ({ username, data }: Username): Promise<{ success: boolean; message: string }> => {

    try {

        // cek token 
        const token = await getToken();
        if (token === null) {
            return { success: false, message: 'Unauthorized' };
        }


        // ambil data 
        const userRef = doc(db, 'users', username);

        await updateDoc(userRef, data as UpdateData);

        // cek 
        return { success: true, message: 'Update success' };

    } catch (error) {
        console.log('Update error:', error);
        return { success: false, message: 'Terjadi kesalahan saat update' };
    }
}