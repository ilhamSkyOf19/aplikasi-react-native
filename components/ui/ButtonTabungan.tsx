import { height, width } from '@/utils/utils';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

// ================
// Props
// ================
interface ButtonProps {
    onPress: () => void,
    labelButton: string,
    isSelected: boolean;
    customButton?: ViewStyle
}


const ButtonTabungan: React.FC<ButtonProps> = ({ onPress, labelButton, isSelected, customButton }) => {
    return (
        <Pressable onPress={onPress} >
            <View
                style={[styles.button, isSelected ? styles.selected : styles.unselected, customButton]}
            >
                <Text style={[styles.buttonText, isSelected ? styles.TextSelected : styles.TextUnselected]}>{labelButton}</Text>
            </View>
        </Pressable>
    )
}

export default ButtonTabungan;

const styles = StyleSheet.create({
    button: {
        minHeight: height * 4 / 80,
        paddingHorizontal: width / 30,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 13,
        fontWeight: "bold",
    },
    TextSelected: {
        color: 'white'
    },
    TextUnselected: {
        color: "white",
    },
    selected: {
        borderColor: "#ffa500",
        backgroundColor: "#2E7EBB",
        color: 'white',
        borderRadius: width / 30
    },
    unselected: {
        borderColor: "transparent",
        backgroundColor: "transparent",
        borderRadius: 10
    },
})
