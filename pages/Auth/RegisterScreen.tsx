import useAnimation from '@/animation/loginAnimation';
import InputLogin from '@/components/InputAuth/input';
import { height, width } from '@/utils/utils';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

const RegisterScreen: React.FC = () => {




    return (
        <ImageBackground
            source={require('@/assets/background/mountain.png')}
            resizeMode='cover'

            style={styles.container}
        >

            {/* Animated Container Top */}
            <FormInput />


        </ImageBackground>
    );
};




const FormInput: React.FC = () => {
    // Animasi untuk container atas dan bawah
    const animation = useAnimation();
    const animation2 = useAnimation(50);
    const animation3 = useAnimation(100);
    const animation4 = useAnimation(150);
    const animation5 = useAnimation(200);
    const animation6 = useAnimation(250);
    const animation7 = useAnimation(300);
    const animation8 = useAnimation(350);


    // Scroll Keyboard Active
    // Input Username
    const [isFocused, setIsFocused] = useState(false);
    const handleViewActive = () => {
        setIsFocused(true);
    };

    const handleViewInactive = () => {
        setIsFocused(false);
    };

    const scrollRef = useRef<ScrollView>(null);
    const handleFocus = (y: number) => {
        scrollRef.current?.scrollTo({ y, animated: true });
    };

    console.log(isFocused);

    // handle back 
    const handleBack = () => {
        router.back();
    }

    // handle Login
    const handleLogin = () => {
        router.back();
    }



    return (
        <Animated.ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            style={[{ transform: [{ translateY: animation.bottomAnim }] }]}
            ref={scrollRef}
        >
            <View style={{ height: height / 4 }}>

            </View>
            <View style={[styles.containerForm, isFocused ? { height: height / 1.3 } : { height: height / 1.43 }]}>
                <BlurView style={styles.containerBlur} intensity={160}>
                    <Animated.View style={[styles.containerTextBack, { transform: [{ translateY: animation2.anim }], opacity: animation2.animOpacity }]}>
                        <Pressable onPress={handleBack} style={{ flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 10 }}>
                            <AntDesign name="arrowleft" size={25} color="rgba(17,167,254,0.8)" />
                            <Text style={styles.textBack}>Back to login</Text>
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={[styles.containerTextLogin, { transform: [{ translateY: animation3.anim }], opacity: animation3.animOpacity }]}>
                        <Text style={styles.textLogin}>Register</Text>
                    </Animated.View>
                    <View style={styles.containerInput}>
                        <InputLogin nameIcon={'user'} sizeIcon={20} placholder='Username' handleFocus={handleFocus} valueScroll={50} handleViewActive={handleViewActive} handleViewInactive={handleViewInactive} anim={animation4.anim} animOpacity={animation4.animOpacity} />
                        <InputLogin nameIcon={'lock'} sizeIcon={20} placholder='Password' handleFocus={handleFocus} valueScroll={100} handleViewActive={handleViewActive} handleViewInactive={handleViewInactive} password={true} anim={animation5.anim} animOpacity={animation5.animOpacity} />
                        <InputLogin nameIcon={'lock'} sizeIcon={20} placholder='Confirm Password' handleFocus={handleFocus} valueScroll={100} handleViewActive={handleViewActive} handleViewInactive={handleViewInactive} password={true} anim={animation6.anim} animOpacity={animation6.animOpacity} />
                    </View>
                    <Animated.Text style={[styles.buttonRegister, { transform: [{ translateY: animation7.anim }], opacity: animation7.animOpacity }]}>
                        Login
                    </Animated.Text>
                    <Animated.View style={[styles.containerRegister, { transform: [{ translateY: animation8.anim }], opacity: animation8.animOpacity }]}>
                        <Text style={styles.textRegister}>
                            Already have an account?
                        </Text>
                        <Pressable onPress={handleLogin}>
                            <Text style={styles.textLoginWhite}>
                                Login
                            </Text>
                        </Pressable>
                    </Animated.View>
                </BlurView>
            </View>
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        position: 'relative',

    },

    containerTop: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingLeft: width / 20,
        paddingTop: height / 8
    },

    fontHello: {
        fontSize: 45,
        fontFamily: 'Poppins-Regular',
        color: 'rgba(17,167,254,1.00)',
    },
    fontWelcome: {
        marginTop: -width / 20,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: 'black',
        // color: 'rgba(17,167,254,0.6)'
    },
    containerText: {
        paddingBottom: width / 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },


    // form login 

    scrollView: {
        flex: 1,
        position: 'absolute',
        width: width,
        minHeight: height / 1.3,
    },
    containerForm: {
        width: width,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
    },
    containerBlur: {
        width: width,
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: width / 17,
        paddingHorizontal: width / 11
    },
    containerTextLogin: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    containerTextBack: {
        width: '100%',
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: width / 20
    },
    textLogin: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 33,
        fontFamily: 'Poppins-SemiBold',
    },
    textBack: {
        color: 'rgba(17,167,254,0.8)',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
    },
    containerInput: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 20,
        paddingTop: width / 14,
    },
    buttonRegister: {
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        fontSize: 16,
        width: '100%',
        paddingVertical: width / 40,
        backgroundColor: 'rgba(17,167,254,0.6)',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width / 8,
        textAlign: 'center',
    },
    containerRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        marginTop: width / 25
    },
    textRegister: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
    },
    textLoginWhite: {
        color: 'white',
        fontSize: 13,
        padding: 8,
        fontFamily: 'Poppins-Regular',
    }




});


export default RegisterScreen;
