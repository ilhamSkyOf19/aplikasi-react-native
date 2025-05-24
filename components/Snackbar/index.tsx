import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { Snackbar } from 'react-native-paper';

// Props
interface SnackbarProps {
    playSnackbar: boolean;
    handleClose: () => void;
    infoSnackbar: string;
    custom?: ViewStyle | ViewStyle[];

}
const ComponentSnackbar: React.FC<SnackbarProps> = ({ playSnackbar, handleClose, infoSnackbar, custom }) => {
    return (
        <Snackbar
            visible={playSnackbar}
            duration={1500} // Durasi tampilnya Snackbar dalam milidetik
            onDismiss={handleClose}
            style={[styles.snackBar, custom]}
        >
            <Text style={styles.textSnackBar}>
                {infoSnackbar}
            </Text>
        </Snackbar>
    )
}



const styles = StyleSheet.create({
    snackBar: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,

    },
    textSnackBar: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    }
})

export default ComponentSnackbar;
