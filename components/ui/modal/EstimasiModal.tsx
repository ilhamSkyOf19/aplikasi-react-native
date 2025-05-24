import { useCurrencyContext } from '@/context/CurencyContext'
import { CurrencyInfo, currencyList } from '@/data/typeCurrency'
import { ModalProps } from '@/interface/interfaceModal'
import { estimasiPencapaian, formatCurrency, formattedNonDecimal, height, width } from '@/utils/utils'
import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'

// ==================
// Props
// ==================
interface ModalEstimasi {
    target: string;
    estimasi: string;

}

// ==================
// Props Inheritence
// ==================
type ModalEstimasiProps = ModalProps & ModalEstimasi;


const EstimasiModal: React.FC<ModalEstimasiProps> = ({ onCancel, isVisible, target, estimasi }) => {

    //==========
    // State Currency Context
    //==========
    const { currency } = useCurrencyContext();
    const [currencySelected, setCurrencySelected] = useState<CurrencyInfo | null>(null);

    //==========
    // Effect: Set Currency Selected Based on Index
    //==========
    useEffect(() => {
        currencyList.find((item, index) => {
            if ((index + 1) === currency) {
                setCurrencySelected(item);
            }
        });
    }, [currency]);

    //==========
    // State Target dan Estimasi (Formatted)
    //==========
    const [formattedTarget, setFormattedTarget] = useState<string | null>(null);
    const [formattedEstimasi, setFormattedEstimasi] = useState<string | null>(null);

    //==========
    // State dan Perhitungan Tanggal Pencapaian
    //==========
    const [tanggal, setTanggal] = useState<string>('');
    const [jumlahHari, setJumlahHari] = useState<number>(0);

    //==========
    // Effect: Hitung Estimasi Tanggal Pencapaian dan Jumlah Hari
    //==========
    useEffect(() => {
        setFormattedTarget(formattedNonDecimal(target || ''));
        setFormattedEstimasi(formattedNonDecimal(estimasi || ''));

        const formattedtarget: number = Number(formattedNonDecimal(target));
        const formattedEstimasi: number = Number(formattedNonDecimal(estimasi));

        if (formattedtarget > 0 && formattedtarget > 0) {
            const hari = Math.round(formattedtarget / formattedEstimasi);
            if (hari > 3650) {
                setJumlahHari(0);
                setTanggal('10 tahun++');
            } else {
                setTanggal(estimasiPencapaian(formattedtarget, formattedEstimasi, new Date()))
                setJumlahHari(hari);
            }
        } else {
            setJumlahHari(0);
            setTanggal('');
        }

    }, [target, estimasi]);


    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onCancel}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={500}       // Bisa kamu sesuaikan
            animationOutTiming={500}
            backdropOpacity={0.4}
            statusBarTranslucent={false}
            useNativeDriver={true}
            style={styles.modal}
        >
            <View style={[styles.contentModal]}>
                <Text style={styles.title}>Estimasi</Text>
                <View style={styles.containerKeterangan}>
                    <View style={styles.contianerContentKeterangan}>
                        <Text style={styles.titleKeterangan}>Target</Text>
                        <Text style={styles.keterangan}>
                            {
                                formatCurrency(Number(formattedTarget),
                                    currencySelected?.locale || 'id-ID', currencySelected?.code || 'IDR')
                            }
                        </Text>
                    </View>
                    <View style={styles.contianerContentKeterangan}>
                        <Text style={styles.titleKeterangan}>Estimasi Pengisian</Text>
                        <Text style={styles.keterangan}>
                            {
                                formatCurrency(Number(formattedEstimasi),
                                    currencySelected?.locale || 'id-ID', currencySelected?.code || 'IDR')
                            }
                        </Text>
                    </View>
                    <View style={styles.contianerContentKeterangan}>
                        <Text style={styles.titleKeterangan}>Estimasi Tercapai</Text>
                        <Text style={styles.keterangan}>
                            {
                                jumlahHari > 0 ? `${tanggal} (${jumlahHari} Hari)` : tanggal

                            }
                        </Text>
                    </View>

                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentModal: {
        backgroundColor: '#fff',
        width: width / 1.230,
        minHeight: height / 2.8,
        borderRadius: 15,
        paddingHorizontal: width / 20, // ✅ Tambahkan di sini
        paddingVertical: width / 20, // ✅ Tambahkan di sini
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        marginBottom: '4%',
    },
    containerKeterangan: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        gap: 10
    },
    contianerContentKeterangan: {

    },
    titleKeterangan: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    keterangan: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
    }


})


export default memo(EstimasiModal);
