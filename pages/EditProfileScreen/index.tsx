import { height, width } from '@/utils/utils'
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const EditProfile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containerBack}>
                <TouchableOpacity onPress={() => { router.back() }} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: '1%' }}>
                    <AntDesign name="arrowleft" size={28} color="black" />
                    <Text style={styles.textBack}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerEdit}>
                <View style={styles.containerImg}>
                    <View style={styles.containerProfile}>
                        <FontAwesome name="user-circle" size={180} color="grey" />
                        <Pressable style={styles.containerEditImg}>
                            <MaterialCommunityIcons name="image-edit" size={30} color="white" />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.containerInput}>
                    <View style={styles.containerTitleInput}>
                        <Text style={styles.textTitleInput}>Ganti Username</Text>
                    </View>
                    <View style={[styles.input]}>
                        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center', width: '85%' }}>
                            <FontAwesome5 name='user' size={20} color='rgba(0, 0, 0, 0.5)' />
                            <TextInput
                                keyboardType='default'
                                placeholder={'Username'}
                                placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                style={styles.inputText}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>

                    </View >
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#ffffff',
    },
    // back
    containerBack: {
        width: width,
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingBottom: '5%',
        paddingHorizontal: '5%',
    },
    textBack: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: 'black'
    },

    // container edit 
    containerEdit: {
        width: width,
        height: '87%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    // container img
    containerImg: {
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
        marginBottom: '6%'
    },

    // container profile 
    containerProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 1.9,
        height: width / 1.9,
        borderRadius: 100,
    },

    // container edit image 
    containerEditImg: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 4,
        backgroundColor: 'grey',
        borderRadius: 100,
        padding: 10,
        borderWidth: 5,
        borderColor: 'white'
    },

    // container input 
    containerInput: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '7%',
        gap: 14
    },
    input: {
        width: '100%',
        height: height / 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: width / 20,
        borderRadius: 25,
        marginBottom: width / 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputText: {
        width: '100%',
        height: '100%',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderColor: 'white',
    },

    // container title input 
    containerTitleInput: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    textTitleInput: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: 'black'
    },

    button: {
        width: '100%',
        height: height / 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#11A7FE',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textButton: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: 'white'
    }
})

export default EditProfile
