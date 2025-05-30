import React from 'react';
import AddScreen from '../pages/AddScreen';




const add: React.FC = () => {
    return (
        <AddScreen />
    )
}



export default add;


// import { useState } from 'react';
// import { Button, Image, View, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function ImagePickerExample() {
//     const [image, setImage] = useState<string | null>(null);

//     // Fungsi untuk memilih gambar dari galeri
//     const pickImageFromGallery = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ['images'],
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         console.log(result);

//         if (!result.canceled) {
//             setImage(result.assets[0].uri);
//         }
//     };

//     // Fungsi untuk mengambil gambar menggunakan kamera
//     const pickImageFromCamera = async () => {
//         let result = await ImagePicker.launchCameraAsync({
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         console.log(result);

//         if (!result.canceled) {
//             setImage(result.assets[0].uri);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Tombol untuk memilih gambar dari galeri */}
//             <Button title="Pick an image from camera roll" onPress={pickImageFromGallery} />

//             {/* Tombol untuk mengambil gambar menggunakan kamera */}
//             <Button title="Take a photo" onPress={pickImageFromCamera} />

//             {/* Menampilkan gambar yang dipilih */}
//             {image && <Image source={{ uri: image }} style={styles.image} />}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: 200,
//         height: 200,
//     },
// });

