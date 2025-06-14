import { height, width } from "@/utils/utils";
import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

// ==================
// Props 
// ==================
interface Props {
    label: string,
    customLabel?: TextStyle | TextStyle[];
    handleButton: (() => void)[];
    custom?: ViewStyle | ViewStyle[];
}


const ButtonScale: React.FC<Props> = ({ handleButton, label, custom, customLabel }) => {
    return (
        <TouchableOpacity onPress={() => handleButton.forEach(f => f())} >
            <View
                style={[styles.buttonStart, custom]}
            >
                <Text style={[styles.textBold, customLabel]}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStart: {
        width: width / 4,
        height: height / 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBold: {
        color: 'white',
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    },
})


export default memo(ButtonScale);
