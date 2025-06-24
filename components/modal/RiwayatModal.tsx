import { DataSetoran, TypeData } from '@/interface/type';
import { deleteDataSetoran } from '@/service/deleteService/deleteDataSetoran.service';
import { getDataSetoran } from '@/service/getData/getSetoran.service';
import { formatCurrency, formatDate } from '@/utils/utils';
import { MaterialIcons } from '@expo/vector-icons';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import { ModalProps } from '../../interface/interfaceModal';
import ButtonBasic from '../ui/ButtonBasic';
const { height, width }: { height: number; width: number } = Dimensions.get("screen");

const RiwayatModal: React.FC<ModalProps> = ({ isVisible, onCancel, handleEdit, type, idSetoran, currency }) => {
    // ==================
    // state data setoran
    // ==================
    const [typeData, setTypeData] = useState<TypeData>('');
    // ==================
    // state data setoran
    // ==================
    const [dataSetoran, setDataSetoran] = useState<DataSetoran | null>(null);
    const [kurangOrTambah, setKurangOrTambah] = useState<string>('');


    // ==================
    // state type data 
    // ==================
    useEffect(() => {
        if (type === 'harian') setTypeData('dataHarian');
        else if (type === 'mingguan') setTypeData('dataMingguan');
        else if (type === 'bulanan') setTypeData('dataBulanan');
    })
    // ==================
    // get data 
    // ==================
    useEffect(() => {
        const fetchData = async () => {
            let sumberData: DataSetoran[] | null | undefined = null;
            sumberData = await getDataSetoran('typeData', typeData);

            if (sumberData !== null && sumberData !== undefined) {
                const foundData = sumberData?.find((item) => item.id === idSetoran) || null;
                setDataSetoran(foundData || null);
            }
        }

        fetchData();
    }, [idSetoran, isVisible])


    // ===================
    // delete data 
    // ===================
    const deleteData = useCallback(async () => {
        try {
            await deleteDataSetoran(idSetoran ?? 0);
            onCancel();
        } catch (error) {
            console.error(error);
        }
    }, [idSetoran])

    console.log(type)

    useEffect(() => {
        setKurangOrTambah(dataSetoran?.plus ? 'tambah' : 'kurang');
    }, [idSetoran, dataSetoran?.plus])





    return (
        <>
            {dataSetoran && (
                <Modal visible={isVisible} transparent={true} statusBarTranslucent={true} animationType="fade" onRequestClose={onCancel}>
                    <View style={styles.container}>
                        <View style={styles.containerContent}>
                            <MaterialIcons
                                name="close"
                                size={24}
                                color="black"
                                onPress={onCancel}
                                style={styles.closeButton}
                            />
                            <View style={styles.containerTitleAndDate}>
                                <Text style={[styles.textTitle, !dataSetoran.plus && { color: 'red' }]}>{dataSetoran.plus ? `+${formatCurrency(dataSetoran.setoran, currency?.locale || 'id-ID', currency?.code || 'IDR')}` : `-${formatCurrency(dataSetoran.setoran, currency?.locale || 'id-ID', currency?.code || 'IDR')}`}</Text>
                                <View style={styles.containerDate}>
                                    <Text style={styles.textDate}>{formatDate(dataSetoran.date, 'dd MMM yyyy ')}</Text>
                                    <View style={styles.ellipse}></View>
                                    <Text style={styles.textDate}>{formatDate(dataSetoran.date, 'HH:mm')}</Text>
                                </View>
                            </View>
                            <View style={styles.containerKeterangan}>
                                <Text style={styles.textKeterangan}>{dataSetoran.ket}</Text>
                            </View>
                            <View style={styles.containerButton}>
                                <ButtonBasic handleButton={[() => handleEdit?.(idSetoran ?? 0, 'update', kurangOrTambah)]} label={'Ubah'} custom={{ width: width / 3.9, height: height / 22 }} nameIcon='edit' />
                                <ButtonBasic handleButton={[deleteData]} label={'Hapus'} custom={{ width: width / 3.9, height: height / 22 }} nameIcon='delete' />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.2)',
    },
    containerContent: {
        width: width / 1.3,
        minHeight: height / 3.5,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: width / 8,
        paddingBottom: width / 9,
        paddingHorizontal: width / 20,
        gap: 10,
        zIndex: 10,   // Pastikan berada di atas
        elevation: 5,  // Untuk Android
        position: 'relative',
        borderRadius: 12
    },
    // close button
    closeButton: {
        padding: '2%',
        position: 'absolute',
        top: '1%',
        right: '1.5%'
    },
    containerTitleAndDate: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 28,
        color: '#32CD32'
    },
    // container date
    containerDate: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
    },
    textDate: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 11
    },
    ellipse: {
        width: width / 80,
        height: width / 80,
        borderRadius: 15,
        backgroundColor: 'black',
        marginBottom: '0.5%'
    },
    // container keterangan
    containerKeterangan: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginBottom: '6%'
    },
    textKeterangan: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '8%'
    }


})

export default memo(RiwayatModal);
