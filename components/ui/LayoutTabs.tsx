import IconSettings from '@/components/ui/IconSettings';
import { height, width } from '@/utils/utils';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
const Logo = require('../../assets/images/logo.png');


// ================
// Props
// ================
interface PropsLayout {
    handleSettings: () => void,
    handleAbout: () => void,
    children: React.ReactNode
}


const PrimaryPages: React.FC<PropsLayout> = ({ handleSettings, handleAbout, children }) => {
    return (
        <ScrollView style={style.container}>
            <BackgroundLeft />
            <BackgroundRight />
            <ContainerFront handleSettings={handleSettings} handleAbout={handleAbout} children={children} />
        </ScrollView >
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
            backgroundColor: '#ffa500',
            zIndex: 1,
            right: 0,
        }}></View>
    )
}

export const ContainerFront: React.FC<PropsLayout> = ({ handleSettings, handleAbout, children }) => {
    return (
        <View style={style.containerFront}>
            <View style={style.backgroundFrontTop}>
                <View style={style.containerIconSettings}>
                    <IconSettings handleSettings={handleSettings} handleAbout={handleAbout} width={width} />
                </View>
                <View style={style.containerLogo}>
                    <Image source={Logo} style={style.icon}></Image>
                    <Text style={style.textLogo}>Solusi Digital untuk Toko Masa Kini!</Text>
                </View>
            </View>
            <View style={style.backgroundFrontBottom}>
                {children}
            </View>
        </View>
    )
}




const style = StyleSheet.create({
    container: {
        maxWidth: width,
        maxHeight: height,
        position: 'relative',
    },
    containerFront: {
        width: width,
        height: height,
        zIndex: 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    backgroundFrontTop: {
        width: width,
        height: height / 5,
        backgroundColor: '#ffa500',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: height / 60,
        paddingTop: height / 25,
        paddingHorizontal: height / 25,
        gap: 10,
        position: 'relative',
    },
    backgroundFrontBottom: {
        width: width,
        height: height / 1,
        backgroundColor: 'white',
        borderTopRightRadius: 75,

    },
    containerLogo: {
        width: width,
        height: height / 6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: height / 25,
    },
    textLogo: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Poppins-Bold'
    },
    icon: {
        width: width / 3,
        height: height / 10,
        resizeMode: 'contain',
    },
    containerIconSettings: {
        position: 'absolute',
        top: height / 19.7,
        right: height / 43.95
    }

})

export default PrimaryPages;
