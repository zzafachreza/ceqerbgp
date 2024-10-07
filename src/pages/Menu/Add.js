import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    TouchableWithoutFeedback,
    PermissionsAndroid,
    ScrollView,
    FlatList,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';
import MyLoading from '../../components/MyLoading';
import GetLocation from 'react-native-get-location'
import { showMessage } from 'react-native-flash-message';

export default function Add({ navigation, route }) {

    const [comp, setComp] = useState({});
    const [dataPlat, setDataPlat] = useState([]);
    const [dataSupplier, setDataSuppplier] = useState([]);


    const [kirim, setKirim] = useState({
        fid_user: route.params.id,
        plat_nomor: '',
        nama_supplier: '',
        jenis_kendaraan: '',
        jenis_muatan: '',
        panjang: '',
        lebar: '',
        tinggi: '',
        pa: '',
        fl: '',
        volume: '',
        rit: '',
        foto_kendaraan: 'https://zavalabs.com/nogambar.jpg',
        foto_muatan: 'https://zavalabs.com/nogambar.jpg',
        latitude: '',
        longitude: '',
    });


    const [cek, setCek] = useState({
        plat_nomor: 0,
        nama_supplier: 0,
        jenis_kendaraan: 0,
        panjang: 0,
        lebar: 0,
        tinggi: 0,
        fl: 0,
    })

    const cekData = () => {
        console.log(kirim.plat_nomor.length)
        if (kirim.plat_nomor.length == 0) {
            setCek({ ...cek, plat_nomor: 1 })
        } else if (cek.plat_nomor > 0) {
            setCek({ ...cek, plat_nomor: 0 })
        } else if (kirim.nama_supplier.length == 0) {
            setCek({ ...cek, nama_supplier: 1 })
        } else if (cek.nama_supplier > 0) {
            setCek({ ...cek, nama_supplier: 0 })
        } else if (kirim.jenis_kendaraan.length == 0) {
            setCek({ ...cek, jenis_kendaraan: 1 })
        } else if (cek.jenis_kendaraan > 0) {
            setCek({ ...cek, jenis_kendaraan: 0 })
        } else if (kirim.panjang.length == 0) {
            setCek({ ...cek, panjang: 1 })
        } else if (cek.panjang > 0) {
            setCek({ ...cek, panjang: 0 })
        } else if (kirim.lebar.length == 0) {
            setCek({ ...cek, lebar: 1 })
        } else if (cek.lebar > 0) {
            setCek({ ...cek, lebar: 0 })
        } else if (kirim.tinggi.length == 0) {
            setCek({ ...cek, tinggi: 1 })
        } else if (cek.tinggi > 0) {
            setCek({ ...cek, tinggi: 0 })
        } else if (kirim.fl.length == 0) {
            setCek({ ...cek, fl: 1 })
        } else if (cek.fl > 0) {
            setCek({ ...cek, fl: 0 })
        } else {
            console.log({
                ...kirim,
                volume: ((parseFloat(kirim.panjang) * parseFloat(kirim.lebar) * parseFloat(kirim.tinggi)) + parseFloat(kirim.pa)) + parseFloat(kirim.fl)
            })
            setKirim({
                ...kirim,
                volume: ((parseFloat(kirim.panjang) * parseFloat(kirim.lebar) * parseFloat(kirim.tinggi)) + parseFloat(kirim.pa)) + parseFloat(kirim.fl)
            })
            showMessage({
                message: 'Data input sudah sesuai',
                icon: 'success',
                type: 'success'
            })
        }
    }
    const [loading, setLoading] = useState(false);
    const sendServer = () => {

        console.log(kirim)
        if (cek.plat_nomor == 0 &&
            cek.nama_supplier == 0 &&
            cek.jenis_kendaraan == 0 &&
            cek.panjang == 0 &&
            cek.lebar == 0 &&
            cek.tinggi == 0 &&
            cek.fl == 0


        ) {
            // setLoading(true);

            axios.post(apiURL + 'insert_laporan', {
                ...kirim,
                volume: ((parseFloat(kirim.panjang) * parseFloat(kirim.lebar) * parseFloat(kirim.tinggi)) + parseFloat(kirim.pa)) + parseFloat(kirim.fl)
            }).then(res => {
                console.log(res.data)

                setLoading(false);

                if (res.data.status == 200) {
                    SweetAlert.showAlertWithOptions({
                        title: MYAPP,
                        subTitle: res.data.message,
                        style: 'success',
                        cancellable: true
                    },
                        callback => {
                            Linking.openURL('https://wa.me/' + comp.tlp + '?text=' + res.data.link)
                            // navigation.replace('MainApp');
                            // navigation.goBack();
                        });


                }
            })
        } else {
            console.log(cek);
            showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Data yang di input belum sesuai !'
            })
        }



    }
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Izin Kamera',
                    message: 'Permintaan izin akses kamera',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const Simeter = ({ pangkat = '' }) => {
        return (
            <View style={{
                right: 10,
                top: 42,
                position: 'absolute',
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    lineHeight: 26,
                    color: colors.primary
                }}> m

                </Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                    lineHeight: 20,
                    color: colors.primary
                }}>{pangkat}</Text>
            </View>
        )
    }

    const [buka, setBuka] = useState({
        plat: false,
        supplier: false
    })

    const CariData = ({ tipe = 'Plat' }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {

                if (tipe == 'Plat') {
                    setBuka({
                        ...buka,
                        plat: true
                    })
                } else {
                    setBuka({
                        ...buka,
                        supplier: true
                    })
                }
            }}>
                <View style={{
                    right: 0,
                    top: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    position: 'absolute',
                    height: 50,
                }}>
                    <Icon type='ionicon' name='search' color={colors.primary} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Izin Lokasi',
                    message: 'Permintaan izin akses lokasi',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the localtion');

                GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 60000,
                })
                    .then(location => {
                        console.log(location);
                        setKirim({
                            ...kirim,
                            latitude: location.latitude,
                            longitude: location.longitude,
                        })
                    })
                    .catch(error => {
                        const { code, message } = error;
                        console.warn(code, message);
                    })

            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const __getTransaction = () => {
        axios.post(apiURL + 'database').then(res => {
            console.log(res.data.plat);
            setDataPlat(res.data.plat);
            setDataSuppplier(res.data.supplier);
        })
    }

    useEffect(() => {
        __getTransaction();
        requestCameraPermission();
        requestLocationPermission();
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data);
            setComp(res.data.data);
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
        }}>
            <MyHeader title="Input Laporan" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>



                <View>
                    <MyInput colorIcon={parseFloat(cek.plat_nomor) > 0 ? colors.danger : Color.blueGray[300]} label="Plat Nomor Kendaraan" placeholder="Masukan Plat Nomor Kendaraan" value={kirim.plat_nomor} onChangeText={x => {
                        setKirim({ ...kirim, plat_nomor: x })


                    }

                    } iconname="card" />
                    <CariData tipe='Plat' />



                    {buka.plat &&
                        <View style={{
                            backgroundColor: colors.white,
                            marginTop: 10,
                            borderRadius: 12,
                            padding: 10,
                        }}>
                            <TouchableOpacity onPress={() => setBuka({ ...buka, plat: false })} style={{
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }}>
                                <Icon type='ionicon' name='close-circle' size={30} />
                            </TouchableOpacity>
                            <FlatList data={dataPlat} renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => setKirim({ ...kirim, plat_nomor: item.plat_nomor })} style={{
                                        padding: 10,
                                        marginBottom: 5,
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Text style={{
                                            ...fonts.headline4
                                        }}>{item.plat_nomor}</Text>
                                    </TouchableOpacity>
                                )
                            }} />
                        </View>
                    }
                </View>
                <MyGap jarak={20} />

                <View>
                    <MyInput colorIcon={cek.nama_supplier > 0 ? colors.danger : Color.blueGray[300]} label="Nama Supplier" placeholder="Masukan Nama Supplier" value={kirim.nama_supplier} onChangeText={x => setKirim({ ...kirim, nama_supplier: x })} iconname="person" />
                    <CariData tipe='Supplier' />
                    {buka.supplier &&
                        <View style={{
                            backgroundColor: colors.white,
                            marginTop: 10,
                            borderRadius: 12,
                            padding: 10,
                        }}>
                            <TouchableOpacity onPress={() => setBuka({ ...buka, supplier: false })} style={{
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }}>
                                <Icon type='ionicon' name='close-circle' size={30} />
                            </TouchableOpacity>
                            <FlatList data={dataSupplier} renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => setKirim({ ...kirim, nama_supplier: item.nama_supplier })} style={{
                                        padding: 10,
                                        marginBottom: 5,
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Text style={{
                                            ...fonts.headline4
                                        }}>{item.nama_supplier}</Text>
                                    </TouchableOpacity>
                                )
                            }} />
                        </View>
                    }
                </View>
                <MyGap jarak={20} />
                <MyInput colorIcon={cek.jenis_kendaraan > 0 ? colors.danger : Color.blueGray[300]} label="Jenis Kendaraan" placeholder="Masukan Jenis Kendaraan" value={kirim.jenis_kendaraan} onChangeText={x => setKirim({ ...kirim, jenis_kendaraan: x })} iconname="hardware-chip-outline" />
                <MyGap jarak={20} />
                <MyInput label="Jenis Muatan" placeholder="Masukan Jenis Muatan" value={kirim.jenis_muatan} onChangeText={x => setKirim({ ...kirim, jenis_muatan: x })} iconname="server" />
                <MyGap jarak={20} />


                <View style={{
                    marginBottom: 20,
                }}>
                    <MyInput colorIcon={cek.panjang > 0 ? colors.danger : Color.blueGray[300]} keyboardType='number-pad' label="Panjang" placeholder="Masukan Panjang" value={kirim.panjang} onChangeText={x => setKirim({ ...kirim, panjang: x })} iconname="options" />
                    <Simeter />
                </View>
                <View style={{
                    marginBottom: 20,
                }}>
                    <MyInput colorIcon={cek.lebar > 0 ? colors.danger : Color.blueGray[300]} keyboardType='number-pad' label="Lebar" placeholder="Masukan Lebar" value={kirim.lebar} onChangeText={x => setKirim({ ...kirim, lebar: x })} iconname="expand" />
                    <Simeter />
                </View>
                <View style={{
                    marginBottom: 20,
                }}>
                    <MyInput colorIcon={cek.tinggi > 0 ? colors.danger : Color.blueGray[300]} keyboardType='number-pad' label="Tinggi" placeholder="Masukan Tinggi" value={kirim.tinggi} onChangeText={x => setKirim({ ...kirim, tinggi: x })} iconname="swap-vertical" />
                    <Simeter />
                </View>

                <MyInput label="Pa" keyboardType='number-pad' placeholder="Masukan Pa" value={kirim.pa} onChangeText={x => setKirim({ ...kirim, pa: x })} iconname="copy" />
                <MyGap jarak={20} />
                <MyInput colorIcon={cek.fl > 0 ? colors.danger : Color.blueGray[300]} label="Fl" keyboardType='number-pad' placeholder="Masukan Fl" value={kirim.fl} onChangeText={x => setKirim({ ...kirim, fl: x })} iconname="file-tray-full" />
                <MyGap jarak={20} />
                {kirim.volume > 0 &&

                    <View style={{
                        marginBottom: 20,
                    }}>
                        <Text style={{
                            ...fonts.body3,
                            color: colors.white,
                            marginBottom: 5,
                        }}>Volume</Text>
                        <View style={{
                            height: 50,
                            backgroundColor: colors.white,
                            borderRadius: 12,
                            position: 'relative',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>

                            <Text style={{
                                ...fonts.headline1
                            }}>{kirim.volume}


                            </Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 20,
                                lineHeight: 26,
                                color: colors.primary
                            }}> m

                            </Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 15,
                                lineHeight: 20,
                                color: colors.primary
                            }}>3</Text>


                        </View>
                    </View>

                }



                <MyInput label="RIT Ke" keyboardType='number-pad' placeholder="Masukan Rit Ke" value={kirim.rit} onChangeText={x => setKirim({ ...kirim, rit: x })} iconname="create" />
                <MyGap jarak={20} />


                <Text style={{
                    ...fonts.body3,
                    color: colors.white,
                    marginBottom: 10,
                }}>Upload Foto Kendaraan</Text>
                <TouchableWithoutFeedback

                    onPress={() => Alert.alert(MYAPP, 'Pilih ambil gambar', [
                        {
                            'text': 'cancel'
                        },
                        {
                            text: 'GALERI',
                            onPress: () => {
                                launchImageLibrary({
                                    includeBase64: true,
                                    quality: 1,
                                    mediaType: "photo",
                                    maxWidth: 1000,
                                    maxHeight: 1000
                                }, response => {
                                    // console.log('All Response = ', response);

                                    setKirim({
                                        ...kirim,
                                        foto_kendaraan: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                                    });
                                });
                            }
                        },
                        {
                            text: 'KAMERA',
                            onPress: () => {
                                launchCamera({
                                    includeBase64: true,
                                    quality: 1,
                                    mediaType: "photo",
                                    maxWidth: 1000,
                                    maxHeight: 1000
                                }, response => {
                                    // console.log('All Response = ', response);

                                    setKirim({
                                        ...kirim,
                                        foto_kendaraan: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                                    });
                                });
                            }
                        }
                    ])}


                >
                    <View style={{
                        backgroundColor: colors.white,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <Image style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.foto_kendaraan
                        }} />
                    </View>
                </TouchableWithoutFeedback>

                <MyGap jarak={20} />

                <Text style={{
                    ...fonts.body3,
                    color: colors.white,
                    marginBottom: 10,
                }}>Upload Foto Pengukuran/Muatan</Text>
                <TouchableWithoutFeedback

                    onPress={() => Alert.alert(MYAPP, 'Pilih ambil gambar', [
                        {
                            'text': 'cancel'
                        },
                        {
                            text: 'GALERI',
                            onPress: () => {
                                launchImageLibrary({
                                    includeBase64: true,
                                    quality: 1,
                                    mediaType: "photo",
                                    maxWidth: 1000,
                                    maxHeight: 1000
                                }, response => {
                                    // console.log('All Response = ', response);

                                    setKirim({
                                        ...kirim,
                                        foto_muatan: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                                    });
                                });
                            }
                        },
                        {
                            text: 'KAMERA',
                            onPress: () => {
                                launchCamera({
                                    includeBase64: true,
                                    quality: 1,
                                    mediaType: "photo",
                                    maxWidth: 1000,
                                    maxHeight: 1000
                                }, response => {
                                    // console.log('All Response = ', response);

                                    setKirim({
                                        ...kirim,
                                        foto_muatan: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                                    });
                                });
                            }
                        }
                    ])}


                >
                    <View style={{
                        backgroundColor: colors.white,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <Image style={{
                            width: '100%',
                            height: 200,
                            resizeMode: 'contain'
                        }} source={{
                            uri: kirim.foto_muatan
                        }} />
                    </View>
                </TouchableWithoutFeedback>
                <MyGap jarak={20} />
                {loading && <MyLoading />}
                {!loading &&
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                            <MyButton warna={colors.tertiary} colorText={colors.white} iconColor={colors.white} onPress={cekData} title="CEK" Icons="checkmark-circle-outline" />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                            <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="SAVE & SHARE" Icons="download-outline" />
                        </View>
                    </View>
                }
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})