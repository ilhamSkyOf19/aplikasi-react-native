import ButtonLogin from '@/components/ButtonLogin';
import ButtonBasic from '@/components/ui/ButtonBasic';
import Button from '@/components/ui/ButtonTabungan';
import IconSettings from '@/components/ui/IconSettings';
import NotData from '@/components/ui/NotData';
import { useSelectedNavigation } from '@/context/NavigationContext';
import { DataKeuangan, SelectedType, TercapaiType } from '@/interface/type';
import { getData } from '@/service/getData/get.service';
import { renderSetoran } from '@/utils/SetoranRender';
import { height, width } from "@/utils/utils";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
const Logo = require('../../assets/images/logo.png');
// Button List
const button: Array<string> = ['harian', 'mingguan', 'bulanan']



// Props 
interface PropsTabungan {               // Props Tabungan
    handleSettings: () => void,
    handleAbout: () => void,
}

interface PropsFront {                  // Props Front
    handleSettings: () => void,
    handleAbout: () => void,
    data: DataKeuangan[];
    fetchData: (key: string, kondisi: TercapaiType) => void
    setData: (data: DataKeuangan[]) => void
}



const TabunganPagesComponent: React.FC<PropsTabungan> = ({ handleSettings, handleAbout }) => {
    // state 
    const [data, setData] = useState<DataKeuangan[]>([]); // state data keuangan

    // useCallback fetch data
    const fetchData = useCallback(async (key: string, kondisi: TercapaiType) => {
        const data = await getData(key, kondisi);
        if (data) {
            setData(data);
        }
    }, []);

    // console.log('data', data);


    return (
        <>
            <BackgroundLeft />
            <BackgroundRight />
            <View style={styles.container}>
                <ContainerFront handleSettings={handleSettings} handleAbout={handleAbout} data={data} fetchData={fetchData} setData={setData} />
            </View>
        </>
    )
}



const ContainerFrontComponent: React.FC<PropsFront> = ({ handleSettings, handleAbout, data, fetchData, setData }) => {
    const { selected, setSelected } = useSelectedNavigation();


    const handleClick = useCallback((item: SelectedType): void => {
        setSelected(item);
    }, [])

    useFocusEffect(
        useCallback(() => {
            try {
                setData([]);
                if (selected === 'harian') {
                    fetchData('dataKeuanganHarian', 'belum')
                } else if (selected === 'mingguan') {
                    fetchData('dataKeuanganMingguan', 'belum')
                } else {
                    fetchData('dataKeuanganBulanan', 'belum')
                }
            } catch (error) {
                console.log(error)
            }

        }, [selected])
    );


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
                    <Image source={Logo} style={styles.icon}></Image>
                    <View style={{ flexDirection: 'row', gap: 7 }}>
                        <IconSettings handleSettings={handleSettings} handleAbout={handleAbout} width={width} />
                        <ButtonLogin handleButton={handleButtonLogin} />
                    </View>
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
            <View style={styles.backgroundFrontBottom}>

                <>
                    <Animated.FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
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
        resizeMode: 'contain'
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
