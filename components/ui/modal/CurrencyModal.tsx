import { useCurrencyContext } from '@/context/CurencyContext'
import { CurrencyInfo, currencyList, flagImages } from '@/data/typeCurrency'
import { ModalProps } from '@/interface/interfaceModal'
import { height, width } from '@/utils/utils'
import React, { memo, useState } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { RadioButton, Text } from 'react-native-paper'
import ButtonBasic from '../ButtonBasic'

// ==================
// Props 
// ==================

interface renderItemProps {
    item: CurrencyInfo;
    index: number;
    selected: number;
    setSelected: (selected: number) => void
}


// ==================
// Props Inheritence
// ==================
type ModalEstimasiProps = ModalProps;





const CurrencyModal: React.FC<ModalEstimasiProps> = ({ onCancel, isVisible }) => {
    // ==================
    // currency context 
    // ==================
    const { setCurrency } = useCurrencyContext();

    // ==================
    // state selected 
    // ==================
    const [selected, setSelected] = useState<number>(1);

    // ==================
    // handle simpan 
    // ==================
    const handleSimpan = (): void => {
        setCurrency(Number(selected));
    };




    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onCancel}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={400}
            animationOutTiming={700}
            backdropOpacity={0.4}
            statusBarTranslucent={false}
            useNativeDriver={true}
            style={styles.modal}
        >
            <View style={styles.contentModal}>
                <Text variant="titleLarge" style={styles.title}>
                    Pilih Mata Uang
                </Text>
                <FlatList
                    data={currencyList}
                    keyExtractor={(_, index) => (index + 1).toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <RenderItem item={item} index={index} selected={selected} setSelected={setSelected} />}
                    style={{ width: '100%', paddingHorizontal: '10%', backgroundColor: 'white' }}
                />
                <View style={styles.containerButton}>
                    <ButtonBasic handleButton={[onCancel]} label={'Tutup'} custom={{ backgroundColor: '#fff' }} customText={{ color: '#000', fontFamily: 'Poppins-Bold' }} />
                    <ButtonBasic handleButton={[handleSimpan, onCancel]} label={'Simpan'} custom={{ height: height / 20, width: width / 3.8 }} customText={{ fontFamily: 'Poppins-Bold' }} />
                </View>
            </View>
        </Modal>
    )
}



// render item 
const RenderItemComponent: React.FC<renderItemProps> = ({ item, index, selected, setSelected }) => {
    const flagsImage = flagImages[item.flag];
    return (
        <View style={styles.containerMataUang}>
            <View style={styles.containerImage}>
                <Image source={flagsImage} style={styles.image} />
            </View>
            <RadioButton.Item
                label={`${item.countries} \n${item.code}`}
                value={(index + 1).toString()}
                onPress={() => setSelected((index + 1))}
                status={selected === (index + 1) ? 'checked' : 'unchecked'}
                labelStyle={{ fontSize: 15 }}
                position="trailing"
                style={{ width: '100%' }}
            />
        </View>
    )
}

const RenderItem = memo(RenderItemComponent);



const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    contentModal: {
        backgroundColor: '#fff',
        width: width / 1.230,
        minHeight: height / 1.45,
        maxHeight: height / 1.45,
        borderRadius: 30,
        paddingTop: '7%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        // paddingLeft: width / 30,
        marginBottom: '5%',
        paddingHorizontal: '6%',
    },
    item: {
        padding: width / 30,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    label: {
        fontSize: 16,
    },

    containerMataUang: {
        width: '90%',
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10
    },
    containerImage: {
        width: width / 10,
        height: width / 10,
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    containerButton: {
        width: '100%',
        height: '14%',
        borderTopColor: 'rgba(0,0,0,0.2)',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '15%'

    }




})


export default memo(CurrencyModal)
