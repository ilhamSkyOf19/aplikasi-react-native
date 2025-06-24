import { height, width } from '@/utils/utils'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


interface ButtonLoginProps {
    handleButton: () => void
    color?: string
    colorText?: string
}
const ButtonLogin: React.FC<ButtonLoginProps> = ({ handleButton, color, colorText }) => {
    return (
        <TouchableOpacity onPress={() => handleButton()}>
            <Text style={[styles.textLogin, { backgroundColor: color, color: colorText }]}>Login</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textLogin: {
        backgroundColor: '#ffffff',
        paddingVertical: height / 170,
        paddingHorizontal: width / 20,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 13,
        borderRadius: 7,
    }
})



export default ButtonLogin
