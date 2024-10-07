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

export default function Add({ navigation, route }) {


    const [kirim, setKirim] = useState({
        fid_user: route.params.id,
        nama_supplier: '',
        plat_nomor: '',
        volume_normal: '',
        volume_tambahan: '',
        jenis_material: '',
        foto_kendaraan: 'https://zavalabs.com/nogambar.jpg',
        foto_muatan: 'https://zavalabs.com/nogambar.jpg',
        latitude: '',
        longitude: '',
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        console.log(kirim);
        setLoading(true);

        axios.post(apiURL + 'insert_laporan', kirim).then(res => {
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
                        // navigation.replace('MainApp');
                        navigation.goBack();
                    });


            }
        })
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



    useEffect(() => {
        requestCameraPermission();
        requestLocationPermission();
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





                <MyInput label="Nama Supplier" placeholder="Masukan Nama Supplier" value={kirim.nama_supplier} onChangeText={x => setKirim({ ...kirim, nama_supplier: x })} iconname="person" />
                <MyGap jarak={20} />

                <MyInput label="Plat Nomor Kendaraan" placeholder="Masukan Plat Nomor Kendaraan" value={kirim.plat_nomor} onChangeText={x => setKirim({ ...kirim, plat_nomor: x })} iconname="card" />

                <MyGap jarak={20} />

                <View>
                    <MyInput keyboardType='number-pad' label="Volume Bak Truk Normal" placeholder="Isi Volume Normal" value={kirim.volume_normal} onChangeText={x => setKirim({ ...kirim, volume_normal: x })} iconname="file-tray" />
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
                        }}> cm

                        </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            lineHeight: 20,
                            color: colors.primary
                        }}>3</Text>
                    </View>

                </View>

                <MyGap jarak={20} />


                <View>
                    <MyInput keyboardType='number-pad' label="Volume Bak Truk Tambahan" placeholder="Isi Volume Tambahan" value={kirim.volume_tambahan} onChangeText={x => setKirim({ ...kirim, volume_tambahan: x })} iconname="file-tray-stacked" />
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
                        }}> cm

                        </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                            lineHeight: 20,
                            color: colors.primary
                        }}>3</Text>
                    </View>
                </View>
                <MyGap jarak={20} />

                <MyInput label="Jenis Material" placeholder="Masukan Jenis Material" value={kirim.jenis_material} onChangeText={x => setKirim({ ...kirim, jenis_material: x })} iconname="options" />
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
                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})