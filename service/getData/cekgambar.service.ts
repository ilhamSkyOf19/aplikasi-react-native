import * as FileSystem from "expo-file-system";
// Fungsi untuk menghitung jumlah gambar di direktori lokal
export const countImagesInLocalDirectory = async () => {
    try {
        // Akses direktori dokumen aplikasi
        const directoryPath = FileSystem.documentDirectory;

        // Membaca isi direktori
        const files = await FileSystem.readDirectoryAsync(directoryPath || '');

        // Filter file berdasarkan ekstensi gambar
        const imageFiles = files.filter(file =>
            file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
        );

        // Menampilkan jumlah gambar yang ditemukan
        console.log('Jumlah gambar lokal:', imageFiles.length);
        return imageFiles.length;
    } catch (error) {
        console.error('Gagal membaca direktori atau menghitung gambar', error);
    }
};

// Panggil fungsi untuk mengecek gambar di direktori lokal