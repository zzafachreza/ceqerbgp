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

export default function Edit({ navigation, route }) {
    const [kunci, setKunci] = useState(false);
    // console.log(route.params)

    const [comp, setComp] = useState({});
    const [dataPlat, setDataPlat] = useState([]);
    const [dataPlatTmp, setDataPlatTmp] = useState([]);
    const [dataSupplier, setDataSuppplier] = useState([]);


    const [kirim, setKirim] = useState({
        ...route.params,
        newfoto_kendaraan: null,
        newfoto_muatan: null,
    });

    const [verifikasi, setVerifikasi] = useState(false);

    const [cek, setCek] = useState({
        plat_nomor: 0,
        nama_supplier: 0,
        jenis_kendaraan: 0,
        jenis_muatan: 0,
        panjang: 0,
        lebar: 0,
        tinggi: 0,
        fl: 0,
        rit: 0,
        foto_kendaraan: 0,
        foto_muatan: 0

    })

    const cekData = () => {



        if (kirim.plat_nomor.length == 0) {
            setCek({ ...cek, plat_nomor: 1 });
            showMessage({
                message: 'Data plat nomor belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.plat_nomor > 0) {
            setCek({ ...cek, plat_nomor: 0 })

        } else if (kirim.nama_supplier.length == 0) {
            setCek({ ...cek, nama_supplier: 1 });
            showMessage({
                message: 'Input nama supplier belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.nama_supplier > 0) {
            setCek({ ...cek, nama_supplier: 0 })


        } else if (kirim.jenis_kendaraan.length == 0) {
            setCek({ ...cek, jenis_kendaraan: 1 })
            showMessage({
                message: 'Input jenis kendaraan belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.jenis_kendaraan > 0) {
            setCek({ ...cek, jenis_kendaraan: 0 })


        } else if (kirim.panjang.length == 0) {
            setCek({ ...cek, panjang: 1 })
            showMessage({
                message: 'Input panjang belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.panjang > 0) {
            setCek({ ...cek, panjang: 0 })


        } else if (kirim.lebar.length == 0) {
            setCek({ ...cek, lebar: 1 })
            showMessage({
                message: 'Input lebar belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.lebar > 0) {
            setCek({ ...cek, lebar: 0 })


        } else if (kirim.tinggi.length == 0) {
            setCek({ ...cek, tinggi: 1 })
            showMessage({
                message: 'Input tinggi belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.tinggi > 0) {
            setCek({ ...cek, tinggi: 0 })
        } else if (kirim.fl.length == 0) {
            setCek({ ...cek, fl: 1 })
            showMessage({
                message: 'Input fl belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.fl > 0) {
            setCek({ ...cek, fl: 0 })
        } else if (kirim.rit.length == 0) {
            setCek({ ...cek, rit: 1 })
            showMessage({
                message: 'Input rit ke belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.rit > 0) {
            setCek({ ...cek, rit: 0 })
        } else if (kirim.jenis_muatan.length == 0) {
            setCek({ ...cek, jenis_muatan: 1 })
            showMessage({
                message: 'Input jenis muatan belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.jenis_muatan > 0) {
            setCek({ ...cek, jenis_muatan: 0 })
        } else if (kirim.foto_kendaraan == 'https://zavalabs.com/nogambar.jpg') {
            setCek({ ...cek, foto_kendaraan: 1 })
            showMessage({
                message: 'Input foto kendaraan belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.foto_kendaraan > 0) {
            setCek({ ...cek, foto_kendaraan: 0 })
        } else if (kirim.foto_muatan == 'https://zavalabs.com/nogambar.jpg') {
            setCek({ ...cek, foto_muatan: 1 })
            showMessage({
                message: 'Input foto muatan belum sesuai',
                icon: 'danger',
                type: 'danger'
            })
        } else if (cek.foto_muatan > 0) {
            setCek({ ...cek, foto_muatan: 0 })
        } else {
            if (Object.values(cek).reduce((a, b) => a + b, 0) == 0) {
                setVerifikasi(true);
                console.log('volme', {
                    ...kirim,
                    volume: (parseFloat(kirim.panjang) * parseFloat(kirim.lebar) * parseFloat(kirim.tinggi) * parseFloat(kirim.fl)) + parseFloat(kirim.pa)
                })
                setKirim({
                    ...kirim,
                    volume: (parseFloat(kirim.panjang) * parseFloat(kirim.lebar) * parseFloat(kirim.tinggi) * parseFloat(kirim.fl)) + parseFloat(kirim.pa)
                })
                showMessage({
                    message: 'Data input sudah sesuai',
                    icon: 'success',
                    type: 'success'
                })
            } else {
                showMessage({
                    message: 'Data input belum sesuai',
                    icon: 'danger',
                    type: 'danger'
                })
            }
        }






    }
    const [loading, setLoading] = useState(false);
    const sendServer = () => {

        console.log(kirim)
        if (!verifikasi) {
            showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Klik cek dan pastikan semua datanya sudah terinput dengan benar !'
            })
        } else if (Object.values(cek).reduce((a, b) => a + b, 0) == 0) {
            // setLoading(true);

            axios.post(apiURL + 'update_laporan', {
                ...kirim,
                volume: (parseFloat(kirim.panjang) * parseFloat(kirim.lebar) * parseFloat(kirim.tinggi) * parseFloat(kirim.fl)) + parseFloat(kirim.pa)
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
                            navigation.replace('MainApp');
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
            setDataPlat(res.data);
            setDataPlatTmp(res.data);

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
            <MyHeader title="Edit Laporan" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>



                <View>
                    <MyInput colorIcon={parseFloat(cek.plat_nomor) > 0 ? colors.danger : Color.blueGray[300]} label="Plat Nomor Kendaraan" placeholder="Masukan Plat Nomor Kendaraan" value={kirim.plat_nomor} onChangeText={x => {
                        setKirim({ ...kirim, plat_nomor: x });

                        if (x.length > 0) {
                            let TMPSrc = dataPlat.filter(i => i.plat_nomor.toLowerCase().indexOf(x.toLowerCase()) > -1);
                            if (TMPSrc.length > 0) {
                                setDataPlat(TMPSrc);
                                setBuka({
                                    ...buka,
                                    plat: true
                                })
                            }
                        } else {
                            setDataPlat(dataPlatTmp);
                            setBuka({
                                ...buka,
                                plat: true
                            })
                        }


                    }

                    } iconname="card" />
                    {/* <CariData tipe='Plat' /> */}



                    {kirim.plat_nomor.length > 0 && buka.plat &&
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
                                    <TouchableOpacity onPress={() => {

                                        setBuka({
                                            ...buka,
                                            plat: false
                                        })
                                        setKirim({
                                            ...kirim,
                                            plat_nomor: item.plat_nomor,
                                            nama_supplier: item.nama_supplier,
                                            jenis_kendaraan: item.jenis_kendaraan,
                                            jenis_muatan: item.jenis_muatan,
                                            panjang: item.panjang,
                                            lebar: item.lebar,
                                            tinggi: item.tinggi,
                                            rit: item.rit,
                                        })
                                    }} style={{
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


                <MyInput colorIcon={cek.nama_supplier > 0 ? colors.danger : Color.blueGray[300]} label="Nama Supplier" placeholder="Masukan Nama Supplier" value={kirim.nama_supplier} onChangeText={x => setKirim({ ...kirim, nama_supplier: x })} iconname="person" />


                <MyGap jarak={20} />
                <View style={{
                    marginBottom: 0,
                }}>
                    <Text style={{
                        ...fonts.body3,
                        color: colors.white,
                        marginBottom: 5,
                    }}>Jenis Kendaraan</Text>
                    <View>
                        <Text style={{
                            ...fonts.headline3,
                            color: colors.white
                        }}>{kirim.jenis_kendaraan}</Text>
                    </View>
                </View>
                <MyGap jarak={20} />
                <MyInput colorIcon={parseFloat(cek.jenis_muatan) > 0 ? colors.danger : Color.blueGray[300]} label="Jenis Muatan" placeholder="Masukan Jenis Muatan" value={kirim.jenis_muatan} onChangeText={x => setKirim({ ...kirim, jenis_muatan: x })} iconname="server" />
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



                <MyInput colorIcon={parseFloat(cek.rit) > 0 ? colors.danger : Color.blueGray[300]} label="RIT Ke" keyboardType='number-pad' placeholder="Masukan Rit Ke" value={kirim.rit} onChangeText={x => setKirim({ ...kirim, rit: x })} iconname="create" />
                <MyGap jarak={20} />


                <Text style={{
                    ...fonts.body3,
                    color: parseFloat(cek.foto_kendaraan) > 0 ? colors.danger : colors.white,
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

                                    if (!response.didCancel) {
                                        setKirim({
                                            ...kirim,
                                            newfoto_kendaraan: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                                        });
                                    }
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
                                    if (!response.didCancel) {
                                        setKirim({
                                            ...kirim,
                                            newfoto_kendaraan: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                                        });
                                    }

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
                            uri: kirim.newfoto_kendaraan !== null ? kirim.newfoto_kendaraan : kirim.foto_kendaraan,
                        }} />
                    </View>
                </TouchableWithoutFeedback>

                <MyGap jarak={20} />

                <Text style={{
                    ...fonts.body3,
                    color: parseFloat(cek.foto_muatan) > 0 ? colors.danger : colors.white,
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
                                    if (!response.didCancel) {
                                        setKirim({
                                            ...kirim,
                                            newfoto_muatan: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                                        });
                                    }

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
                                    if (!response.didCancel) {
                                        setKirim({
                                            ...kirim,
                                            newfoto_muatan: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                                        });
                                    }

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
                            uri: kirim.newfoto_muatan !== null ? kirim.newfoto_muatan : kirim.foto_muatan,
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