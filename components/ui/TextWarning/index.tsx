import { memo } from "react"
import { StyleSheet, Text, View } from "react-native"

interface WarningProps {
    message: string
}

// Waring component 
const Warning: React.FC<WarningProps> = ({ message }) => {
    return (
        <View style={styles.containerWaring}>
            <Text style={styles.textWaring}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerWaring: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: '9.5%',
    },
    textWaring: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10.5,
        color: 'red'
    }
})

export default memo(Warning);