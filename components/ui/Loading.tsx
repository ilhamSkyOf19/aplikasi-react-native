import { height, width } from '@/utils/utils';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
const Logo = require('../../assets/images/logo.png')
const Loading: React.FC = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={style.container}>
        <LottieView
          source={require('../../assets/spinner/spinner.json')}
          autoPlay
          loop
          style={style.lottie}
          speed={2}
        />
        <Image source={Logo} style={style.icon}></Image>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  icon: {
    width: width / 2.4,
    resizeMode: 'contain'
  },
  lottie: {
    width: width / 6,  // Ubah ukuran sesuai kebutuhan
    height: height / 6,
    position: 'absolute',
    top: height / 2.9,
    left: width / 3.6
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11A7FE',
    width: '100%',
    maxHeight: height,
    zIndex: 10,
  },
})

export default Loading;
