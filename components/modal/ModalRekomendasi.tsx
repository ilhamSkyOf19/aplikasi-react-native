import { height } from "@/utils/utils";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

// ==================
// Props
// ==================
interface PopUpRekomendasiProps {
    handleChangeTextNominal?: (value: string) => void;
}

const PopUpRekomendasiComponent: React.FC<PopUpRekomendasiProps> = ({
    handleChangeTextNominal,
}) => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.popUpContainer}>
                {[
                    { label: "Rp. 5.000", value: "5000" },
                    { label: "Rp. 10.000", value: "10000" },
                    { label: "Rp. 50.000", value: "50000" },
                    { label: "Rp. 100.000", value: "100000" },
                ].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.containerListPopUp}
                        onPress={() => handleChangeTextNominal?.(item.value)}
                    >
                        <Text style={styles.popUpText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </TouchableWithoutFeedback>
    );
};

const PopUpRekomendasi = memo(PopUpRekomendasiComponent);

const styles = StyleSheet.create({

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
        paddingBottom: height / 11,
        paddingTop: '10%',
        zIndex: 10,
    },
    popUpText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,

    },
    containerButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerListPopUp: {
        height: '40%',
    },
})

export default memo(PopUpRekomendasi);
