import ImagePickerModal from '@/components/modal/ImagePickerModal'
import { getImg } from '@/service/auth/getImg.service'
import { getToken } from '@/service/auth/token.service'
import { updateUsername, updateUsernameAndImg } from '@/service/auth/update.service'
import { height, width } from '@/utils/utils'
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
const sample = require('../../assets/images/sample_native.jpg')


const EditProfile = () => {

    // state username 
    const [usernameOld, setUsernameOld] = useState<string>('');
    const [usernameNew, setUsernameNew] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [uriImg, setUriImg] = useState<string>('');

    // get username old 
    useEffect(() => {
        const fetch = async () => {
            const token = await getToken();
            if (!token) {
                router.push('/');
            } else {
                const fetch = await getImg(token as string);
                if (!fetch.success) {
                    router.push('/');
                } else
                    if (fetch.data) {
                        setUriImg(fetch.data);
                    }
                setUsernameOld(token as string);
            }
        }
        fetch()
    }, [])


    // handle username new 
    const handleUsernameNew = (value: string) => setUsernameNew(value.trim());

    // handle update
    const handleUpdate = () => {
        const update = async () => {
            try {
                await updateUsername(usernameOld, usernameNew);
                await updateUsernameAndImg({ username: usernameOld, data: { img: uriImg } });

                alert('Update Success');
                return router.back();
            } catch (error) {
                console.log('Update error:', error);
                alert('Terjadi kesalahan saat update');
            }
        }
        // console.log(usernameOld, usernameNew);
        update();
    }



    // handle pick img 
    const handleModalPick = () => {
        setVisible(true);
    };

    // handle uri 
    const handleUri = (data: string | null) => {
        setUriImg(data ?? '');
    }

    return (
        <>
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
                            <View style={styles.profile}>
                                {
                                    uriImg ? (
                                        <Image source={uriImg ? { uri: uriImg } : sample} style={styles.imgProfile} />
                                    ) : (
                                        <FontAwesome name="user-circle" size={180} color="grey" />
                                    )
                                }
                            </View>
                            <TouchableOpacity style={styles.containerEditImg} onPress={handleModalPick}>
                                <MaterialCommunityIcons name="image-edit" size={30} color="white" />
                            </TouchableOpacity>
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
                                    value={usernameNew}
                                    onChangeText={handleUsernameNew}
                                />
                            </View>

                        </View >
                        <TouchableOpacity style={styles.button} onPress={() => { handleUpdate() }}>
                            <Text style={styles.textButton}>Simpan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <ImagePickerModal isVisible={visible} onCancel={() => setVisible(false)} handleUri={handleUri} />
            </View>
        </>
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
        borderColor: 'white',
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
    },
    profile: {
        borderWidth: 1,
        width: width / 1.8,
        height: width / 1.8,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgProfile: {
        width: width / 1.9,
        height: width / 1.9,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default EditProfile
