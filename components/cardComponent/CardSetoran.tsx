import ButtonBasic from '@/components/ui/ButtonBasic';
import { useIdContext } from '@/context/IdContext';
import { CurrencyInfo, currencyList } from '@/data/typeCurrency';
import { useRouter } from 'expo-router';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { formatCurrency, formatPersentase, getProgressColor, height, penghitunganKurang, width } from '../../utils/utils';

// ========================
// Props
// ========================
interface TabunganLayoutsProps {
    id: string;
    img: string;
    target: number;
    targetSetoran: number;
    tabungan: number;
    nama: string;
    type: string;
    currency: number;
    scrollY: Animated.Value;
    index: number;
}

const CardSetoran: React.FC<TabunganLayoutsProps> = ({ target, targetSetoran, tabungan, id, nama, type, img, currency, scrollY, index }) => {
    //==========
    // Context: Set ID
    //==========
    const { setId } = useIdContext();

    //==========
    // useMemo: Perhitungan Kurang, Persentase Border, dan Persentase
    //==========
    const { kurang, persentaseBorder, persentase } = useMemo(() => {
        let kurang: number = penghitunganKurang(target, tabungan);
        let persentaseBorder: number = tabungan / target;
        let persentase: number = persentaseBorder * 100;

        return { kurang, persentaseBorder, persentase };
    }, [target, tabungan]);

    //==========
    // Next Router: Navigasi dengan Query
    //==========
    const router = useRouter();
    const handleButton = (params: { [key: string]: string }) => {
        router.push({
            pathname: '/setoran',
            params: params,
        });
    };


    //==========
    // State Currency Selected (Format Currency)
    //==========
    const [currencySelected, setCurrencySelected] = useState<CurrencyInfo | null>(null);

    //==========
    // Effect: Set Currency Selected dari Currency List
    //==========
    useEffect(() => {
        currencyList.find((item, index) => {
            if ((index + 1) === currency) {
                setCurrencySelected(item);
            }
        });
    }, []);

    //==========
    // Scroll Animation: Interpolasi Opacity berdasarkan ScrollY
    //==========
    const inputRange = [
        (index - 1) * (height / 1.9),
        index * (height / 1.8),
        (index + 1) * (height / 1.9)
    ];

    const opacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.8, 1, 0.2],
        extrapolate: 'clamp'
    });




    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <Animated.View style={[styles.containerImage, { opacity }]}>
                {img ? (
                    <Image source={{ uri: img }} style={styles.image} />
                ) : (
                    <Text style={{ fontStyle: 'italic', color: 'gray' }}>No Image</Text>
                )}
            </Animated.View>
            <Animated.View style={[styles.containerTitle, { opacity }]}>
                <Animated.Text style={[styles.title, { opacity }]}>{nama}</Animated.Text>
            </Animated.View>
            <Animated.View style={[styles.containerKeterangan, { opacity }]}>
                <View style={styles.keteranganLeft}>
                    <Text
                        style={[
                            styles.ketHarga,
                            target >= 100000000000 ? { fontSize: 12 } : { fontSize: 16 } //batas 1 T
                        ]}
                    >
                        {formatCurrency(Number(target), currencySelected?.locale || 'id-ID', currencySelected?.code || 'IDR')}
                    </Text>

                    <Text style={[
                        styles.ketSetoran,
                        targetSetoran > 1000000000 ? { fontSize: 10 } : { fontSize: 12 }
                    ]}>{formatCurrency(Number(targetSetoran), currencySelected?.locale || 'id-ID', currencySelected?.code || 'IDR')} / hari</Text>
                </View>
                <Animated.View style={[styles.keteranganRight, { opacity }]}>

                    <Progress.Circle
                        size={45} // Ukuran lingkaran
                        progress={persentaseBorder} // 75% dalam format desimal (0.75)
                        thickness={3} // Ketebalan garis
                        color={getProgressColor(persentase)} // Warna garis progres
                        unfilledColor={'transparent'} // Warna latar belakang progres
                        showsText
                        textStyle={{
                            fontSize: 12,
                            fontWeight: 'regular',
                            color: 'black'
                        }}
                        formatText={() => `${formatPersentase(persentase)}%`} // Menampilkan angka persen di tengah
                    />
                    <Animated.Text style={[
                        styles.ketJumlahTabungan,
                        {
                            fontSize:
                                tabungan >= 1000000000000 ? 9 :
                                    tabungan >= 10000000000 ? 9 :
                                        tabungan >= 100000000 ? 11 :
                                            tabungan >= 10000000 ? 11 :
                                                tabungan >= 0 ? 12 : 7,
                            opacity

                        }
                    ]}>
                        +{formatCurrency(Number(tabungan), currencySelected?.locale || 'id-ID', currencySelected?.code || 'IDR')}
                    </Animated.Text>
                    <Animated.Text style={[
                        styles.ketKurangTabungan,
                        {
                            fontSize:
                                kurang >= 10000000000000 ? 8 :
                                    kurang >= 1000000000000 ? 9 :
                                        kurang >= 10000000000 ? 9 :
                                            kurang >= 100000000 ? 10 :
                                                kurang >= 10000000 ? 11 :
                                                    kurang >= 0 ? 12 : 5,
                            opacity

                        }]}>
                        -{formatCurrency(Number(kurang), currencySelected?.locale || 'id-ID', currencySelected?.code || 'IDR')}
                    </Animated.Text>
                </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.buttonSetor, { opacity }]}>
                <ButtonBasic handleButton={[() => handleButton({ header: id, typeData: type }), () => setId(id)]} label='Setor' />
            </Animated.View>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: width / 1.3,
        minHeight: height / 1.9,
        maxHeight: height / 1.9,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        elevation: 10,
        paddingVertical: height / 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 3,

    },
    containerImage: {
        maxWidth: width / 1.5,
        minWidth: width / 1.5,
        maxHeight: height / 4,
        minHeight: height / 4,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: height / 100
    },
    image: {
        width: width / 1.3,
        height: height / 4,
        resizeMode: 'cover'
    },
    containerTitle: {
        backgroundColor: 'transparent',
        width: width / 1.5,
        minHeight: height / 30,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15
    },
    containerKeterangan: {
        backgroundColor: 'transparent',
        width: width / 1.5,
        height: height / 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: height / 130,
        flex: 1,
        gap: 2,
    },
    keteranganLeft: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 6,
        flex: 1.5,
        zIndex: 2
    },
    ketHarga: {
        fontFamily: 'Poppins-Reguler',
    },
    ketSetoran: {
        fontFamily: 'Poppins-SemiBold',
    },
    keteranganRight: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        gap: 6,
        flex: 1,
        zIndex: 1,
    },
    ketJumlahTabungan: {
        fontFamily: 'Poppins-Ragular',
        color: 'green',
    },
    ketKurangTabungan: {
        fontFamily: 'Poppins-Ragular',
        color: 'red',
    },
    buttonSetor: {
        width: width / 1.5,
        height: height / 20,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }

})

export default memo(CardSetoran);
