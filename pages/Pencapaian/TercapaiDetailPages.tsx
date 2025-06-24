import DeleteModal from '@/components/modal/DeleteModal';
import { useModalDeleteTercapaiContext } from '@/context/ModalDeleteTercapaiContext';
import { CurrencyInfo, currencyList } from '@/data/typeCurrency';
import { DataKeuangan, DataSetoran } from '@/interface/type';
import { getDataTercapai } from '@/service/getData/getDataTercapai.service';
import { getDataSetoran } from '@/service/getData/getSetoran.service';
import { formatCurrency, height, waktuTercapai, width } from '@/utils/utils';
import { formatDate } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const TercapaiDetailPages: React.FC = () => {
    //=================
    // State
    //=================
    const [data, setData] = useState<DataKeuangan | undefined>(undefined); // data yang diambil dari localStorage
    const [dataSetoran, setDataSetoran] = useState<DataSetoran[]>([]); // data yang diambil dari localStorage
    const { isModalDeleteTercapai, setIsModalDeleteTercapai } = useModalDeleteTercapaiContext(); // kontrol modal delete
    const [tanggalDibuat, setTanggalDibuat] = useState<string>(''); // tanggal target dibuat
    const [tanggalFinish, setTanggalFinish] = useState<string>(''); // tanggal terakhir setoran
    const [currencySelected, setCurrencySelected] = useState<CurrencyInfo | undefined>(undefined); // data mata uang aktif

    //=================
    // Route Params
    //=================
    const params = useLocalSearchParams<{ id: string }>();
    const { id } = params || {};

    //=================
    // Function: Modal Delete Cancel
    //=================
    const onCancelModalTercapai = useCallback((): void => {
        setIsModalDeleteTercapai(false);
    }, []);

    //=================
    // useEffect: Ambil Data dari Local Storage Berdasarkan ID
    //=================
    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataTercapai('tercapai');
            if (result) {
                const findResult = result.find((item) => String(item.id) === String(id));
                setData(findResult);
            }

            const resultSetoran = await getDataSetoran('idKeuangan', id);
            if (resultSetoran) {
                setDataSetoran(resultSetoran);
            }
        };
        fetchData();
    }, [id]);

    //=================
    // useEffect: Set Tanggal Dibuat & Tanggal Finish
    //=================
    useEffect(() => {
        setTanggalDibuat(data?.date || '');
        setTanggalFinish(data?.dateTercapai || '');
    }, [data]);

    //=================
    // useEffect: Format dan Set Mata Uang yang Dipilih
    //=================
    useEffect(() => {
        const currency = currencyList.find((item, index) => (index + 1) === data?.idCurrency);
        setCurrencySelected(currency);
    }, [data]);

    //=================
    // useMemo: Hitung Waktu Tercapai
    //=================
    const handleDateTercapai: string = useMemo(() => {
        return waktuTercapai(tanggalFinish, tanggalDibuat);
    }, [tanggalDibuat, tanggalFinish]);




    // console.log('ini data setoran', data?.dataSetoran)



    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {data && currencySelected ? (
                    <View style={styles.container}>
                        <TitleComponent nama={data.nama} />
                        <ImgComponent img={data.img} />

                        <ContentOneComponent target={data.target} currencyList={currencySelected} handleDateTercapai={handleDateTercapai} tanggalDibuat={tanggalDibuat} tanggalFinish={tanggalFinish} />
                        <ContentSetoranComponent dataSetoran={dataSetoran} currencyList={currencySelected} />
                    </View>
                ) : null}
            </ScrollView>
            <View>
                <DeleteModal isVisible={isModalDeleteTercapai} onCancel={onCancelModalTercapai} id={id} typeModal={'deleteTercapai'} />
            </View>
        </>

    )
}

// interface compoentn
interface ComponentPops {
    nama?: string;
    img?: string;
    // content One
    target?: number;
    currencyList?: CurrencyInfo;
    handleDateTercapai?: string;
    tanggalDibuat?: string;
    tanggalFinish?: string;
    // content Setoran
    dataSetoran?: DataSetoran[];
}


// title component 
const TitleComponent: React.FC<ComponentPops> = ({ nama }) => {
    return (
        <View style={styles.containerTitle}>
            <Text style={styles.title}>
                {nama}
            </Text>
        </View>
    )
}



// image component
const ImgComponent: React.FC<ComponentPops> = ({ img }) => {
    return (
        <View style={styles.containerImg}>
            {img && <Image source={{ uri: img }} style={styles.img} />}
        </View>

    )
}

const ContentOneComponent: React.FC<ComponentPops> = ({ target, currencyList, handleDateTercapai, tanggalDibuat, tanggalFinish }) => {
    return (
        <>
            {
                currencyList ? (
                    <View style={styles.containerContentOne}>
                        <View style={styles.containerContent}>
                            <Text style={styles.teksTarget}>{formatCurrency(target || 0, currencyList?.locale, currencyList?.code)}</Text>
                            <Text style={styles.dateTercapai}>Tercapai Dalam {handleDateTercapai} hari</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.containerContent}>
                            <View style={styles.containerTgl}>
                                <Text style={styles.tanggal}>Tanggal Dibuat</Text>
                                <Text style={styles.tanggal}>{formatDate(tanggalDibuat ?? '', 'dd MMM yyyy')}</Text>
                            </View>
                            <View style={styles.containerTgl}>
                                <Text style={styles.tanggal}>Tanggal Tercapai</Text>
                                <Text style={styles.tanggal}>{formatDate(tanggalFinish ?? '', 'dd MMM yyyy')}</Text>
                            </View>
                        </View>
                    </View>
                ) : null}
        </>

    )
}


const ContentSetoranComponent: React.FC<ComponentPops> = ({ dataSetoran, currencyList }) => {
    return (
        <View style={styles.containerContentSetoran}>
            {dataSetoran?.map((item) => {
                return (
                    <View style={styles.containerListSetoran} key={item.id}>
                        <View style={styles.contentLeft}>
                            <Text style={[styles.tanggal, { marginBottom: 0, fontSize: 12.5 }]}>{formatDate(item.date, 'dd MMM yyyy')} &bull; {formatDate(item.date, 'HH:mm')}</Text>
                            <Text style={styles.keterangan}>{item.ket}</Text>
                        </View>
                        <View style={styles.contentRight}>
                            {currencyList ? (
                                <Text style={[styles.nominalSetoran, { color: item.plus ? '#32CD32' : 'red' }]}>{
                                    item.plus ? `+ ${formatCurrency(item.setoran, currencyList?.locale, currencyList?.code)}` : `- ${formatCurrency(item.setoran, currencyList?.locale, currencyList?.code)}`
                                }</Text>
                            ) : null}
                        </View>
                    </View>
                )
            }
            )}




        </View>
    )
}



const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flexGrow: 1,
        width: width,
        minHeight: height,
        paddingBottom: height / 8,
    },
    container: {
        width: width,
        minHeight: height,
        paddingTop: '4%',
        backgroundColor: 'white',
        alignItems: 'center',
        // paddingBottom: height / 70,
    },
    containerTitle: {
        width: '100%',
        paddingHorizontal: '4%',
        marginBottom: '5%'
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
    },
    containerImg: {
        width: '95%',
        height: height / 3.8,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: '5%'
    },
    img: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    containerContentOne: {
        width: '95%',
        height: height / 4.4,
        backgroundColor: '#FFF8F8',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '6%',
        gap: 10,
        marginBottom: '5%'

    },
    containerContent: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    teksTarget: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
    },
    dateTercapai: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13.5
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#C4C4C4'
    },
    // tanggal
    tanggal: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        marginBottom: '2%'
    },
    containerTgl: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    // container setoran 
    containerContentSetoran: {
        width: '95%',
        // minHeight: '12%',
        backgroundColor: '#FFF8F8',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '4%',
        paddingHorizontal: '6%',
        gap: 20
    },
    containerListSetoran: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: height / 12,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        paddingBottom: '5%',
    },
    listSetoran: {
        width: '100%',
    },
    contentLeft: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '45%',
        height: '100%',
    },
    keterangan: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
    },
    nominalSetoran: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 13,

    },
    contentRight: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flex: 1,
        height: '100%',
    },
})

export default TercapaiDetailPages
