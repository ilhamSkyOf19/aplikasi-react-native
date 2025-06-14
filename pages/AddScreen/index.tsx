import StyleInput from '@/components/input/StyleInput';
import ComponentSnackbar from '@/components/Snackbar';
import { useContextAdd } from '@/context/AddContext';
import { useCurrencyContext } from '@/context/CurencyContext';
import { currencyList } from '@/data/typeCurrency';
import { formatNumber, formattedNonDecimal, height, width } from '@/utils/utils';
import { MaterialIcons } from '@expo/vector-icons';
import React, { RefObject, useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
// import { useDatabase } from '@/context/DatabaseContext';
import CurrencyModal from '@/components/modal/CurrencyModal';
import EstimasiModal from '@/components/modal/EstimasiModal';
import ImagePickerModal from '@/components/modal/ImagePickerModal';
import TextWarning from '@/components/TextWarning';
import { useBorderUseRef } from '@/hooks/BorderUseRef';
import { DataKeuangan, SelectedType } from '@/interface/type';
import deleteImg from '@/service/deleteService/deleteImg.service';
import { getData } from '@/service/getData/get.service';
import UpdateAllData from '@/service/updateService/updateAll.service';
import { handleSaveLokal } from '@/utils/saveImageLocally';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addDataKeuangan } from '../../service/addService/addKeuangan.service';


// =================
// Interface Props
// =================

interface LabelProps {
    label: string;
}

interface InputImageProps {
    handleEvent: () => void
    imgUri?: string;
}

const add: React.FC = () => {
    //=================
    // State & Data
    //=================
    const [datas, setDatas] = useState<DataKeuangan | null>(null);
    const [alredy, setAlredy] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [uriImg, setUriImg] = useState<string>('');
    const [savedUri, setSavedUri] = useState<string>('kosong');
    const [snackbarConditional, setSnackbarConditional] = useState<string>('');
    const [playSnackbar, setPlaySnackbar] = useState<boolean>(false);
    const [nama, setNama] = useState<string>('');
    const [target, setTarget] = useState<string>('');
    const [estimasi, setEstimasi] = useState<string>('');
    const [popUp, setPopUp] = useState<boolean>(false);
    const [modalEstimasi, setModalEstimasi] = useState<boolean>(false);
    const [mataUang, setMataUang] = useState<string>('');
    const [modalMataUang, setModalMataUang] = useState<boolean>(false);
    const [trigerInputNama, setTrigerInputNama] = useState<boolean>(false);
    const [trigerInputTarget, setTrigerInputTarget] = useState<boolean>(false);
    const [trigerInputEstimasi, setTrigerInputEstimasi] = useState<boolean>(false);
    const [warningMaxInputNama, setWarningMaxInputNama] = useState<boolean>(false);
    const [warningMaxInputTarget, setWarningMaxInputTarget] = useState<boolean>(false);
    const [warningMaxInputEstimasi, setWarningMaxInputEstimasi] = useState<boolean>(false);

    //=================
    // Context & Navigation
    //=================
    const { currency, setCurrency } = useCurrencyContext();
    const { triger, setTriger } = useContextAdd();
    const navigation = useNavigation();


    // =================
    // Get Params
    // =================
    const params = useLocalSearchParams<{ typeData?: SelectedType, id?: string, tipe?: string }>();
    const { typeData, id, tipe } = params || {};

    //=================
    // useRef
    //=================
    const scrollRef = useRef<ScrollView>(null);

    //=================
    // useEffect
    //=================
    useEffect(() => { setTriger(false); }, []);

    useEffect(() => {
        currencyList.map((item, index) => {
            if ((index + 1) === Number(currency)) {
                setMataUang(`${item.code} - ${item.countries}`);
            }
        })
    }, [currency]);

    useEffect(() => {
        if (triger === true) {
            const timer = setTimeout(() => {
                setTriger(false);
                console.log('render')
            }, 0)

            return () => clearTimeout(timer);
        }
    }, [triger])


    useEffect(() => {
        if (triger === true) {
            if (!nama) return setTrigerInputNama(true);
            if (!estimasi || estimasi === '') return setTrigerInputEstimasi(true);
            if (tipe === 'edit') {
                if (Number(formattedNonDecimal(target)) <= (datas?.tabungan || 0)) {
                    setWarningMaxInputTarget(true);
                    setTrigerInputTarget(false);
                    return;
                }

                if (uriImg === datas?.img) {
                    setSavedUri(datas.img);
                } else if (uriImg === '') {
                    setSavedUri('');
                } else {
                    handleSaveLokal(uriImg, (uri) => setSavedUri(uri));
                }
            } else if (!target || target === '') {
                setTrigerInputTarget(true);
            } else if (uriImg === '') {
                setSavedUri('');
            } else {
                handleSaveLokal(uriImg, setSavedUri);
            }
        }
    }, [triger, tipe, id, alredy, uriImg, savedUri]);

    useEffect(() => {
        const saveData = async () => {
            if (tipe === 'edit' && alredy === true) {
                await handleUpdate();
                setTriger(false);
                setDatas(null);
                navigation.goBack();
            } else {
                await handleSimpan();
                setTriger(false);
                navigation.goBack();
            }
        };
        if (savedUri !== 'kosong') {
            console.log('save')
            saveData();
        }
    }, [savedUri]);


    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                let getDatas: DataKeuangan[] | null | undefined = [];
                if (typeData === 'harian') getDatas = await getData('dataKeuanganHarian', 'belum');
                else if (typeData === 'mingguan') getDatas = await getData('dataKeuanganMingguan', 'belum');
                else if (typeData === 'bulanan') getDatas = await getData('dataKeuanganBulanan', 'belum');
                if (getDatas) {
                    const found = getDatas.find((data) => data.id === id) || null;
                    setDatas(found);
                }
            };
            fetchData();
        }
    }, [id, typeData, tipe]);

    useEffect(() => {
        if (id && tipe === 'edit' && datas) {
            setNama(datas?.nama || '');
            setTarget(formatNumber(datas?.target.toString()));
            setEstimasi(formatNumber(datas?.targetSetoran.toString()));
            setUriImg(datas?.img || '');
            setCurrency(datas?.idCurrency);

            currencyList.map((item, index) => {
                if ((index + 1) === Number(datas?.idCurrency)) {
                    setMataUang(`${item.code} - ${item.countries}`);
                }
            });
            setAlredy(true);
        }
    }, [tipe, datas]);

    //=================
    // Handlers
    //=================
    const handleEventInputImage = useCallback(() => {
        setVisible(true);
    }, []);

    const handleUri = (data: string | null) => {
        setUriImg(data ?? '');
    }

    const handleInputName = useCallback((value: string): void => {
        if (value.length >= 20) {
            setWarningMaxInputNama(true);
            setNama(value);
        } else {
            setNama(value);
        }
    }, []);


    const handleInputTarget = useCallback((value: string): void => {
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = parseInt(numericValue, 10) || 0;
        const maxValue = 999999999999;
        if (formattedValue >= maxValue) {
            setTrigerInputTarget(true);
            setTarget(formatNumber(value));
        } else if (tipe === 'edit') {
            if (formattedValue <= (datas?.tabungan || 0)) {
                setWarningMaxInputTarget(true);
                setTarget(formatNumber(value));
            } else if (formattedValue >= (datas?.tabungan || 0)) {
                setWarningMaxInputTarget(false);
                setTarget(formatNumber(value));
            }
        } else {
            setTarget(formatNumber(value));
        }
    }, [datas]);


    const handleInputEstimasi = useCallback((value: string): void => {
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = parseInt(numericValue, 10) || 0;
        const numericTarget = target.replace(/\D/g, '');
        const maxValue = parseInt(numericTarget, 10) || 0;

        if (target.length > 0) {
            if (formattedValue >= maxValue) {
                setWarningMaxInputEstimasi(true);
                setPlaySnackbar(true);
                setSnackbarConditional('estimasi');
                setEstimasi(formatNumber(value));
                return setEstimasi(formatNumber(maxValue.toString()));
            } else {
                setWarningMaxInputEstimasi(false);
                setPlaySnackbar(false);
                setEstimasi(formatNumber(value.toString()));
            }
        } else {
            if (tipe === 'edit') {
                setPlaySnackbar(true);
                setSnackbarConditional('notTarget');
                setTrigerInputTarget(false);
                return setEstimasi('');
            }
            setTrigerInputEstimasi(false);
            setWarningMaxInputEstimasi(false);
            setTrigerInputTarget(true);
            return setEstimasi('');
        }
    }, [target]);




    // const handleScrollEstimasi = useCallback(() => {
    //     scrollRef.current?.scrollTo({ y: 250, animated: true });
    // }, []);

    const handleModalEstimasi = useCallback((): void => {
        if (!target) {
            if (tipe === 'edit') {
                setWarningMaxInputTarget(true);
            } else {
                setTrigerInputTarget(true);
            }
        } else if (!estimasi) {
            setTrigerInputEstimasi(true);
        } else {
            setModalEstimasi(prev => !prev);
        }
    }, [target, estimasi]);

    const handleModalMataUang = useCallback((): void => {
        setModalMataUang(prev => !prev);
    }, []);

    const handleClickMataUang = useCallback((): void => {
        setModalMataUang(true);
    }, []);

    const handleCloseSnackbar = (): void => {
        setPlaySnackbar(false);
    };

    //=================
    // Save / Update
    //=================
    const handleSimpan = useCallback(async () => {
        if (!nama || !target || !estimasi) return;

        const data: DataKeuangan = {
            id: '',
            idCurrency: Number(currency),
            img: savedUri || '',
            nama,
            target: Number(formattedNonDecimal(target)),
            targetSetoran: Number(formattedNonDecimal(estimasi)),
            tabungan: 0,
            date: new Date().toISOString(),
            tercapai: 'belum',
        };

        if (typeData === 'harian') await addDataKeuangan('dataKeuanganHarian', data);
        else if (typeData === 'mingguan') await addDataKeuangan('dataKeuanganMingguan', data);
        else if (typeData === 'bulanan') await addDataKeuangan('dataKeuanganBulanan', data);

        setNama('');
        setTarget('');
        setEstimasi('');
        setUriImg('');
        setSavedUri('');
    }, [nama, target, estimasi, savedUri]);


    const handleUpdate = useCallback(async () => {
        if (!nama || !target || !estimasi || !uriImg) {

        };

        if (datas && id) {
            const deleteImage = async () => {
                await deleteImg(datas.img);
            };

            if (datas.img !== savedUri) {
                deleteImage();
            }

            const data: DataKeuangan = {
                id: datas?.id,
                idCurrency: Number(currency),
                img: savedUri || '',
                nama,
                target: Number(formattedNonDecimal(target)),
                targetSetoran: Number(formattedNonDecimal(estimasi)),
                tabungan: datas.tabungan,
                date: datas.date,
                tercapai: 'belum',
            };

            switch (typeData) {
                case 'harian':
                    await UpdateAllData(datas.id, 'dataKeuanganHarian', data);
                    break;
                case 'mingguan':
                    await UpdateAllData(datas.id, 'dataKeuanganMingguan', data);
                    break;
                case 'bulanan':
                    await UpdateAllData(datas.id, 'dataKeuanganBulanan', data);
                    break;
            }

            setNama('');
            setTarget('');
            setEstimasi('');
            setUriImg('');
            setSavedUri('');
        }
    }, [nama, target, estimasi, uriImg, datas, id, typeData, currency, savedUri]);




    // ===============
    // custom Hook
    // ===============

    const { inputRef, borderColor } = useBorderUseRef(trigerInputTarget, setTrigerInputTarget, target, warningMaxInputTarget,);
    const { inputRef: inputRefNama, borderColor: borderColorNama } = useBorderUseRef(trigerInputNama, setTrigerInputNama, nama, warningMaxInputNama, setWarningMaxInputNama, 'nama');
    const { inputRef: inputRefEstimasi, borderColor: borderColorEstimasi } = useBorderUseRef(trigerInputEstimasi, setTrigerInputEstimasi, estimasi, warningMaxInputEstimasi, setWarningMaxInputEstimasi, 'estimasi');


    return (

        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            extraScrollHeight={140}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
        >
            <TouchableWithoutFeedback onPress={() => setPopUp(false)}>
                <View style={styles.containerElement}>
                    {/* input image */}
                    <InputImage handleEvent={handleEventInputImage} imgUri={uriImg} />
                    {/* input nama tabungan */}
                    <View style={styles.containerInputName}>
                        <Label label='Nama Tabungan' />
                        <View
                            style={styles.containerInputEstimasi}>
                            <StyleInput
                                useRef={inputRefNama as RefObject<TextInput>}
                                amount={nama}
                                handleChangeText={handleInputName}
                                label='Nama'
                                typeKeboard='default'
                                custom={[{ marginBottom: 0, height: '65%', borderRadius: 7, }, borderColorNama]} fontSize={15}
                                max={20}
                                widthInput={width / 1} />
                            {trigerInputNama && <TextWarning message='Nama Tabungan tidak boleh kosong' />}
                            {warningMaxInputNama && <TextWarning message='Nama Tabungan tidak boleh lebih dari 20 karakter' />}
                        </View>
                    </View>
                    {/* input target */}
                    <View style={[styles.containerInputName, warningMaxInputTarget ? { marginBottom: '12%' } : { marginBottom: '7%' }]}>
                        <Label label='Target Tabungan' />
                        <View style={styles.containerInputEstimasi}>
                            <StyleInput
                                useRef={inputRef as RefObject<TextInput>}
                                icon={true}
                                nameIcon={'money'}
                                sizeIcon={28}
                                colorIcon={'black'}
                                typeKeboard={'numeric'}
                                label={'Nominal'}
                                amount={target}
                                buttonPopUp={true}
                                custom={[{ marginBottom: 0, height: '65%', borderRadius: 7, gap: 10 }, borderColor]}
                                fontSize={15}
                                popUp={popUp}
                                setPopUp={setPopUp}
                                max={15}
                                handleChangeText={handleInputTarget} />
                            {trigerInputTarget && <TextWarning message='Target Tabungan tidak boleh kosong' />}
                            {warningMaxInputTarget && <TextWarning message='Target tidak boleh kurang dari tabungan yang sudah terkumpul' />}
                        </View>
                    </View>
                    {/* mata uang */}
                    <View style={styles.containerInputName}>
                        <Label label='Mata Uang' />
                        <View style={styles.containerInputEstimasi}>
                            <StyleInput
                                flags={true}
                                typeKeboard={'numeric'}
                                label={'Mata Uang'}
                                amount={mataUang}
                                buttonPopUp={true}
                                custom={{ marginBottom: 0, height: '65%', borderRadius: 7, gap: 10 }}
                                fontSize={15}
                                popUp={modalMataUang}
                                setPopUp={setModalMataUang}
                                max={20}
                                typePopUp={'mataUang'}
                                handleFocus={handleClickMataUang}
                                widthInput={width / 1.4} />

                        </View>
                    </View>
                    {/* input estimasi pengisian */}
                    <View style={[styles.containerInputName, { gap: 0 }]}>
                        <Label label={`Estimasi Pengisian ${typeData === 'harian' ? 'Harian' : typeData === 'mingguan' ? 'Mingguan' : 'Bulanan'} `} />
                        <View style={[styles.containerInputEstimasi, { justifyContent: 'space-between', paddingHorizontal: '5%', flexDirection: 'row', marginTop: '-2%' }]}>
                            <StyleInput
                                useRef={inputRefEstimasi as RefObject<TextInput>}
                                icon={true}
                                nameIcon={'money'}
                                sizeIcon={28}
                                colorIcon={'black'}
                                typeKeboard={'numeric'}
                                label={'Nominal'}
                                amount={estimasi}
                                handleChangeText={handleInputEstimasi}
                                custom={[{ marginBottom: 0, width: '85%', height: '65%', borderRadius: 7, gap: 10 }, borderColorEstimasi]}
                                fontSize={15}
                                max={15}
                                // handleFocus={handleScrollEstimasi}
                                widthInput={width / 1.5} />
                            {/* modal estimasi */}
                            <TouchableOpacity onPress={handleModalEstimasi} style={styles.iconEstimasi}>
                                <MaterialIcons name='event-available' size={28} color='rgba(0, 0, 0, 0.5)' />
                            </TouchableOpacity>
                        </View>
                        {trigerInputEstimasi && <TextWarning message='Estimasi tidak boleh kosong' />}
                    </View>
                    {/* snackbar */}
                    <View style={styles.containerSnackbar}>
                        <ComponentSnackbar
                            playSnackbar={playSnackbar}
                            handleClose={handleCloseSnackbar}
                            infoSnackbar={
                                snackbarConditional === 'estimasi' ? 'Estimasi tidak melebihi Nilai Target' :
                                    snackbarConditional === 'notTarget' ? 'Target tidak boleh kosong' : ''}
                            custom={{
                                marginBottom: height / 2.5,
                            }} />

                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View>
                <ImagePickerModal isVisible={visible} onCancel={() => setVisible(false)} handleUri={handleUri} />
            </View>
            <View>
                <EstimasiModal onCancel={handleModalEstimasi} isVisible={modalEstimasi} target={target} estimasi={estimasi} />
            </View>
            <View>
                <CurrencyModal onCancel={handleModalMataUang} isVisible={modalMataUang} />
            </View>
        </KeyboardAwareScrollView>

    )
}



const Label: React.FC<LabelProps> = ({ label }) => {
    return (
        <View style={styles.containerLabelInput}>
            <Text style={styles.label}>
                {label}
            </Text>
        </View>
    )
}



const InputImage: React.FC<InputImageProps> = ({ imgUri, handleEvent }) => {
    return (
        <View style={styles.containerInputImage}>
            <TouchableOpacity onPress={handleEvent}>
                <View
                    style={styles.containerInputImage}
                >

                    <View style={styles.inputImage}>
                        {imgUri ? (
                            <Image source={{ uri: imgUri }} style={styles.previewImage} />
                        ) : (
                            <MaterialIcons name='add-photo-alternate' size={40} color='rgba(0, 0, 0, 0.3)' />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 0,
        backgroundColor: '#fff',
    },

    containerElement: {
        minWidth: width,
        minHeight: height,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    // input image
    containerInputImage: {
        minWidth: '100%',
        maxWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: height / 60,
        marginBottom: height / 45
    },
    inputImage: {
        width: width / 1.15,
        height: height / 3.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.13)',
        borderRadius: 10,
        overflow: 'hidden',
    },
    containerInputName: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '2%',
        marginBottom: '7%',
        gap: 6,
    },
    containerLabelInput: {
        width: '100%',
        paddingHorizontal: '5%',
        justifyContent: 'flex-start',
    },
    label: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    containerSnackbar: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width / 8
    },
    containerInputEstimasi: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
    },
    iconEstimasi: {
        height: '55%',
        width: '10%',
        paddingTop: '2%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '105%',
        aspectRatio: 4 / 3,
        resizeMode: 'cover',
        marginTop: 10,
    },
})



export default add;