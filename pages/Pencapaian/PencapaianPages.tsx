import CardListTercapai from '@/components/cardComponent/CardListTercapai';
import IconSettings from '@/components/ui/IconSettings';
import NotData from '@/components/ui/NotData';
import { DataTercapai } from '@/interface/type';
import { getDataTercapai } from '@/service/getData/getDataTercapai.service';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
const trophy = require('../../assets/icon/trophy.png');
const logo = require('../../assets/images/logo.png');
const { height, width }: { height: number; width: number } = Dimensions.get("screen");

//=====================
// Props 
//=====================
interface PropsTabungan {           // Props Tabungan
    handleSettings: () => void,
    handleAbout: () => void,
}

interface PropsFront {              // Props Front
    handleSettings: () => void;
    handleAbout: () => void;
    dataTercapai: DataTercapai[];
    fetchData: (key: string) => void;

}



const TabunganPages: React.FC<PropsTabungan> = ({ handleSettings, handleAbout }) => {
    // state 
    const [dataTercapai, setDataTercapai] = useState<DataTercapai[]>([]); // state data keuangan

    // useEffect 
    // fetch data keuangan
    const fetchDataKeuangan = useCallback(async (key: string) => {
        const data = await getDataTercapai(key);
        if (data) {
            setDataTercapai(data);
        }
    }, [])

    // console.log(dataTercapai)





    return (
        <View style={style.container}>
            <BackgroundLeft />
            <BackgroundRight />
            <ContainerFront handleSettings={handleSettings} handleAbout={handleAbout} fetchData={fetchDataKeuangan} dataTercapai={dataTercapai} />
        </View>
    )
}




export const ContainerFront: React.FC<PropsFront> = ({ handleSettings, handleAbout, fetchData, dataTercapai }) => {

    // useFocusEffect fetch data 
    useFocusEffect(
        useCallback(() => {
            fetchData('dataTercapai');
        }, [])
    );

    // console.log('data', dataKeuangan)
    return (
        <View style={style.containerFront}>
            <View style={style.backgroundFrontTop}>
                <View style={style.containerIconSettings}>
                    <Image source={logo} style={style.icon} />
                    <IconSettings handleSettings={handleSettings} handleAbout={handleAbout} width={width} />
                </View>
                <View style={style.containerTrophy}>
                    <Image source={trophy} style={[style.icon, { width: width / 5, height: width / 5 }]} />
                    <Text style={style.textTitle}>Total Tercapai Tabungan</Text>
                </View>

            </View>
            <View style={style.backgroundFrontBottom}>
                <FlatList
                    data={dataTercapai}
                    keyExtractor={(item) => item.id}
                    renderItem={
                        ({ item }) => {
                            return (
                                <CardListTercapai dataTercapai={item} />
                            )
                        }
                    }
                    ListEmptyComponent={
                        () => <NotData />
                    }
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: '10%' }} />}
                    contentContainerStyle={{
                        alignItems: 'center', paddingVertical: '10%', paddingBottom: '40%'
                    }}
                    style={style.containerFlatList}
                />
            </View>
        </View>
    )
}





export const BackgroundLeft: React.FC = () => {
    return (
        <View style={{
            position: 'absolute',
            width: '50%',
            minHeight: height,
            backgroundColor: 'white',
            zIndex: 1,
            left: 0,
        }}></View>
    )
}

export const BackgroundRight: React.FC = () => {
    return (
        <View style={{
            position: 'absolute',
            width: '50%',
            minHeight: height,
            backgroundColor: '#11A7FE',
            zIndex: 1,
            right: 0,
        }}></View>
    )
}



const style = StyleSheet.create({
    container: {
        maxWidth: width,
        minHeight: height / 3,
        position: 'relative',
    },
    containerFront: {
        width: width,
        zIndex: 2,
    },
    backgroundFrontTop: {
        width: width,
        height: height / 4.6,
        backgroundColor: '#11A7FE',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: height / 60,
        paddingTop: height / 20,
    },
    backgroundFrontBottom: {
        width: width,
        minHeight: height / 1.5,
        backgroundColor: 'white',
        borderTopRightRadius: 75,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 30,
        overflow: 'hidden',
        position: 'relative'
    },
    containerIconSettings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        paddingHorizontal: width / 20,
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 1.4,
        borderRadius: 10,
        gap: 10,
        minHeight: height / 15,
        maxHeight: height / 15,
        backgroundColor: 'rgba(172, 185, 193, 0.5)',
    },
    icon: {
        width: width / 8,
        height: height / 20,
        resizeMode: 'contain'
    },
    containerTrophy: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '10%',
        paddingBottom: '30%',
        gap: 10,
    },
    textTitle: {
        fontSize: 13,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
    },
    containerFlatList: {
        flex: 1,
        backgroundColor: 'transparent',
        width: width,
        borderTopRightRadius: 75,
        zIndex: 3,
    }


})

export default TabunganPages;
