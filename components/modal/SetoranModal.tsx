import StyleInput from '@/components/input/StyleInput';
import ComponentSnackbar from '@/components/Snackbar';
import { useIdContext } from '@/context/IdContext';
import { useBorderInputUseRefModal } from '@/hooks/BorderInputUseRefModal';
import { DataKeuangan, DataSetoran, TypeData } from '@/interface/type';
import { addDataSetoran } from '@/service/addService/addSetoran.service';
import { getDataKeuangan } from '@/service/getData/getDataKeuangan.service';
import { getDataSetoran } from '@/service/getData/getSetoran.service';
import { updateSetoran } from '@/service/updateService/updateSetoran.service';
import { formatNumber, formattedNonDecimal, height, width } from '@/utils/utils';
import React, { memo, RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { ModalProps } from '../../interface/interfaceModal';
import TextWarning from '../TextWarning';
import ButtonBasic from '../ui/ButtonBasic';

const SetoranModal: React.FC<ModalProps> = ({ isVisible, onCancel, title, idSetoran, type, kurangOrTambah, typeModal }) => {
    //=========
    // State Variables
    //==========
    const [amount, setAmount] = useState<string>('');
    const [keterangan, setKeterangan] = useState<string>('');
    const [popUp, setPopUp] = useState<boolean>(false);
    const { id } = useIdContext();
    const [playSnackbar, setPlaySnackbar] = useState<boolean>(false);
    const [snackbarConditional, setSnackbarConditional] = useState<string>('');
    const [data, setData] = useState<DataKeuangan | null>(null);
    const [setoran, setSetoran] = useState<DataSetoran | null>(null);
    const [dataTabungan, setDataTabungan] = useState<number | undefined>(undefined);
    const [TypeData, setTypeData] = useState<TypeData>('');

    const [trigerMaxInputNominal, setTrigerMaxInputNominal] = useState<boolean>(false);
    const [trigerMaxInputKet, setTrigerMaxInputKet] = useState<boolean>(false);
    //=========
    // Computed Values
    //==========
    const kurang = useMemo(() => {
        return (data?.target ?? 0) - (data?.tabungan ?? 0);
    }, [data?.target, data?.tabungan]);

    // =========
    // State Type Data 
    // =========
    useEffect(() => {
        if (type === 'harian') setTypeData('dataHarian');
        else if (type === 'mingguan') setTypeData('dataMingguan');
        else if (type === 'bulanan') setTypeData('dataBulanan');
    }, [type]);
    //=========
    // Effects for Fetching Data
    //==========
    useEffect(() => {
        const fetchData = async () => {
            let sumberData: DataKeuangan[] | null | undefined = [];
            sumberData = await getDataKeuangan(TypeData, 'belum');

            if (sumberData !== null && sumberData !== undefined) {
                const foundData = sumberData?.find((data) => data.id === Number(id)) || null;
                setData(foundData || null);
                setDataTabungan(foundData?.tabungan);
            }
        };
        fetchData();
    }, [id, idSetoran, isVisible]);

    //=========
    // Effects for Fetching Setoran Data
    //==========
    useEffect(() => {
        const fetchData = async () => {
            let sumberData: DataSetoran[] | null | undefined = [];
            sumberData = await getDataSetoran('typeData', TypeData);


            if (sumberData !== null && sumberData !== undefined) {
                const foundData = sumberData?.find((data) => data.id === idSetoran) || null;
                setSetoran(foundData || null);
            }
        };
        fetchData();
    }, [type, id, idSetoran, isVisible]);

    //=========
    // Setting Default Values for Amount and Keterangan
    //==========
    // console.log('ini id setoran', idSetoran)
    // console.log('setoran', setoran?.setoran)
    // console.log('type Modal', typeModal)
    // console.log('kurang or tambah:', kurangOrTambah)
    // console.log(amount, 'data')

    useEffect(() => {
        if (idSetoran === null) {
            setAmount('');
            setKeterangan('');
            setPlaySnackbar(false);
        } else if (typeModal === 'update') {
            if (setoran?.setoran != null && setoran?.ket != null) {
                setAmount(formatNumber(setoran.setoran.toString()));
                setKeterangan(setoran.ket);
            }
        }
    }, [typeModal, idSetoran, setoran]);

    //=========
    // Handle Change Nominal
    //==========
    console.log('data:', data?.target || 0)

    const handleChangeTextNominal = useCallback((value: string): void => {

        const numericValue: string = value.replace(/\D/g, '');
        const formattedValue: number = parseInt(numericValue, 10) || 0;
        const maxValue: number = kurang || 0;

        if (typeModal === 'update') {
            if (!data) {
                return;
            }
            if (data && formattedValue <= data?.target) {
                setAmount(formatNumber(value));
            } else {
                console.log('ini error')
                setTrigerMaxInputNominal(true);
                setAmount(formatNumber(data?.target.toString()));
            }
        }

        if (kurangOrTambah === 'tambah') {
            if (formattedValue <= maxValue) {
                setAmount(formatNumber(value));
            } else {
                setTrigerMaxInputNominal(true);
                setAmount(formatNumber(maxValue.toString()));
            }
        } else if (kurangOrTambah === 'kurang') {
            if (!data) {
                return;
            }
            if (formattedValue <= (data?.tabungan)) {
                setAmount(formatNumber(value));
            } else {
                setTrigerMaxInputNominal(true);
                setAmount(formatNumber(data?.tabungan.toString()));
            }
        }
    }, [amount, kurangOrTambah, typeModal, isVisible]);

    console.log('kurang or tambah', kurangOrTambah)

    //=========
    // Handle Close Snackbar
    //==========
    const handleClose = useMemo((): void => {
        return setPlaySnackbar(false);
    }, [playSnackbar]);

    //=========
    // Handle Change Keterangan
    //==========
    const handleChangeTextKeterangan = useCallback((value: string): void => {
        if (value.length >= 30) {
            setTrigerMaxInputKet(true);
            setKeterangan(value);
        } else {
            setKeterangan(value);
        }
    }, [keterangan]);

    //=========
    // Handle Save Data
    //==========
    const handleSimpan = useCallback(async (): Promise<void> => {
        if (amount === '' && keterangan === '') {
            console.log('not found');
            return;
        }

        if (typeModal !== 'update' && type) {
            let data: DataSetoran | null = null;
            data = {
                idKeuangan: Number(id),
                setoran: Number(formattedNonDecimal(amount)),
                plus: kurangOrTambah === 'tambah' ? true : false,
                date: new Date().toISOString(),
                ket: keterangan,
            };

            if (data !== null) {
                await addDataSetoran(data, TypeData);
                onCancel();
                setAmount('');
                setKeterangan('');
                console.log('data tersimpan');

                if (kurangOrTambah === 'kurang') {
                    if (dataTabungan === null) {
                        return;
                    }
                    // const dataKurang = (dataTabungan ?? 0) - Number(formattedNonDecimal(amount));
                    // if (dataKurang >= 0) {
                    //     await kurangTabungan(id.toString(), dataKurang, keterangan, TypeData);
                    //     setAmount('');
                    //     setKeterangan('');
                    //     console.log('data dikurangi baru');
                    // } else {
                    //     return console.log('salah');
                    // }
                }
            } else {
                return;
            }
        } else {
            if (setoran === null) {
                return;
            }
            await updateSetoran(idSetoran?.toString() || '', Number(formattedNonDecimal(amount)), keterangan);
            setAmount('');
            setKeterangan('');
            onCancel();
            console.log('data setoran', setoran);
        }
    }, [amount, id, idSetoran, keterangan, kurangOrTambah, setoran, typeModal, dataTabungan]);

    const handleClear = useCallback((): void => {
        setAmount('');
        setKeterangan('');
    }, []);


    // ==================
    // Custom Hook
    // ==================

    const { inputRef: inputRefNominal, borderColor: borderColorNominal } = useBorderInputUseRefModal(trigerMaxInputNominal, setTrigerMaxInputNominal)
    const { inputRef: inputRefKet, borderColor: borderColorKet } = useBorderInputUseRefModal(trigerMaxInputKet, setTrigerMaxInputKet)



    return (
        <Modal visible={isVisible} transparent={true} statusBarTranslucent={true} animationType="fade" onRequestClose={onCancel}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => setPopUp(false)}>
                    <View style={styles.containerContent}>
                        <Text style={styles.textTitle}>{title}</Text>

                        {/* input nominal */}
                        <View style={styles.containerInput}>
                            <StyleInput
                                useRef={inputRefNominal as RefObject<TextInput>}
                                icon={true}
                                nameIcon={'local-atm'}
                                sizeIcon={28}
                                colorIcon={'black'}
                                typeKeboard={'numeric'}
                                label={'Nominal'}
                                amount={amount}
                                handleChangeText={handleChangeTextNominal}
                                buttonPopUp={true}
                                setPopUp={setPopUp}
                                custom={[{ height: height / 17, marginBottom: '2%' }, borderColorNominal]}
                                popUp={popUp} />
                            {kurangOrTambah === 'kurang' && trigerMaxInputNominal && <TextWarning message={'Nominal tidak melebihi tabungan'} />}
                            {kurangOrTambah === 'tambah' && trigerMaxInputNominal && <TextWarning message={'Nominal tidak melebihi kekurangan'} />}
                        </View>

                        {/* input keterangan */}
                        <View style={styles.containerInput}>
                            <StyleInput
                                useRef={inputRefKet as RefObject<TextInput>}
                                icon={true}
                                nameIcon={'filter-list'}
                                sizeIcon={28}
                                colorIcon={'black'}
                                typeKeboard={'default'}
                                label={'Keterangan'}
                                amount={keterangan}
                                max={30}
                                widthInput={width / 2}
                                custom={[{ height: height / 17, marginBottom: '2%' }, borderColorKet]}
                                handleChangeText={handleChangeTextKeterangan} />
                            {trigerMaxInputKet && <TextWarning message={'Maksimal 30 Karakter'} />}
                        </View>

                        {/* Tombol Cancel Bisa Ditekan */}
                        <View style={styles.containerButtonBottom}>
                            <ButtonBasic
                                handleButton={[onCancel, () => handleClear()]}
                                label="Cancel"
                                custom={{ backgroundColor: 'white', width: width / 4, height: height / 22, borderColor: 'black', borderWidth: 1 }}
                                customText={{ color: 'black' }} />
                            <ButtonBasic
                                handleButton={[handleSimpan]}
                                label="Simpan"
                                customText={{ fontFamily: 'Poppins-Bold', }}
                                custom={{ width: width / 4, height: height / 22, borderColor: '#32CD32', borderWidth: 1 }} />
                        </View>
                        <ComponentSnackbar
                            playSnackbar={playSnackbar}
                            handleClose={() => handleClose}
                            infoSnackbar={snackbarConditional === 'nominal' ? 'Nominal melebihi limit' : snackbarConditional === 'kurang' ? 'Nominal melebihi tabungan' : 'isi tidak lebih dari 30 karakter'} />
                    </View>
                </TouchableWithoutFeedback>
            </View >
        </Modal >
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    containerContent: {
        minWidth: width / 1.3,
        maxWidth: width / 1.3,
        // MinHeight: height / 2.7,
        minHeight: height / 2.7,
        maxHeight: height / 2.7,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: width / 20,
        paddingHorizontal: width / 35,
        gap: 3,
        zIndex: 10,   // Pastikan berada di atas
        elevation: 5,  // Untuk Android
        position: 'relative',
        borderRadius: 12
    },
    textTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        marginBottom: '4%'
    },
    // input container 
    inputContainer: {
        width: '90%',
        height: '17%',
        borderColor: 'black',
        borderWidth: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%',
        marginBottom: '10%'
    },
    input: {
        width: '70%',
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },
    buttonCancel: {
        padding: 10,
        backgroundColor: 'red'
    },
    popUpContainer: {
        position: 'absolute',
        top: '80%',
        left: '28%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        gap: 3,
        width: '80%',
        backgroundColor: '#D9D9D9',
        paddingLeft: '10%',
        paddingBottom: height / 11,
        paddingTop: '10%',
        zIndex: 10,
    },
    popUpText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,

    },
    containerButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerListPopUp: {
        height: '40%',
    },
    popUpButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    containerButtonBottom: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '10%'
    },
    snackBar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSnackBar: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    },
    containerInput: {
        width: width / 1.4,
        height: height / 10,
        justifyContent: 'flex-start',
        alignItems: 'center',

    }

})

export default memo(SetoranModal);

