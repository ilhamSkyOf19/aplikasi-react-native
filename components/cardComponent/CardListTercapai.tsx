import { CurrencyInfo, currencyList } from '@/data/typeCurrency'
import { DataTercapai } from '@/interface/type'
import { formatCurrency, height, waktuTercapai, width } from '@/utils/utils'
import { useRouter } from 'expo-router'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CardListTercapaiProps {
    dataTercapai: DataTercapai;
}

// currency


const CardListTercapai: React.FC<CardListTercapaiProps> = ({ dataTercapai }) => {

    // format currency
    const [currencySelected, setCurrencySelected] = useState<CurrencyInfo | null>(null);
    useEffect(() => {
        currencyList.find((item, index) => {
            if ((index + 1) === dataTercapai?.idCurrency) {
                setCurrencySelected(item);
            }
        })
    }, [])

    // handle date 
    const handleDate: string = useMemo(() => {
        return waktuTercapai(dataTercapai.dataSetoran[dataTercapai.dataSetoran.length - 1].date, dataTercapai.date);
    }, [dataTercapai])

    const router = useRouter();
    const handleClick = useCallback((key: { id: string }) => {
        const routeParams = new URLSearchParams(key).toString();
        router.push(`/tercapai?${routeParams}`);
    }, [])


    return (
        <TouchableOpacity onPress={() => handleClick({ id: dataTercapai.id })} style={styles.containerCard}>
            <View style={styles.containerContentLeft}>
                <View style={styles.containerImage}>
                    <Image source={{ uri: dataTercapai.img }} style={styles.image} />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.text}>{dataTercapai.nama}</Text>
                    <Text style={[styles.text, { fontSize: 12, fontFamily: 'Poppins-Regular' }]}>{formatCurrency(dataTercapai.tabungan, currencySelected?.locale || 'id-ID', currencySelected?.code || 'IDR')}</Text>
                    <Text style={[styles.text, { fontSize: 10, fontFamily: 'Poppins-Regular' }]}>Tercapai dalam {handleDate} hari</Text>
                </View>
            </View>
            <View style={styles.containerContentRight}>
                <Text style={styles.text}>Tercapai</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerCard: {
        width: width / 1.125,
        height: height / 9.9,
        backgroundColor: '#FFF8F8',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: '4%',
        paddingRight: '5%',
        paddingVertical: '3%'
    },
    containerImage: {
        width: '35%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    // text
    containerText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    containerContentLeft: {
        flexDirection: 'row',
        width: '79%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    containerContentRight: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})

export default memo(CardListTercapai)
