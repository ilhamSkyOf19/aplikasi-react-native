import { useSelectedNavigation } from "@/context/NavigationContext";
import { SelectedType } from "@/interface/type";
import { deleteData } from "@/service/deleteService/deleteData.service";
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
    typeData?: SelectedType
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onCancel, isVisible, id, typeModal, typeData }) => {
    // ==================
    // Selected use context
    // ==================
    const { selected } = useSelectedNavigation();
    const route = useNavigation();


    // ==================
    // handle hapus
    // ==================
    const handleHapus = useCallback(async () => {
        if (typeModal === 'deleteTabungan') {
            if (selected === 'harian') {
                await deleteData(id, 'dataKeuanganHarian', 'dataSetoranHarian');
            } else if (selected === 'mingguan') {
                await deleteData(id, 'dataKeuanganMingguan', 'dataSetoranMingguan');
            } else if (selected === 'bulanan') {
                await deleteData(id, 'dataKeuanganBulanan', 'dataSetoranBulanan');
            } else {
                return null;
            }
            onCancel();
            route.goBack();
        } else {
            if (typeData === 'harian') {
                await deleteData(id, 'dataKeuanganHarian', 'dataSetoranHarian');
            } else if (typeData === 'mingguan') {
                await deleteData(id, 'dataKeuanganMingguan', 'dataSetoranMingguan');
            } else if (typeData === 'bulanan') {
                await deleteData(id, 'dataKeuanganBulanan', 'dataSetoranBulanan');
            }
            await deleteDataTercapai(id, 'dataTercapai');
            onCancel();
            route.goBack();
        }
    }, [typeData, id])



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