import { height, width } from '@/utils/utils';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
// ================
// Props
// ================
interface Props {
    label: string,
    hijau?: boolean,
    handleButton: (() => void)[];
    custom?: ViewStyle | ViewStyle[];
}
const ButtonSmall: React.FC<Props> = ({ handleButton, label, hijau, custom }) => {
    return (
        <TouchableOpacity onPress={() => handleButton.forEach(f => f())} >
            <View
                style={[styles.buttonStart, custom, hijau ? { backgroundColor: '#32CD32' } : { backgroundColor: 'red' }]}
            >
                <Text style={styles.textBold}>
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


export default memo(ButtonSmall)
