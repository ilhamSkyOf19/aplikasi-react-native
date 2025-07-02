import IdContextProvider, { useIdContext } from "@/context/IdContext";
import { SelectedNavigationProvider, useSelectedNavigation } from "@/context/NavigationContext";
import { SetoranRouteProp } from "@/interface/typeRouter";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { router, Stack, useNavigation, usePathname } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { DatabaseProvider } from "@/context/DatabaseContext";
import Splash from "@/components/splash";
import ButtonBasic from "@/components/ui/ButtonBasic";
import { useThemeFonts } from "@/constants/ThemeFont";
import { AddContextProvider, useContextAdd } from "@/context/AddContext";
import { CurrencyProvider } from "@/context/CurencyContext";
import { ModalDeleteTabunganProvider, useModalDeleteTabungan } from "@/context/ModalDeleteTabunganContext";
import { ModalDeleteTercapaiProvider, useModalDeleteTercapaiContext } from "@/context/ModalDeleteTercapaiContext";
import { DataKeuangan } from "@/interface/type";
import { dataKeuanganModel } from "@/models/dataKeuanganModel";
import { dataSetoranModel } from "@/models/dataSetoranModel";
import { getDataKeuangan } from "@/service/getData/getDataKeuangan.service";
import { height, width } from "@/utils/utils";
import 'react-native-get-random-values';



// ==================
// Props
// ==================



interface CustomSettingsHeaderProps {
    name: string,
    custom?: boolean;
}

interface PropCustomHeader {
    url: 'add' | 'tercapai' | 'setoran' | '';
}
export default function Layout() {
    // ==========
    // Create Tabel Data Keuangan
    // ==========
    useEffect(() => {
        dataKeuanganModel();
        dataSetoranModel();
    }, [])
    //==========
    // Routing: Ambil Pathname Saat Ini
    //==========
    const pathname = usePathname();

    //==========
    // State & Font: Cek Font dan Data Siap Ditampilkan
    //==========
    const fontsLoaded = useThemeFonts();
    const [ready, setReady] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false); // Kondisi untuk data lain

    //==========
    // Effect: Menunggu Fonts & Data Selesai Dimuat Sebelum Menampilkan Konten
    //==========
    useEffect(() => {
        if (fontsLoaded && dataLoaded) {
            const timer = setTimeout(() => {
                setReady(true); // Menandakan siap untuk merender konten utama
            }, 1000); // Delay 1 detik, bisa disesuaikan

            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [fontsLoaded, dataLoaded]);

    //==========
    // Effect: Simulasi Pemuatan Data (Bisa Diganti dengan API Sungguhan)
    //==========
    useEffect(() => {
        const loadData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 500)); // Simulasi loading
                setDataLoaded(true); // Tandai data selesai dimuat
            } catch (error) {
                console.warn('Error loading data:', error);
            }
        };

        loadData();
    }, []);

    //==========
    // Kondisi: Tampilkan Splash Screen Jika Belum Siap
    //==========
    if (!ready) {
        return <Splash />;
    }


    return (
        // <DatabaseProvider>
        <SelectedNavigationProvider>
            <IdContextProvider>
                <AddContextProvider>
                    <CurrencyProvider>
                        <ModalDeleteTabunganProvider>
                            <ModalDeleteTercapaiProvider>
                                <StatusBar translucent backgroundColor="transparent" barStyle={pathname.includes('setoran') || pathname.includes('add') || pathname.includes('tercapai') || pathname.includes('login') || pathname.includes('editProfile') ? 'dark-content' : 'light-content'} />
                                <Stack screenOptions={{ headerShown: false }}>
                                    {/* Tabs utama */}
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                    <Stack.Screen
                                        name="setoran"
                                        options={{
                                            headerShown: true,
                                            header: () => <CustomSetoranHeader url={'setoran'} /> // Gunakan custom header

                                        }}
                                    />
                                    <Stack.Screen
                                        name="add"
                                        options={{
                                            headerShown: true,
                                            header: () => <CustomSetoranHeader url={'add'} /> // Gunakan custom header

                                        }}
                                    />
                                    <Stack.Screen
                                        name="tercapai"
                                        options={{
                                            headerShown: true,
                                            header: () => <CustomSetoranHeader url={'tercapai'} /> // Gunakan custom header

                                        }}
                                    />
                                    <Stack.Screen
                                        name="login"
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                    <Stack.Screen
                                        name="register"
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                    <Stack.Screen
                                        name="editProfile"
                                        options={{
                                            headerShown: false,
                                        }}
                                    />

                                </Stack>
                            </ModalDeleteTercapaiProvider>
                        </ModalDeleteTabunganProvider>
                    </CurrencyProvider>
                </AddContextProvider>
            </IdContextProvider>
        </SelectedNavigationProvider>
        // </DatabaseProvider>

    );
}



const CustomSetoranHeader: React.FC<PropCustomHeader> = ({ url }) => {
    const { triger, setTriger } = useContextAdd();
    const { id } = useIdContext();
    //==========
    // Header State & Route Param
    //==========
    const [isHeader, setIsHeader] = useState<string>('');

    //==========
    // Navigation & Route Hooks
    //==========
    const navigation = useNavigation();
    const route = useRoute<SetoranRouteProp>();
    const { header, typeData } = route.params || {};

    //==========
    // Hook: Selected dari Navigasi
    //==========
    const { selected } = useSelectedNavigation();

    //==========
    // Effect: Set Header Berdasarkan URL atau Param
    //==========
    // useEffect(() => {

    // }, [url]);



    //==========
    // Focus Effect: Ambil Data & Set Header Berdasarkan ID dan Jenis Data
    //==========
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                let getDatas: DataKeuangan[] | null | undefined = [];
                if (typeData === 'harian') {
                    getDatas = await getDataKeuangan('dataHarian', 'belum');
                } else if (typeData === 'mingguan') {
                    getDatas = await getDataKeuangan('dataMingguan', 'belum');
                } else if (typeData === 'bulanan') {
                    getDatas = await getDataKeuangan('dataBulanan', 'belum');
                }

                console.log('getDatas', getDatas);

                if (getDatas) {
                    const found = getDatas.find((data) => data.id === id)?.nama || null;
                    setIsHeader(found || '');
                }
            };

            if (url === 'setoran') {
                fetchData();
            } else if (url === 'add') {
                setIsHeader(selected);
            }
        }, [url])
    );



    //==========
    // State: Tambah Tabungan
    //==========


    const handleAddTabungan = useCallback((): void => {
        setTriger(true);
    }, [selected]);

    //==========
    // State: Hapus Tabungan
    //==========
    const { setVisibleModalDeleteTabungan } = useModalDeleteTabungan();

    const handleDelete = useCallback((): void => {
        setVisibleModalDeleteTabungan(true);
    }, []);

    //==========
    // State: Hapus Tercapai
    //==========
    const { setIsModalDeleteTercapai } = useModalDeleteTercapaiContext();

    const handleDeleteTercapai = useCallback((): void => {
        setIsModalDeleteTercapai(true);
    }, []);

    //==========
    // Handle Edit Navigasi
    //==========


    const handleEdit = useCallback((params: { [key: string]: string }): void => {
        router.push({
            pathname: '/add',
            params: params,
        });
    }, []);


    return (
        <View style={styles.headerContent}>
            <View style={styles.containerBack}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="chevron-back-outline" size={28} color="#000" />
                    <Text style={styles.textHeader}> {isHeader} </Text>
                </TouchableOpacity>
            </View>
            {/* icon delete and edit  */}
            {url === 'setoran' && (
                <View style={styles.containerIconHeader}>
                    <TouchableOpacity onPress={() => handleEdit({ id: id.toString(), tipe: 'edit', typeData: selected })} style={styles.paddingIcon}>
                        <MaterialIcons name="edit" size={20} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} style={styles.paddingIcon}>
                        <MaterialIcons name="delete" size={20} color="gray" />
                    </TouchableOpacity>
                </View>
            )}
            {url === 'tercapai' && (
                <ButtonBasic
                    label='Hapus'
                    handleButton={[handleDeleteTercapai]}
                    custom={{ width: width / 4.8, backgroundColor: 'transparent' }}
                    customText={{ color: '#000', fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                />
            )}

            {url === 'add' && (
                <ButtonBasic
                    label='simpan'
                    handleButton={[handleAddTabungan]}
                    custom={{ width: width / 4.8 }} />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    containerSettingsHeader: {
        position: "absolute",
        top: 0, // Mulai dari atas layar
        left: 0,
        right: 0,
        height: height / 5.5, // Atur tinggi header
        backgroundColor: "#11A7FE",
        justifyContent: "center",
        paddingTop: height / 21, // Hindari tertutup status bar
        paddingLeft: width / 18,
        alignItems: "flex-start",
        zIndex: 10, // Pastikan di atas elemen lain
    },
    // custom header setoran
    headerContent: {
        height: height / 8, // Atur tinggi header
        backgroundColor: "white",
        paddingTop: height / 20, // Hindari tertutup status bar
        paddingLeft: width / 18,
        paddingRight: width / 16,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10, // Pastikan di atas elemen lain
    },
    textHeader: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16
    },
    containerIconHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2
    },
    title: {
        fontSize: 24,
        fontWeight: "semibold",
        color: "#fff",
        textAlign: "left",
        marginTop: 10,
    },
    containerBack: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8
    },
    paddingIcon: {
        padding: '8%'
    }
})