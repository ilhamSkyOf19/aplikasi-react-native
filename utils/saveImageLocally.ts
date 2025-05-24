import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

// save img to local storage 
// export const saveImageLocally = async (uri: string): Promise<string | null> => {
//     try {
//         const pathName = uri.split('/').pop();
//         const newPath = FileSystem.documentDirectory?.concat(pathName || '');

//         // simpan gambar ke lokal 
//         await FileSystem.copyAsync({
//             from: uri,
//             to: newPath ?? '',
//         })

//         return newPath || null;


//     } catch (error) {
//         console.error('Failed to save image:', error);
//         return null;
//     }
// }


// get img from camera or gallery
export const pickImage = async (
    sourceType: 'camera' | 'gallery',
    setUriImage: (uri: string) => void,
    onCancel: () => void
) => {
    try {
        const { status } =
            sourceType === 'camera'
                ? await ImagePicker.requestCameraPermissionsAsync()
                : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Izin tidak diberikan');
            return;
        }

        const result =
            sourceType === 'camera'
                ? await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    quality: 1,
                })
                : await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images'],
                    allowsEditing: true,
                    quality: 1,
                });

        if (!result.canceled && result.assets.length > 0 && result.assets[0].uri && Array.isArray(result.assets)) {
            const localUri = result.assets[0]?.uri;
            if (localUri) {
                setUriImage(localUri)
                onCancel();
            } else {
                setUriImage('')
            }
        }
    } catch (error) {
        console.log(error)
    }
};



// handle save 
export const handleSaveLokal = async (imgUri: string, setSaveduri: (uri: string) => void) => {
    try {
        if (!imgUri || imgUri.trim() === '') {
            console.log('img not found')
            return;
        }

        const fileName = FileSystem.documentDirectory?.concat(imgUri.split('/').pop() || '');
        if (fileName === '') {
            console.log('file name not found')
            return;
        }

        await FileSystem.copyAsync({
            from: imgUri,
            to: fileName ?? '',
        })

        setSaveduri(fileName || '');
        console.log('berhasil meyimpan data gambar', fileName);
    } catch (error: Error | any) {
        console.log('gagal meyimpan gambar:', error.message);
    }
}
