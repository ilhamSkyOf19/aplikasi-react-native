import DeleteModal from '@/components/modal/DeleteModal';
import RiwayatModal from '@/components/modal/RiwayatModal';
import SetoranModal from '@/components/modal/SetoranModal';
import ButtonSmall from '@/components/ui/ButtonSmall';
import { useIdContext } from '@/context/IdContext';
import { useModalDeleteTabungan } from '@/context/ModalDeleteTabunganContext';
import { CurrencyInfo, currencyList } from '@/data/typeCurrency';
import { DataKeuangan, DataSetoran, TypeData } from '@/interface/type';
import { getDataKeuangan } from '@/service/getData/getDataKeuangan.service';
import { updateTabunganMulti } from '@/service/updateService/updateTercapai.service';
import { formatCurrency, formatDate, formatPersentase, getProgressColor, height, penghitunganKurang, width } from '@/utils/utils';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import LoadingCircel from '../../components/ui/LoadingCircel';
import { getDataSetoran } from '../../service/getData/getSetoran.service';
import { updateTabungan } from '../../service/updateService/updateTabungan.service';





// ======================
// Props Component
// ======================

interface PropsText {       // Props Text
    setoran: number;
    plus: boolean;
    date: string;
    ket: string;
    handleVisibleRiwayat: () => void;
    handleID: (data: number) => void;
    handleTitle: (title: string) => void;
    id: number;
    idSetoran: number;
    currency: CurrencyInfo
}

interface PropsContentOne {       // Props Content One
    target: number;
    setoran: number;
    persentaseBorder: number;
    persentase: number;
    currency: CurrencyInfo;
}

interface imgProps {                // Props Image
    img: string | undefined;
}


interface TextTargetAndSetoranComponentProps {     // Props Text Target & Setoran
    target: number;
    setoran: number;
    currency: CurrencyInfo
}



interface PropsContentTwo {                 // Props Content Two
    handleTitle: (title: string) => void;
    handleVisible: () => void;
    handleVisibleRiwayat: () => void;
    kekurangan: number;
    terkumpul: number;
    handleID: (data: number) => void;
    datas?: DataKeuangan; // Array dari DataSetoran
    setIsIdSetoran: (value: number | undefined) => void;
    datasSetoran: DataSetoran[];
    setKurangOrTambah: (value: string) => void;
    currency: CurrencyInfo
}



const SetoranPages: React.FC = () => {
    // =======================
    // Navigation & Context
    // =======================
    const navigation = useNavigation();

    const params: { id: string; typeData: string } = useLocalSearchParams();
    const { id, typeData } = params;
    // const { id } = useIdContext();
    const { isVisibleModalDeleteTabungan, setVisibleModalDeleteTabungan } = useModalDeleteTabungan();


    // =======================
    // State - UI Modal / Popups
    // =======================
    const [isPlayVisible, setIsPlayVisible] = useState<boolean>(false);
    const [isPlayVisibleRiwayat, setIsPlayVisibleRiwayat] = useState<boolean>(false);

    // =======================
    // State - Modal Handling
    // =======================
    const [typeModal, setTypeModal] = useState<string>('');
    const [isIdSetoran, setIsIdSetoran] = useState<number | undefined>(undefined);
    const [dataIdSetoranModal, setDataIdSetoranModal] = useState<number | null>(null);

    // =======================
    // State - Data Keuangan
    // =======================
    const [datas, setDatas] = useState<DataKeuangan | null>(null);
    const [datasSetoran, setDatasSetoran] = useState<DataSetoran[] | null>(null);

    // =======================
    // State - Perhitungan
    // =======================
    const [target, setTarget] = useState<number | undefined>(undefined);
    const [setoran, setSetoran] = useState<number | undefined>(undefined);
    const [tabungan, setTabungan] = useState<number>(0);
    const [persentaseBorder, setPersentaseBorder] = useState<number>(0);
    const [persentase, setPersentase] = useState<number>(0);
    const [kurang, setKurang] = useState<number>(0);
    const [kurangOrTambah, setKurangOrTambah] = useState<string>('');

    // ======================
    // state type db
    // ======================
    const [typeDb, setTypeDb] = useState<TypeData>('');

    // =======================
    // State - Lainnya
    // =======================
    const [title, setTitle] = useState<string>(' ');
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // =======================
    // Callback Functions
    // =======================
    const handleTitle = useCallback((newTitle: string) => {
        setTitle(newTitle);
    }, []);

    const handleVisible = useCallback((id?: number, typeModal?: string, kurangOrTambah?: string) => {
        setIsIdSetoran(id ?? 0);
        setTypeModal(typeModal || '');
        setIsPlayVisible((prev) => !prev);
        setIsPlayVisibleRiwayat(false);
        setKurangOrTambah(kurangOrTambah || '');
    }, []);

    const handleVisibleRiwayat = useCallback(() => {
        setIsPlayVisibleRiwayat((prev) => !prev);
    }, []);

    const handleID = useCallback((data: number) => {
        setDataIdSetoranModal(data);
    }, []);

    const onCancelModalTabungan = useCallback((): void => {
        setVisibleModalDeleteTabungan(false);
    }, []);

    // =======================
    // useFocusEffect - Get Data Keuangan
    // =======================
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                if (!id || !typeDb) return;

                setLoading(true);
                try {
                    const getDatas = await getDataKeuangan(typeDb, 'belum');
                    if (getDatas) {
                        const found = getDatas.find((data) => data.id === Number(id)) || null;
                        setDatas(found);
                    }
                } catch (error) {
                    console.error('Gagal mengambil data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [id, typeDb])
    );



    // =======================
    // useFocusEffect - Get Data Setoran
    // =======================
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    let getDatas: DataSetoran[] | null | undefined = [];
                    getDatas = await getDataSetoran('typeData', typeDb);


                    if (getDatas) {
                        const found = getDatas.filter((data) => data.idKeuangan === Number(id)) || null;
                        setDatasSetoran(found);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, [typeData, id, tabungan, isPlayVisible, isPlayVisibleRiwayat, typeDb]));


    // ====================
    // UserEffect type db 
    // ====================
    useEffect(() => {
        if (typeData === 'harian') setTypeDb('dataHarian');
        if (typeData === 'mingguan') setTypeDb('dataMingguan');
        if (typeData === 'bulanan') setTypeDb('dataBulanan');
    }, [typeData])



    // =======================
    // useEffect - Tabungan Berdasarkan Setoran
    // =======================
    useEffect(() => {
        if (datasSetoran && datasSetoran.length > 0) {
            const plus = datasSetoran.filter(i => i.plus).map(i => i.setoran).reduce((a, b) => a + b, 0);
            const minus = datasSetoran.filter(i => !i.plus).map(i => i.setoran).reduce((a, b) => a + b, 0);
            setTabungan(plus - minus);
        } else {
            setTabungan(0);
        }
    }, [datasSetoran, isPlayVisible, isPlayVisibleRiwayat, typeDb]);

    // =======================
    // useEffect - Currency
    // =======================
    useEffect(() => {
        const found = currencyList.find((_, index) => (index + 1) === datas?.idCurrency);
        if (found) setSelectedCurrency(found);
    }, [datas]);

    // =======================
    // useEffect - Update Target dan Persentase
    // =======================
    useEffect(() => {
        if (!datas || !id || tabungan === undefined) return;
        setTarget(datas.target);
        setSetoran(datas.targetSetoran);
        setPersentaseBorder(hasilPersentaseBorder);
        setPersentase(hasilPersentase);
    }, [datas, tabungan, kurang]);

    // =======================
    // useEffect - Update DB jika Tabungan Mencapai Target
    // =======================
    useEffect(() => {
        if (tabungan === undefined) return;

        const fetchData = async () => {
            if (typeData) await updateTabungan(id?.toString() || '', 'tabungan', tabungan);
        };

        const dataTercapai = async () => {
            if (tabungan !== datas?.target) return;
            const dateTercapai = new Date().toISOString();
            if (typeData) {
                await updateTabunganMulti(id?.toString() || '', {
                    tercapai: 'tercapai',
                    dateTercapai: dateTercapai
                });
            }
            router.back();
        };

        const fetchAll = async () => {
            await fetchData();
            await dataTercapai();
        };

        fetchAll();
    }, [tabungan]);

    // =======================
    // useMemo - Perhitungan
    // =======================
    const hasilPersentaseBorder = useMemo(() => {
        return (tabungan || 0) / (datas?.target || 0);
    }, [tabungan, datas?.target]);

    const hasilPersentase = useMemo(() => {
        return persentaseBorder * 100;
    }, [persentaseBorder]);

    const hasilKurang = useMemo((): number => {
        return penghitunganKurang(target, tabungan);
    }, [target, tabungan]);

    // =======================
    // useEffect - Update Kurang
    // =======================
    useEffect(() => {
        setKurang(hasilKurang);
    }, [hasilKurang]);





    return (
        <>
            {loading ?
                <LoadingCircel />
                :
                <>
                    <ScrollView
                        contentContainerStyle={[styles.containerScroll, { flexGrow: 1, paddingBottom: height / 8 }]}
                    >
                        <View style={styles.containerContent}>
                            <ImageContent img={datas?.img} />
                            <ContentOne target={target ?? 0} setoran={setoran ?? 0} persentaseBorder={persentaseBorder} persentase={persentase} currency={selectedCurrency as CurrencyInfo} />
                            <ContentTwo handleVisible={handleVisible} handleTitle={handleTitle} kekurangan={kurang} terkumpul={tabungan ?? 0} handleVisibleRiwayat={handleVisibleRiwayat} handleID={handleID} datas={datas ?? undefined} setIsIdSetoran={setIsIdSetoran} datasSetoran={datasSetoran ?? []} setKurangOrTambah={setKurangOrTambah} currency={selectedCurrency as CurrencyInfo} />
                        </View>
                    </ScrollView>
                    <View>
                        <SetoranModal isVisible={isPlayVisible} onCancel={handleVisible} title={title} idSetoran={isIdSetoran || 0} type={typeData ?? ''} kurangOrTambah={kurangOrTambah} typeModal={typeModal ?? ''} />
                    </View>
                    <View>
                        <RiwayatModal isVisible={isPlayVisibleRiwayat} onCancel={handleVisibleRiwayat} idSetoran={dataIdSetoranModal ?? 0} handleEdit={handleVisible} type={typeData ?? ''} currency={selectedCurrency as CurrencyInfo} />
                    </View>
                    <View>
                        <DeleteModal isVisible={isVisibleModalDeleteTabungan} onCancel={onCancelModalTabungan} id={id} typeModal={'deleteTabungan'} />
                    </View>
                </>
            }
        </>

    );

};


//==============
// Image Content
//==============


const ImageContentComponent: React.FC<imgProps> = ({ img }) => {
    return (
        <View style={styles.containerImageContent}>
            {img === '' && <MaterialIcons name='add-photo-alternate' size={40} color='rgba(0, 0, 0, 0.3)' />}
            {img && <Image source={{ uri: img }} style={styles.image} />}
        </View>
    )
}



//===============
// Content One
//===============
export const ContentOne: React.FC<PropsContentOne> = ({ target, setoran, persentaseBorder, persentase, currency }) => {
    return (
        <View style={styles.containerContentOne}>
            <TextTargetAndSetoran target={target} setoran={setoran} currency={currency as CurrencyInfo} />
            <View style={styles.containerProgres}>
                <Progress.Circle
                    size={40} // Ukuran lingkaran
                    progress={persentaseBorder} // 75% dalam format desimal (0.75)
                    thickness={2} // Ketebalan garis
                    color={getProgressColor(persentase)} // Warna garis progres
                    unfilledColor="#f0f0f0" // Warna latar belakang progres
                    showsText
                    textStyle={{
                        fontSize: 11,
                        fontWeight: 'regular',
                        color: 'black'
                    }}
                    formatText={() => `${formatPersentase(persentase)}%`} // Menampilkan angka persen di tengah
                />
            </View>
        </View>
    )
}

// ====================
// Text Target And Setoran
// ====================

const TextTargetAndSetoranComponent: React.FC<TextTargetAndSetoranComponentProps> = ({ target, setoran, currency }) => {
    return (
        <View style={styles.layoutFlex}>
            <Text style={[styles.textSemiBold, { fontSize: 14, fontFamily: 'Poppins-Regular' }]}>{formatCurrency(Number(target), currency?.locale || 'id-ID', currency?.code || 'IDR')}</Text>
            <Text style={[styles.textSemiBold, { fontFamily: 'Poppins-Bold' }]}>{formatCurrency(Number(setoran), currency?.locale || 'id-ID', currency?.code || 'IDR')} / hari</Text>
        </View>
    )
}





//===================
// content Two
//===================

export const ContentTwo: React.FC<PropsContentTwo> = ({ handleVisible, handleTitle, kekurangan, terkumpul, handleVisibleRiwayat, handleID, setIsIdSetoran, datasSetoran, datas, setKurangOrTambah, currency }) => {
    // memo
    const handleVisibleMemo = useCallback(() => {
        handleVisible();
    }, [])

    // handle Visible Riwayat
    const handleVisibleRiwayatMemo = useCallback(() => {
        handleVisibleRiwayat();
    }, [])
    return (
        <View style={styles.containerContentTwo}>
            <View style={styles.containerContentTwoChildOne}>
                <View style={styles.containerContentTwoChildOneLeftRight}>
                    <Text style={styles.textChildOne}>Kekurangan</Text>
                    <Text style={[styles.textChildOne, {
                        color: 'red',
                        fontFamily: 'Poppins-Bold',
                        fontSize:
                            kekurangan >= 1000000000000 ? 9 :
                                kekurangan >= 10000000000 ? 9 :
                                    kekurangan >= 100000000 ? 11 :
                                        kekurangan >= 10000000 ? 12 :
                                            kekurangan >= 0 ? 12 : 7,
                    }]}>- {formatCurrency(kekurangan, currency?.locale || 'id-ID', currency?.code || 'IDR')}</Text>
                </View>
                <View style={styles.lineSlice}></View>
                <View style={styles.containerContentTwoChildOneLeftRight}>
                    <Text style={styles.textChildOne}>Terkumpul</Text>
                    <Text style={[styles.textChildOne, {
                        color: '#32CD32',
                        fontFamily: 'Poppins-Bold',
                        fontSize:
                            terkumpul >= 1000000000000 ? 9 :
                                terkumpul >= 10000000000 ? 9 :
                                    terkumpul >= 100000000 ? 11 :
                                        terkumpul >= 10000000 ? 12 :
                                            terkumpul >= 0 ? 12 : 7,
                    }]}>+ {formatCurrency(terkumpul, currency?.locale || 'id-ID', currency?.code || 'IDR')}</Text>
                </View>
            </View>
            <View style={styles.lineContentChildOne}></View>
            <View style={styles.containerContentTwoChildTwo}>
                {datasSetoran && datasSetoran.length > 0
                    ?
                    datasSetoran.map((setoran) => (
                        <TextSetoran
                            key={setoran.id} // ID diambil dari dataSetoran
                            id={Number(datas?.id)} // ID utama dari dataKeuangan
                            idSetoran={Number(setoran?.id)} // ID setoran
                            setoran={setoran.setoran} // Nilai setoran
                            plus={setoran.plus} // Status setoran
                            date={formatDate(setoran.date, 'dd MMM yyyy')} // Format tanggal
                            ket={setoran.ket} // Keterangan setoran
                            handleVisibleRiwayat={handleVisibleRiwayatMemo}
                            handleID={handleID}
                            handleTitle={handleTitle}
                            currency={currency}
                        />
                    ))
                    : <Text>Belum ada setoran</Text>
                }

            </View>
            <View style={styles.containerButton}>
                <View style={styles.containerButtonChild}>
                    <ButtonSmall label={'Kurangi'} hijau={false} handleButton={[handleVisibleMemo, () => handleTitle('Kurangi'), () => setKurangOrTambah('kurang')]} />
                    <ButtonSmall label={'Tambahkan'} hijau={true} handleButton={[handleVisibleMemo, () => handleTitle('Tambahkan'), () => setIsIdSetoran(undefined), () => setKurangOrTambah('tambah')]} />
                </View>
            </View>
        </View>
    )
}

//===================
// Text Setoran
//===================

const TextSetoran: React.FC<PropsText> = ({ setoran, plus, date, ket, handleVisibleRiwayat, handleID, id, handleTitle, idSetoran, currency }) => {

    // ambil id dari context
    const { setId } = useIdContext();

    return (
        <TouchableOpacity onPress={() => { handleVisibleRiwayat(); handleID(idSetoran); setId(id); handleTitle('Edit') }
        }>
            <View style={styles.containerSetoran}>
                <View style={styles.containerTextSetoran}>
                    <Text style={styles.textChildTwo}>{date}</Text>
                    <Text style={[styles.textChildTwo, plus ? { color: '#32CD32' } : { color: 'red' }]}>
                        {plus ? `+` : `-`}{formatCurrency(setoran, currency?.locale || 'id-ID', currency?.code || 'IDR')}</Text>
                </View>
                <View style={styles.containerKeterangan}>
                    <Text style={styles.textKeterangan}>
                        {ket}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

// =================
// Memo
//==================
export const ImageContent = memo(ImageContentComponent);
export const TextTargetAndSetoran = memo(TextTargetAndSetoranComponent);


const styles = StyleSheet.create({
    containerScroll: {
        backgroundColor: 'white',
        maxWidth: width,
        minHeight: height,
    },
    // container content 
    containerContent: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: height / 50,
        minWidth: width,
        maxWidth: width,
        paddingBottom: height / 70,
        gap: 15,
    },

    containerImageContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.13)',
        minWidth: width / 1.2,
        maxWidth: width / 1.2,
        minHeight: height / 3.5,
        maxHeight: height / 3.5,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: width / 1.2,
        height: height / 3.5,
        resizeMode: 'cover'
    },
    // container content one
    containerContentOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: width / 1.2,
        maxWidth: width / 1.2,
        height: height / 10,
        paddingHorizontal: width / 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.75,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 13
    },
    textSemiBold: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,
        textAlign: 'center',
    },
    // layout flex
    layoutFlex: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 4
    },
    containerProgres: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    // container content two
    containerContentTwo: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minWidth: width / 1.2,
        maxWidth: width / 1.2,
        minHeight: height / 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.75,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 13,
        overflow: 'hidden',
        position: 'relative',
        paddingHorizontal: width / 20,
        paddingBottom: width / 9,
    },
    containerContentTwoChildOne: {
        backgroundColor: 'white',
        width: width / 1.2,
        height: height / 10,
        paddingHorizontal: width / 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        display: 'flex',
        gap: 10
    },
    containerContentTwoChildOneLeftRight: {
        backgroundColor: 'white',
        flex: 0.8,
        minHeight: height / 15,
        maxHeight: height / 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '1%'
    },

    lineContentChildOne: {
        position: 'absolute',
        width: width / 1.5,
        height: 1.5,
        backgroundColor: 'gray',
        top: height / 11,
        opacity: 0.2,
        borderRadius: 15
    },
    lineSlice: {
        position: 'absolute',
        width: width / 6,
        height: 1.5,
        backgroundColor: 'gray',
        top: height / 20,
        opacity: 0.2,
        borderRadius: 15,
        transform: [{ rotate: '90deg' }], // Rotasi 45 derajat
    },
    textChildOne: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 11,
        textAlign: 'center'
    },
    // containerContentTwoChildTwo
    containerContentTwoChildTwo: {
        backgroundColor: 'white',
        width: '100%',
        minHeight: height / 10,
        paddingHorizontal: width / 40,
        paddingBottom: width / 20,
        paddingTop: height / 60,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 13,
        marginBottom: height / 40
    },
    // setoran
    containerSetoran: {
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    // text setoran
    containerTextSetoran: {
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textChildTwo: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        textAlign: 'center'
    },
    containerButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
    },
    containerButtonChild: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        paddingRight: width / 40
    },
    // container keterangan
    containerKeterangan: {
        width: '70%',
    },
    textKeterangan: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
    }

})


export default SetoranPages
