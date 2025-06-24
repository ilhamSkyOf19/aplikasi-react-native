import { useSelectedNavigation } from "@/context/NavigationContext";
import { deleteDataTercapai } from "@/service/deleteService/deleteDataTercapai.service";
import { height, width } from "@/utils/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-modal';
import ButtonScale from "../button/ButtonScale";

// ==================
// Props 
// ==================
interface DeleteModalProps {
    isVisible: boolean;
    onCancel: () => void
    id: string;
    typeModal: 'deleteTabungan' | 'deleteTercapai',
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onCancel, isVisible, id, typeModal }) => {
    // ==================
    // Selected use context
    // ==================
    const { selected } = useSelectedNavigation();
    const route = useNavigation();


    // ==================
    // handle hapus
    // ==================
    const handleHapus = useCallback(async () => {
        await deleteDataTercapai(id)
        onCancel();
        route.goBack();
    }, [id])



    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onCancel}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            animationInTiming={500}
            animationOutTiming={500}
            backdropOpacity={0.4}
            statusBarTranslucent={false}
            useNativeDriver={true}
            style={styles.modal}
        >
            <View>
                <View style={styles.contentModal}>
                    <View style={styles.containerCenter}>
                        <MaterialIcons name="delete" size={32} color="rgba(0, 0, 0, 0.5)" />
                    </View>
                    <View style={styles.containerCenter}>
                        <Text style={styles.text}>Hapus {typeModal === 'deleteTabungan' ? 'Tabungan' : 'Pencapaian'} ?</Text>
                    </View>
                    <View style={styles.containerButton}>
                        <ButtonScale handleButton={[onCancel]} label="Batal" custom={{ backgroundColor: 'transparent' }} customLabel={{ color: '#000', fontFamily: 'Poppins-Bold', fontSize: 13.5 }} />
                        <ButtonScale handleButton={[handleHapus]} label="Hapus" custom={{ backgroundColor: 'transparent' }} customLabel={{ color: '#000', fontFamily: 'Poppins-Bold', fontSize: 13.5 }} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default memo(DeleteModal);

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    contentModal: {
        backgroundColor: '#fff',
        width: width / 1.230,
        minHeight: height / 4,
        borderRadius: 15,
        paddingVertical: width / 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width / 20,
        gap: 10
    },
    containerCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 22,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: '4%',
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '100%',
        gap: 10
    },
})