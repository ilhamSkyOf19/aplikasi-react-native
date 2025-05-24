import * as FileSystem from 'expo-file-system';

const deleteImg = async (url: string | undefined) => {
    try {
        if (url) {
            await FileSystem.deleteAsync(url, { idempotent: true });
            console.log('gambar berhasil dihapus');
        } else {
            console.log('img not found');
        }
    } catch (error) {
        console.error('gagal dihapus', error);
    }
}

export default deleteImg;