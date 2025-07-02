import ButtonBasic from '@/components/ui/ButtonBasic';
import Button from '@/components/ui/ButtonTabungan';
import NotData from '@/components/ui/NotData';
import { useSelectedNavigation } from '@/context/NavigationContext';
import { DataKeuangan, SelectedType, TypeData } from '@/interface/type';
import { getToken } from '@/service/auth/token.service';
// import { deleteAllDataKeuangan } from '@/service/deleteService/deleteAll.service';
import ModalUser from '@/components/modal/ModalUser';
import { getImg } from '@/service/auth/getImg.service';
import { getDataKeuangan } from '@/service/getData/getDataKeuangan.service';
import { renderSetoran } from '@/utils/SetoranRender';
import { height, width } from "@/utils/utils";
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, usePathname, useRouter } from 'expo-router';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import LoadingCircle from '../../components/ui/Loading';
const Logo = require('../../assets/icon/logo.png');
// Button List
const button: Array<string> = ['harian', 'mingguan', 'bulanan']



// Props 
interface PropsTabungan {               // Props Tabungan

}

interface PropsFront {                  // Props Front
    data: DataKeuangan[];
    handleUser: () => void
    selected: SelectedType
    setSelected: (item: SelectedType) => void
    loading: boolean
}



const TabunganPagesComponent: React.FC<PropsTabungan> = () => {
    // useEffect(() => {
    //     deleteAllData();
    // }, [])
    // logout();

    // pathname
    const pathname = usePathname();
    // state 
    const [data, setData] = useState<DataKeuangan[]>([]); // state data keuangan
    const [isToken, setIsToken] = useState<boolean>(false);
    const [userData, setUserData] = useState<string | null>(null);
    const [img, setImg] = useState<string | null>(null);



    const [typeData, setTypeData] = useState<TypeData>('dataHarian');
    const { selected, setSelected } = useSelectedNavigation();
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        try {
            if (selected === 'harian') {
                setTypeData('dataHarian');
            } else if (selected === 'mingguan') {
                setTypeData('dataMingguan');
            } else {
                setTypeData('dataBulanan');
            }
        } catch (error) {
            console.log(error)
        }

    }, [selected]);

    console.log(selected)



    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await getDataKeuangan(typeData, 'belum');
                    if (data) {
                        setData(data);
                    }
                } catch (error) {
                    console.error('Gagal mengambil data keuangan:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, [typeData, loading])
    );





    // useCallback fetch data






    // console.log('ini data', data)


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



    // console.log(isToken)
    // console.log(userData)

    // modal user 
    // user 
    const [modalUser, setModalUser] = useState<boolean>(false);
    // handle user 
    const handleUser = useCallback(() => {
        setModalUser((prev) => !prev);
    }, [])

    // pathname 

    useEffect(() => {
        if (pathname !== '/home') {
            setModalUser(false);
        }
    }, [pathname]);






    return (
        <>
            <BackgroundLeft />
            <BackgroundRight />
            <View style={styles.container}>
                <ContainerFront data={data} handleUser={handleUser} selected={selected} setSelected={setSelected} loading={loading} />
            </View>
            {modalUser && (
                <ModalUser userData={userData as string} token={isToken} handleUser={handleUser} img={img as string} />
            )}
        </>
    )
}



const ContainerFrontComponent: React.FC<PropsFront> = ({ handleUser, data, selected, setSelected, loading }) => {




    const handleClick = useCallback((item: SelectedType): void => {
        setSelected(item);
    }, [])




    const router = useRouter();


    // Handle Add
    const handleAdd = useCallback((params: { [key: string]: string }): void => {
        router.push({
            pathname: '/add',
            params: params,
        });
    }, [])


    // Handle Url Login
    const handleButtonLogin = useCallback(() => {
        router.push({
            pathname: '/login',
        });
    }, [])




    // scroll triger 
    const scrollY = useRef(new Animated.Value(0)).current;


    return (
        <View style={styles.containerFront}>
            <View style={styles.backgroundFrontTop}>
                <View style={styles.containerIconSettings}>
                    <Image source={Logo} style={styles.icon} />
                    <FontAwesome name="user-circle" size={24} color="white" onPress={handleUser} />
                </View>
                <View style={styles.containerButton}>
                    {button.map((item, index) => (
                        <Button
                            key={index}
                            onPress={() => handleClick(item as SelectedType)}
                            labelButton={item}
                            isSelected={selected === item} // Menentukan apakah tombol ini dipilih
                            customButton={{ borderRadius: 10, }}
                        />
                    ))}
                </View>
            </View>
            {
                loading ? (
                    <LoadingCircle />
                ) : (
                    <View style={styles.backgroundFrontBottom}>

                        <>
                            <Animated.FlatList
                                data={data}
                                keyExtractor={(item) => String(item?.id || '')}
                                renderItem={renderSetoran(selected, scrollY)}
                                ListEmptyComponent={
                                    () => <NotData />
                                }
                                style={[styles.containerFlatList]}
                                ItemSeparatorComponent={() => <View style={{ height: height * 0.02 }} />}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ alignItems: 'center', paddingVertical: '10%', paddingBottom: '22%' }}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                    { useNativeDriver: false }
                                )}
                                scrollEventThrottle={16}
                            />
                        </>
                        <View style={styles.containerButtonAdd}>
                            <ButtonBasic custom={styles.buttonAdd} label="Tambahkan" nameIcon="add" sizeIcon={18} customText={{ fontSize: 11 }} handleButton={[() => handleAdd({ typeData: selected, tipe: 'add' })]} />
                        </View>
                    </View>
                )
            }
        </View>
    )
}

// Component memo
const ContainerFront = memo(ContainerFrontComponent);
const TabunganPages = memo(TabunganPagesComponent);



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
        }}>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        maxWidth: width,
        minWidth: width,
        minHeight: height / 3,
        position: 'relative',
        zIndex: 2,
        justifyContent: 'center',
    },
    containerFront: {
        width: width,
        zIndex: 2,
        position: 'relative'
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
        gap: 15
    },
    backgroundFrontBottom: {
        width: width,
        minHeight: height / 1.5,
        backgroundColor: 'white',
        borderTopRightRadius: 75,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
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
        resizeMode: 'contain',
        // transform: [{ rotate: '90deg' }]
    },
    // tambahkan
    containerTambahkan: {
        backgroundColor: '#11A7FE',
        paddingVertical: height / 50,
        paddingHorizontal: width / 20,
        position: 'absolute',
        bottom: '90%',
        right: 0,
        flexDirection: 'row',
    },
    containerFlatList: {
        flex: 1,
        backgroundColor: 'transparent',
        width: width,
        borderTopRightRadius: 75,
        zIndex: 3,
    },
    containerButtonAdd: {
        position: 'absolute',
        bottom: height / 25,
        right: width / 8.5,
        zIndex: 4

    },
    buttonAdd: {
        backgroundColor: '#11A7FE',
        width: width / 3,
        height: height / 22,
        gap: 2,
    },





})

export default TabunganPages;
