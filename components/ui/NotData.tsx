import { height, width } from '@/utils/utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
const notData = require('../../assets/icon/not_data.png');

const NotData: React.FC = () => {
    return (
        <View style={styles.containerNotData}>
            <Image source={notData} style={styles.iconNotData} />
            <Text style={styles.textNotData}> Tidak Ada Data</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    containerNotData: {
        width: width,
        height: height / 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    iconNotData: {
        width: width / 1.4,
        height: width / 1.4
    },
    textNotData: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#11A7FE',
        marginTop: '-15%',
    },
})

export default NotData
