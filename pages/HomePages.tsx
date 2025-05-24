import IconSettings from '@/components/ui/IconSettings';
import { height, width } from "@/utils/utils";
import { useRouter } from "expo-router";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const Logo = require('../assets/images/logo.png');
const Animation = require('../assets/images/animation.png');

type PropsHomePages = {
    handleSettings: () => void,
    handleAbout: () => void,
}


const HomePages: React.FC<PropsHomePages> = ({ handleSettings, handleAbout }) => {
    return (
        <View style={style.container}>
            <ContainerFront handleSettings={handleSettings} handleAbout={handleAbout} />
        </View >
    )
}



export const ContainerFront: React.FC<PropsHomePages> = ({ handleSettings, handleAbout }) => {
    const router = useRouter();
    const handleStart = (): void => {
        router.push("../home"); // Navigasi ke halaman "tabungan"
    };

    return (
        <View style={style.backgroundFrontTop}>
            <View style={style.containerIconSettings}>
                <IconSettings handleSettings={handleSettings} handleAbout={handleAbout} width={width} />
            </View>
            <View style={style.containerLogo}>
                <Image source={Logo} style={style.icon}></Image>
            </View>
            <View style={style.containerText}>
                <Text style={style.text}>Persiapkan masa depan dengan bijak</Text>
                <Text style={style.text}>Masa depan yang cerah dimulai dari</Text>
                <Text style={style.text}>kebiasaan baik hari ini</Text>
                <Text style={style.textBold}>Yuk, menabung untuk impianmu!</Text>
            </View>
            <View style={style.containerAnimation}>
                <Image source={Animation} style={style.animation}></Image>
            </View>
            <TouchableOpacity onPress={handleStart} >
                <View
                    style={style.buttonStart}
                >
                    <Text style={style.textBold}>
                        Start Now
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}




const style = StyleSheet.create({
    container: {
        maxWidth: width,
        maxHeight: height,
    },
    containerFront: {
        width: width,
        height: height,
        zIndex: 2,
        flex: 1,

    },
    backgroundFrontTop: {
        width: width,
        height: height,
        backgroundColor: '#11A7FE',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: height / 60,
        paddingTop: height / 19.6,
        paddingHorizontal: height / 25,
    },
    containerLogo: {
        width: width,
        height: height / 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: height / 25,
        marginBottom: height / 35,
    },
    icon: {
        width: width,
        height: height / 7,
        resizeMode: 'contain',
    },
    containerIconSettings: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width,
        paddingHorizontal: width / 20,
        marginBottom: height / 15,
    },
    containerText: {
        width: width,
        height: height / 6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: height / 25,
        gap: 3.5,
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    textBold: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center'
    },
    containerAnimation: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: width * 1.1,
        height: height / 4,
        resizeMode: 'contain',
        marginBottom: height / 25
    },
    buttonStart: {
        paddingHorizontal: height / 25,
        paddingVertical: height / 80,
        backgroundColor: '#FFA500',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        elevation: 5,
    },


})

export default HomePages;
