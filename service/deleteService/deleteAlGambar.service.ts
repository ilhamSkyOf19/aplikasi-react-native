import * as FileSystem from 'expo-file-system';

export const deleteAllImages = async () => {
    try {
        const dir = FileSystem.documentDirectory;

        if (!dir) {
            console.warn('Tidak ada direktori dokumen.');
            return;
        }

        const files = await FileSystem.readDirectoryAsync(dir);

        for (const file of files) {
            if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.webp')) {
                const fileUri = `${dir}${file}`;
                await FileSystem.deleteAsync(fileUri, { idempotent: true });
                console.log(`Dihapus: ${fileUri}`);
            }
        }

        console.log('Semua gambar berhasil dihapus.');
    } catch (error) {
        console.error('Gagal menghapus gambar:', error);
    }
};
