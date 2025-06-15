import { height, width } from '@/utils/utils'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { RefObject, useState } from 'react'
import { Animated, Pressable, StyleSheet, TextInput, View } from 'react-native'


interface Props {
    nameIcon: keyof typeof FontAwesome5.glyphMap
    sizeIcon: number,
    placholder: string,
    password?: boolean
    handleFocus(param: number): void,
    handleViewActive(): void,
    handleViewInactive(): void,
    valueScroll: number,
    anim: Animated.Value,
    animOpacity: Animated.Value,
    handleChangeText: (value: string) => void,
    borderColor?: string,
    useRef?: RefObject<TextInput>,
    setWarn?: (warn: { kondisi: boolean, type: string, message: string }) => void
}




const InputLogin: React.FC<Props> = ({ handleFocus, handleViewActive, handleViewInactive, nameIcon, sizeIcon, placholder, password, valueScroll, anim, animOpacity, handleChangeText, borderColor, useRef, setWarn }) => {


    const [eye, setEye] = useState(false)

    const handleEye = () => {
        setEye(!eye)
    }
    return (
        <Animated.View style={[styles.input, { transform: [{ translateY: anim }], opacity: animOpacity, borderColor: `${borderColor ?? 'rgba(255,255,255,0.5)'}`, borderWidth: 0.8 }]}>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center', width: `${password ? '75%' : '85%'}` }}>
                <FontAwesome5 name={nameIcon} size={sizeIcon} color='rgba(0, 0, 0, 0.5)' />
                <TextInput
                    ref={useRef}
                    keyboardType='default'
                    placeholder={placholder}
                    secureTextEntry={password && !eye}
                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                    style={styles.inputText}
                    onFocus={() => {
                        handleFocus(valueScroll),
                            handleViewActive()
                    }}
                    onBlur={() => {
                        handleFocus(0),
                            handleViewInactive()
                    }}
                    onChangeText={(text) => {
                        handleChangeText(text);
                        setWarn?.({ kondisi: false, type: '', message: '' });
                    }}
                />
            </View>
            {
                password && <Pressable onPress={handleEye} style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '10%' }}>
                    <FontAwesome5 name={eye ? 'eye' : 'eye-slash'} size={15} color='rgba(0, 0, 0, 0.5)' />
                </Pressable>
            }


        </Animated.View >
    )
}


const styles = StyleSheet.create({
    // container input 

    input: {
        width: '100%',
        height: height / 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        paddingHorizontal: width / 20,
        borderRadius: 25,
        marginBottom: width / 20
    },
    inputText: {
        width: '100%',
        height: '100%',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: 'rgba(0, 0, 0, 0.5)'
    }
})

export default InputLogin
