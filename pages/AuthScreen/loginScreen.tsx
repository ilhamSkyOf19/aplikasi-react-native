import useAnimation from '@/animation/loginAnimation';
import InputLogin from '@/components/InputAuth/input';
import { useAuthWarn } from '@/hooks/AuthWarn';
import { default as UseAnimated } from '@/hooks/UseAnimated';
import { loginUser } from '@/service/auth/login.service';
import { height, width } from '@/utils/utils';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { RefObject, useCallback, useRef, useState } from 'react';
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

const LoginScreen: React.FC = () => {

    // Animasi untuk container atas dan bawah

    const textHelloLeft = UseAnimated({ from: -300, to: 0, duration: 800 });
    const textSubHelloLeft = UseAnimated({ from: -300, to: 0, duration: 1400 });

    // handle loading  
    const [loading, setLoading] = useState(false);
    const handleLoading = (value: boolean) => setLoading(value);



    return (
        <ImageBackground
            source={require('@/assets/background/mountain.png')}
            resizeMode='cover'

            style={styles.container}
        >
            <View style={styles.containerTop}>
                <View style={styles.containerText}>
                    <Animated.Text style={[styles.fontHello, { transform: [{ translateX: textHelloLeft }] }]}>Hello</Animated.Text>
                    <Animated.Text style={[styles.fontWelcome, { transform: [{ translateX: textSubHelloLeft }] }]}>Welcome to MyApp</Animated.Text>
                </View>
            </View>

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
    const animation = useAnimation();
    const animation2 = useAnimation(0);
    const animation3 = useAnimation(50);
    const animation4 = useAnimation(100);
    const animation5 = useAnimation(150);
    const animation6 = useAnimation(200);
    const animation7 = useAnimation(250);







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


    // handle register
    const handleRegister = useCallback(() => {
        router.push({
            pathname: '/register',
        });
    }, [])

    // handle back 
    const handleBack = () => {
        router.back();
    }

    // auth login 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [warnAuth, setWarnAuth] = useState({ kondisi: false, type: '', message: '' });

    const handleUsername = (value: string) => setUsername(value);
    const handlePassword = (value: string) => setPassword(value);




    // handle login
    const handleLogin = async () => {
        if (!username || !password) {
            setWarnAuth({ kondisi: true, type: 'empty', message: '' });
            Alert.alert('Peringatan', 'Semua input harus diisi');
            return;
        }

        try {
            handleLoading(true);
            const result = await loginUser(username, password);

            if (result.success) {
                Alert.alert('Berhasil', result.message);
                router.push('/home');
                // Bisa redirect ke login atau halaman lain di sini
            } else {
                if (result.success === false) {
                    setWarnAuth({ kondisi: true, type: 'username', message: result.message });
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


    const { inputRef, borderStyle } = useAuthWarn(warnAuth, setWarnAuth, username);


    return (
        <Animated.ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            style={[{ transform: [{ translateY: animation.bottomAnim }] }]}
            ref={scrollRef}
        >
            <View style={{ height: height / 3 }}>

            </View>
            <View style={[styles.containerForm, isFocused ? { height: height / 1.63 } : { height: height / 1.63 }]}>
                <BlurView style={styles.containerBlur} intensity={200}>
                    <Animated.View style={[styles.containerTextBack, { transform: [{ translateY: animation2.anim }], opacity: animation2.animOpacity }]}>
                        <Pressable onPress={handleBack} style={{ flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 10 }}>
                            <AntDesign name="arrowleft" size={25} color="rgba(17,167,254,0.8)" />
                            <Text style={styles.textBack}>Back</Text>
                        </Pressable>
                    </Animated.View>
                    <Animated.View style={[styles.containerTextLogin, { transform: [{ translateY: animation3.anim }], opacity: animation3.animOpacity }]}>
                        <Text style={styles.textLogin}>Login</Text>
                    </Animated.View>
                    <View style={styles.containerInput}>
                        <InputLogin useRef={inputRef as RefObject<TextInput>} nameIcon={'user'} sizeIcon={20} placholder='Username' handleFocus={handleFocus} valueScroll={120} handleViewActive={handleViewActive} handleViewInactive={handleViewInactive} anim={animation4.anim} animOpacity={animation4.animOpacity} handleChangeText={handleUsername} borderColor={borderStyle} />
                        <InputLogin useRef={inputRef as RefObject<TextInput>} nameIcon={'lock'} sizeIcon={20} placholder='Password' handleFocus={handleFocus} valueScroll={220} handleViewActive={handleViewActive} handleViewInactive={handleViewInactive} password={true} anim={animation5.anim} animOpacity={animation5.animOpacity} handleChangeText={handlePassword} borderColor={borderStyle} />
                    </View>
                    <TouchableOpacity onPress={() => handleLogin()} style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                        <Animated.Text style={[styles.buttonLogin, { transform: [{ translateY: animation6.anim }], opacity: animation6.animOpacity }]}>
                            Login
                        </Animated.Text>
                    </TouchableOpacity>
                    <Animated.View style={[styles.containerRegister, { transform: [{ translateY: animation7.anim }], opacity: animation7.animOpacity }]}>
                        <Text style={styles.textRegister}>
                            Don't have an account?
                        </Text>
                        <Pressable onPress={handleRegister}>
                            <Text style={styles.textRegisterBlue}>
                                Register
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

    containerTextBack: {
        width: '100%',
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: width / 20
    },
    textBack: {
        color: 'rgba(17,167,254,0.8)',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
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
    textLogin: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 33,
        fontFamily: 'Poppins-SemiBold',
    },
    containerInput: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: width / 14,
    },
    buttonLogin: {
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
    textRegisterBlue: {
        color: 'rgba(17,167,254,1.00)',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        padding: 8
    }




});


export default LoginScreen;
