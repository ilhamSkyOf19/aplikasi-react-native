import { logout } from '@/service/auth/logout.service'
import { height, width } from '@/utils/utils'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ButtonLogin from '../../ButtonLogin'

interface Props {
    userData: string | null
    token: boolean
}

const ModalUser: React.FC<Props> = ({ userData, token }) => {

    const handleLogout = useCallback(() => {
        logout();
        router.push('/login');
    }, [])



    return (
        <View style={styles.modalUser}>
            {token ? (
                <>
                    <View style={styles.containerIconProfile}>
                        <FontAwesome name="user-circle" size={45} color="rgba(0, 0, 0, 0.5)" />
                        <Text style={styles.textIconProfile}>{userData}</Text>
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.modalButtonTextUser} onPress={() => router.push('/editProfile')}>
                            <View style={styles.containerEditProfile}>
                                <MaterialCommunityIcons name="account-edit" size={20} color="rgba(0, 0, 0, 0.5)" />
                                <Text style={styles.textModalUser}>Edit Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButtonTextUser, { borderBottomWidth: 0 }]} onPress={() => handleLogout()}>
                            <View style={styles.containerEditProfile}>
                                <FontAwesome name="sign-out" size={20} color="rgba(0, 0, 0, 0.5)" />
                                <Text style={styles.textModalUser}>Log out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.containerButtonLogin}>
                    <ButtonLogin handleButton={() => router.push('/login')} color='#11A7FE' colorText='white' />
                    <View style={styles.containerEditProfile}>
                        <Text style={styles.textModalUser}>Silahkan Login</Text>
                        <FontAwesome name="sign-in" size={20} color="rgba(0, 0, 0, 0.5)" />
                    </View>
                </View>
            )}

        </View>
    )
}



const styles = StyleSheet.create({
    // modal user 
    modalUser: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        width: width / 2.3,
        minHeight: width / 1.8,
        borderRadius: 10,
        right: 0,
        top: height / 20,
        zIndex: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
        gap: 5,
        paddingTop: width / 45
    },
    textModalUser: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
    },
    modalButtonTextUser: {
        paddingHorizontal: width / 50,
        width: '100%',
        borderBottomWidth: 0.5,
    },
    containerIconProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        paddingVertical: width / 30,
        backgroundColor: '#dddddd',
        gap: 6,
        borderRadius: 10
    },
    textIconProfile: {
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
        textAlign: 'center'
    },

    // container button 
    containerButton: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        gap: 6,
        paddingHorizontal: width / 50,
        paddingVertical: width / 50
    },


    // edit profile 
    containerEditProfile: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        paddingVertical: width / 50
    },

    // container button 
    containerButtonLogin: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})

export default ModalUser
