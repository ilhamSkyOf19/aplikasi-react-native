import CardListTercapai from '@/components/cardComponent/CardListTercapai';
import ModalUser from '@/components/modal/ModalUser';
import NotData from '@/components/ui/NotData';
import { DataKeuangan } from '@/interface/type';
import { getImg } from '@/service/auth/getImg.service';
import { getToken } from '@/service/auth/token.service';
import { getDataTercapai } from '@/service/getData/getDataTercapai.service';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, usePathname } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
const trophy = require('../../assets/icon/trophy.png');
const logo = require('../../assets/icon/logo.png');
const { height, width }: { height: number; width: number } = Dimensions.get("screen");

//=====================
// Props 
//=====================
interface PropsTabungan {           // Props Tabungan

}

interface PropsFront {              // Props Front
    handleUser: () => void
    dataTercapai: DataKeuangan[];

}



const TabunganPages: React.FC<PropsTabungan> = () => {
    // state 
    const [dataTercapai, setDataTercapai] = useState<DataKeuangan[]>([]); // state data keuangan
    // pathname
    const pathname = usePathname();
    // state 
    const [isToken, setIsToken] = useState<boolean>(false);
    const [userData, setUserData] = useState<string | null>(null);
    const [img, setImg] = useState<string | null>(null);


    // useEffect 
    // useFocusEffect fetch data 
    useFocusEffect(
        useCallback(() => {
            const data = async () => {
                const data = await getDataTercapai('tercapai');
                if (data) {
                    setDataTercapai(data);
                }
            }
            data();
        }, [])
    );

    // console.log(dataTercapai)
    // modal user 
    // user 
    const [modalUser, setModalUser] = useState<boolean>(false);
    // handle user 
    const handleUser = useCallback(() => {
        setModalUser((prev) => !prev);
    }, [])


    // token 
    useFocusEffect(
        useCallback(() => {
            const findToken = async () => {
                const token = await getToken();
                if (token !== null) {
                    const img = await getImg(token as string);
                    if (img.data) {
                        setImg(img.data);
                    }
                    setUserData(token as string);
                    setIsToken(true);
                } else {
                    setIsToken(false);
                }
            }
            findToken();
        }, [pathname])
    )





    return (
        <>
            <View style={style.container}>
                <BackgroundLeft />
                <BackgroundRight />
                <ContainerFront dataTercapai={dataTercapai} handleUser={handleUser} />
            </View>
            {modalUser && (
                <ModalUser userData={userData as string} token={isToken} handleUser={handleUser} img={img as string} />
            )}
        </>
    )
}




export const ContainerFront: React.FC<PropsFront> = ({ dataTercapai, handleUser }) => {





    // console.log('data', dataKeuangan)
    return (
        <View style={style.containerFront}>
            <View style={style.backgroundFrontTop}>
                <View style={style.containerIconSettings}>
                    <Image source={logo} style={style.icon} />
                    <FontAwesome name="user-circle" size={24} color="white" onPress={handleUser} />
                </View>
                <View style={style.containerTrophy}>
                    <Image source={trophy} style={[style.icon, { width: width / 5, height: width / 5 }]} />
                    <Text style={style.textTitle}>Total Tercapai Tabungan</Text>
                </View>

            </View>
            <View style={style.backgroundFrontBottom}>
                <FlatList
                    data={dataTercapai}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={
                        ({ item }) => {
                            return (
                                <CardListTercapai key={item.id} dataTercapai={item} />
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
        minHeight: height,
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
        minHeight: height / 1,
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
