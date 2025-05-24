import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'


// ================
// Props
// ================
interface Props {
    handleSettings: () => void,
    handleAbout: () => void,
    width: number,
}
const IconSettings: React.FC<Props> = ({ handleSettings, handleAbout, width }) => {
    return (
        <View style={{
            width: width / 4.5,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10
        }}>
            <TouchableOpacity onPress={handleAbout}>
                <View
                    style={{
                        borderColor: 'white',
                        borderRadius: 30,
                        padding: width / 140,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <MaterialIcons name='question-mark' size={13} color='white' />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSettings}>
                <View
                >
                    <MaterialIcons name='settings' size={22} color='white' />
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default IconSettings
