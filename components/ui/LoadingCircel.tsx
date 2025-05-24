import { height, width } from '@/utils/utils';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const Loading: React.FC = () => {
    return (
        <>
            <View style={style.container}>
                <LottieView
                    source={require('../../assets/spinner/spinner-circel.json')}
                    autoPlay
                    loop
                    style={style.lottie}
                    speed={1.5}
                />
            </View>
        </>
    )
}

const style = StyleSheet.create({
    lottie: {
        width: width / 4,  // Ubah ukuran sesuai kebutuhan
        height: height / 6,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxHeight: height,
        zIndex: 10,
    },
})

export default Loading;
