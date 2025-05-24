import * as FileSystem from 'expo-file-system';

export const isValidImage = async (uri: string): Promise<boolean> => {
    try {
        // baca awal file 
        const fileContent = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        })

        // ambil 10 karakter pertama 
        const header = fileContent.slice(0, 10);

        // cek apakah header cocok dengan PNG, JPEG, atau WEBP
        if (
            header.startsWith('89504E47') ||
            header.startsWith('FFD8FF') ||
            header.startsWith('89504E47')
        ) {
            return true
        }
        return false;
    } catch (error) {
        console.error('error', error);
        return false;
    }
}