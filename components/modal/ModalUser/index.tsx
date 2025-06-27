import { logout } from '@/service/auth/logout.service'
import { height, width } from '@/utils/utils'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ButtonLogin from '../../ButtonLogin'

interface Props {
    userData: string | null
    token: boolean
    handleUser: () => void
    img: string
}

const ModalUser: React.FC<Props> = ({ userData, token, handleUser, img }) => {
    // handle logout
    const handleLogout = useCallback(() => {
        logout();
        router.push('/login');
    }, [])





    return (
        <Pressable
            onPress={handleUser}
            style={{
                backgroundColor: 'transparent',
                width: width,
                height: height,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10,
            }}
        >
            <Pressable
                style={styles.modalUser}
                onPress={() => { }} // penting: agar tap dalam modal tidak menutup
            >
                {token ? (
                    <>
                        <View style={styles.containerIconProfile}>
                            <View style={styles.bgIconProfile}>
                                {
                                    img ? (
                                        <Image source={{ uri: img }} style={styles.iconProfile} />
                                    ) : (
                                        <FontAwesome name="user-circle" size={55} color="rgba(0, 0, 0, 0.5)" />
                                    )

                                }
                            </View>
                            <Text style={styles.textIconProfile}>{userData}</Text>
                        </View>
                        <View style={styles.containerButton}>
                            <TouchableOpacity style={styles.modalButtonTextUser} onPress={() => router.push('/editProfile')}>
                                <View style={styles.containerEditProfile}>
                                    <MaterialCommunityIcons name="account-edit" size={20} color="rgba(0, 0, 0, 0.5)" />
                                    <Text style={styles.textModalUser}>Edit Profile</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButtonTextUser, { borderBottomWidth: 0 }]} onPress={handleLogout}>
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
            </Pressable>
        </Pressable>
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
        right: width / 20,
        top: height / 9,
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
        fontSize: 13,
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
    },

    bgIconProfile: {
        width: width / 6,
        height: width / 6,
        borderRadius: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconProfile: {
        width: width / 6,
        height: width / 6,
        borderRadius: 100,
    }
})

export default ModalUser
