import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { height, width } from '../../utils/utils';
const Logo = require('../../assets/icon/splash.png');



const Splash: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image source={Logo} style={styles.icon} />
            </View>
        </View >
    )
}






const styles = StyleSheet.create({
    container: {
        backgroundColor: '#11A7FE',
        width: width,
        height: height / 1.05,
        justifyContent: 'center',
        alignContent: 'center',
    },
    containerLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: '15%',
    },
    icon: {
        width: width / 2,
        height: '100%',
        resizeMode: 'contain'
    },



})

export default Splash;
