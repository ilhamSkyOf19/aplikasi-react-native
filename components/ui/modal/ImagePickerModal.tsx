import { ModalProps } from '@/interface/interfaceModal'
import { pickImage } from '@/utils/saveImageLocally'
import { MaterialIcons } from '@expo/vector-icons'
import React, { memo, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { height, width } from '../../../utils/utils'


// ==================
// Props
// ==================
interface IconProps {
    name: keyof typeof MaterialIcons.glyphMap;
    ket: string;
    handleEvent: () => void;
}
const ImagePickerModal: React.FC<ModalProps> = ({ isVisible, onCancel, handleUri }) => {
    // ==================
    // State image
    // ==================
    const [uriImage, setUriImage] = React.useState<string | null>(null);

    // ==================
    // Handle Uri Effect
    // ==================
    useEffect(() => {
        handleUri?.(uriImage);
    }, [uriImage])




    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onCancel}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}        // Durasi animasi masuk (ms)
            animationOutTiming={400}       // Durasi animasi keluar (ms)
            backdropOpacity={0.5}
            statusBarTranslucent={false}
            useNativeDriver={true}
            style={styles.modal}
        >

            <View>
                <View style={styles.contentModal}>
                    <Text style={styles.title}>Pilih Sumber Gambar</Text>
                    <View style={styles.containerIcons}>
                        <Icon name={'photo-camera'} ket={'Kamera'} handleEvent={() => pickImage('camera', setUriImage, onCancel)} />
                        <Icon name={'photo-library'} ket={'Galery'} handleEvent={() => pickImage('gallery', setUriImage, onCancel)} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export const Icon: React.FC<IconProps> = ({ name, ket, handleEvent }) => {
    return (
        <TouchableOpacity onPress={handleEvent}>
            <View style={styles.containerIcon}>
                <View style={styles.bgIcon}>
                    <MaterialIcons name={name} size={25} color='rgba(0, 0, 0, 0.5)' />
                </View>
                <Text style={styles.textIcon}>{ket}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    contentModal: {
        backgroundColor: '#fff',
        width: width,
        height: height / 3.6,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: width / 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: '8%',
    },
    containerIcons: {
        width: '100%',
        paddingHorizontal: '9%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    containerIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    bgIcon: {
        backgroundColor: 'rgba(17, 167, 254, 0.3)',
        padding: width / 30,
        borderRadius: 30,
    },
    textIcon: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 13
    }
})

export default memo(ImagePickerModal)
