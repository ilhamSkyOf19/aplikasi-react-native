import useAnimation from '@/animation/loginAnimation';
import InputLogin from '@/components/InputAuth/input';
import { useAuthWarn } from '@/hooks/AuthWarn';
import { registerUser } from '@/service/auth/register.service';
import { height, width } from '@/utils/utils';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { RefObject, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const RegisterScreen: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const handleLoading = (value: boolean) => {
        setLoading(value);
    }

    return (
        <ImageBackground
            source={require('@/assets/background/mountain.png')}
            resizeMode='cover'

            style={styles.container}
        >
            {/* Animated Container Top */}
            <FormInput handleLoading={handleLoading} />

            {
                loading &&
                <BlurView intensity={100} tint="dark" style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>
                    <LottieView
                        source={require('../../assets/spinner/loading-auth.json')}
                        autoPlay
                        loop
                        style={{ width: width / 2.5, height: height / 4, }}
                        speed={1}
                    />
                </BlurView>

            }



        </ImageBackground>
    );
};


interface Props {
    handleLoading: (value: boolean) => void
}

const FormInput: React.FC<Props> = ({ handleLoading }) => {
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

    // triger warn username
    const [warnUsername, setWarnUsername] = useState({
        kondisi: false,
        type: '',
        message: ''
    });

    // triger warn password
    const [warnPassword, setWarnPassword] = useState({
        kondisi: false,
        type: '',
        message: ''
    });


    // auth registrasi 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');


    const handleUsername = (value: string) => {
        if (value.length > 7) {
            setWarnUsername({ kondisi: true, type: 'max', message: 'maksimal karakter 7' });
        }

        if (/\s/.test(value)) {
            setWarnUsername({ kondisi: true, type: 'space', message: 'tidak boleh ada spasi' });
        }
        setUsername(value.trim());
    }
    const handlePassword = (value: string) => setPassword(value.trim());
    const handlePasswordConfirm = (value: string) => setPasswordConfirm(value.trim());


    // auth service
    const handleRegister = async () => {
        if (!username || !password) {
            setWarnPassword({ kondisi: true, type: 'empty', message: '' });
            setWarnUsername({ kondisi: true, type: 'empty', message: '' });
            Alert.alert('Peringatan', 'Semua input harus diisi');
            return;
        }

        if (password !== passwordConfirm || !passwordConfirm) {
            setWarnPassword({ kondisi: true, type: 'password', message: 'Password tidak sama' });
            Alert.alert('Peringatan', 'Password tidak sama');
            return;
        }

        try {
            handleLoading(true);
            const result = await registerUser(username, password);

            if (result.success) {
                Alert.alert('Berhasil', result.message);
                // Bisa redirect ke login atau halaman lain di sini
            } else {
                if (result.message === 'Username already exists') {
                    setWarnUsername({ kondisi: true, type: 'username', message: result.message });
                }
                Alert.alert('Gagal', result.message);
            }
        } catch (error) {
            console.error('Register error:', error);
            Alert.alert('Error', 'Terjadi kesalahan saat registrasi');
        } finally {
            handleLoading(false);
        }
    };



    const { inputRef, borderStyle } = useAuthWarn(warnUsername, setWarnUsername, username);
    const { inputRef: inputRefPassword, borderStyle: borderStylePassword } = useAuthWarn(warnPassword, setWarnPassword, password);





    return (
        <Animated.ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            style={[{ transform: [{ translateY: animation.bottomAnim }] }]}
            ref={scrollRef}
        >
            <View style={{ height: height / 4 }}>

            </View>
            <View style={[styles.containerForm, isFocused ? { height: height / 1.43 } : { height: height / 1.43 }]}>
                <BlurView style={styles.containerBlur} intensity={200}>
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
                        <View style={styles.containerWarn}>
                            <Animated.Text style={[styles.textWarn, warnUsername.kondisi ? { opacity: 1 } : { opacity: 0 }]}>{
                                warnUsername.kondisi ? warnUsername.message : ''}</Animated.Text>
                        </View>
                        <InputLogin useRef={inputRef as RefObject<TextInput>} nameIcon={'user'} sizeIcon={20} placholder='Username' handleFocus={handleFocus} valueScroll={150} handleViewActive={handleViewActive} handleViewInactive={handleViewInactive} anim={animation4.anim} animOpacity={animation4.animOpacity} handleChangeText={handleUsername} borderColor={borderStyle} />
                        <InputLogin useRef={inputRefPassword as RefObject<TextInput>} nameIcon={'lock'} sizeIcon={20} placholder='Password' handleFocus={handleFocus} valueScroll={150} handleViewActive={handleViewActive} handleViewInactive={handleViewInactive} password={true} anim={animation5.anim} animOpacity={animation5.animOpacity} handleChangeText={handlePassword} borderColor={borderStylePassword} setWarn={setWarnPassword} />
                        <InputLogin useRef={inputRefPassword as RefObject<TextInput>} nameIcon={'lock'} sizeIcon={20} placholder='Confirm Password' handleFocus={handleFocus} valueScroll={150} handleViewActive={handleViewActive} handleViewInactive={handleViewInactive} password={true} anim={animation6.anim} animOpacity={animation6.animOpacity} handleChangeText={handlePasswordConfirm} borderColor={borderStylePassword} setWarn={setWarnPassword} />
                    </View>
                    <TouchableOpacity style={{
                        alignItems: 'center', width: '100%', marginTop: 20
                    }} onPress={() => handleRegister()}>
                        < Animated.Text style={[styles.buttonRegister, { transform: [{ translateY: animation7.anim }], opacity: animation7.animOpacity }]} >
                            Register
                        </Animated.Text>
                    </TouchableOpacity>
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
            </View >
        </Animated.ScrollView >
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
        gap: 0,
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
        color: 'rgba(17,167,254,1.00)',
        fontSize: 13,
        padding: 8,
        fontFamily: 'Poppins-Regular',
    },

    // warn 
    containerWarn: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 5,
        paddingLeft: width / 20
    },
    textWarn: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
    },




});


export default RegisterScreen;
