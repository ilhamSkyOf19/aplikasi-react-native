import { useCurrencyContext } from '@/context/CurencyContext';
import { currencyList, flagImages } from '@/data/typeCurrency';
import { MaterialIcons } from '@expo/vector-icons';
import React, { RefObject, useEffect, useState } from 'react';
import { Image, ImageSourcePropType, KeyboardTypeOptions, Pressable, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import PopUpRekomendasi from '../ui/modal/ModalRekomendasi';

// ===================
// Props
// ===================
interface IconProps {
    icon?: boolean;
    nameIcon?: keyof typeof MaterialIcons.glyphMap;
    sizeIcon?: number;
    colorIcon?: string;
}

interface InputProps {
    typeKeboard: KeyboardTypeOptions;
    label: string;
    amount: string;
    handleChangeText?: (value: string) => void;
    fontSize?: number;
    widthInput?: number;
    max?: number;
    handleFocus?: () => void;
    useRef?: RefObject<TextInput>;
    typePopUp?: string;
}


interface PopUpProps {
    popUp?: boolean;
    buttonPopUp?: boolean;
    setPopUp?: (popUp: boolean) => void;
    flags?: boolean;
}


// ===================
// Props Inheritence
// ===================
interface StyleInputProps extends IconProps, InputProps, PopUpProps {
    custom?: ViewStyle | ViewStyle[];
}



const StyleInput: React.FC<StyleInputProps> = (props) => {

    const { currency } = useCurrencyContext();
    // ====================
    // state flags 
    // ====================
    const [selectedFlags, setSelectedFlags] = useState<ImageSourcePropType | undefined>(undefined)

    // ====================
    // useEffect
    // ====================
    useEffect(() => {
        const item = currencyList.find((_, index) => currency === (index + 1));
        if (item) {
            const flagsImage = flagImages[item.flag];
            setSelectedFlags(flagsImage);
        }
    }, [currency]);

    return (
        <View style={[styles.inputContainer, props.custom]}>
            {props.icon && !props.flags ?
                <MaterialIcons name={props.nameIcon} size={props.sizeIcon} color={props.colorIcon} /> :
                props.flags ?
                    <View style={styles.containerFlags}>
                        <Image source={selectedFlags} style={styles.flags} />
                    </View>
                    : null}

            {props.typePopUp === 'mataUang' ?
                <Pressable onPress={props.handleFocus} style={{ width: '70%' }}>
                    <TextInput
                        ref={props.useRef}
                        keyboardType={props.typeKeboard}
                        placeholder={props.label}
                        value={props.amount}
                        onChangeText={props.handleChangeText}
                        style={[styles.input, { fontSize: props.fontSize, width: props.widthInput || '70%' }]}
                        maxLength={props.max}
                        editable={false}
                        onKeyPress={(e) => e.preventDefault()}
                    />
                </Pressable>
                : <TextInput
                    ref={props.useRef}
                    keyboardType={props.typeKeboard}
                    placeholder={props.label}
                    value={props.amount}
                    onChangeText={props.handleChangeText}
                    onFocus={props.handleFocus}
                    style={[styles.input, { fontSize: props.fontSize, width: props.widthInput || '70%' }]}
                    maxLength={props.max}
                />}

            {props.buttonPopUp &&
                <>
                    <Pressable onPress={() => props.setPopUp?.(!props.popUp)} style={styles.containerButton}>
                        <MaterialIcons name="keyboard-arrow-down" size={28} color={'black'} />
                    </Pressable>
                    {/* tampilkan modal*/}
                    {props.popUp && props.typePopUp !== 'mataUang' && <PopUpRekomendasi handleChangeTextNominal={props.handleChangeText} />}
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        height: '17%',
        borderColor: 'black',
        borderWidth: 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 4,
        alignItems: 'center',
        paddingHorizontal: '3%',
        marginBottom: '10%'
    },
    input: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
    },
    buttonCancel: {
        padding: 10,
        backgroundColor: 'red'
    },
    popUpContainer: {
        position: 'absolute',
        top: '80%',
        left: '28%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        gap: 3,
        width: '80%',
        backgroundColor: '#D9D9D9',
        paddingLeft: '10%',
        paddingBottom: '25%',
        paddingTop: '10%',
        zIndex: 10,
    },
    popUpText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 11,

    },
    containerButton: {
        height: '100%',
        width: '13%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerListPopUp: {
        height: '35%',
    },
    // flags 
    containerFlags: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '9%',
        height: '40%'
    },
    flags: {
        backgroundSize: 'cover',
        width: '100%',
        height: '100%'
    }
})

export default StyleInput;
