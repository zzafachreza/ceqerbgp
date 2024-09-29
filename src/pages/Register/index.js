import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyInputLogin, MyPicker, MyRadio } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

export default function Register({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const img = new Animated.Value(0.8);
    const card = new Animated.Value(50);
    const toast = useToast();
    Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();
    Animated.timing(card, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();
    const [kirim, setKirim] = useState({
        api_token: api_token,
        nama_lengkap: '',
        username: '',
        password: '',
        repassword: '',

    });

    const simpan = () => {



        if (
            kirim.nama_lengkap.length === 0 &&
            kirim.username.length === 0 &&
            kirim.password.length === 0

        ) {
            toast.show('Formulir pendaftaran tidak boleh kosong', {
                type: 'warning'
            })
        } else if (kirim.nama_lengkap.length === 0) {
            toast.show('Silahkan ketikan nama lengkap', {
                type: 'warning'
            })
        }

        else if (kirim.username.length === 0) {
            showMessage({
                message: 'Masukan username',
            });
        }
        else if (kirim.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (kirim.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {

            console.log(kirim);

            setLoading(true);
            axios
                .post(apiURL + 'register', kirim)
                .then(res => {
                    console.log(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        toast.show(res.data.message, {
                            type: 'danger'
                        })

                    } else {
                        toast.show(res.data.message, {
                            type: 'success'
                        });

                        navigation.replace('Login');

                    }


                });
        }
    };




    useEffect(() => {


        axios.post(apiURL + 'company').then(res => {
            setComp(res.data.data);
        })
    }, []);
    const [sama, setSama] = useState(true)



    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: colors.white
        }}>
            {/* <MyHeader title="Daftar Akun" /> */}

            <ImageBackground source={require("../../assets/bglogin.png")} style={{
                flex: 1,
                width: "100%",
                height: '100%',

            }}>




                <ScrollView showsVerticalScrollIndicator={false}>



                    <View style={{
                        padding: 20,


                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '10%'
                        }}>
                            <Image source={require('../../assets/logo.png')} style={{
                                width: windowWidth / 2,
                                height: windowWidth / 2,

                            }} />
                        </View>
                        {/* Nama Orang Tua/Wali */}
                        <MyInput iconname='person' value={kirim.nama_lengkap} onChangeText={value => setKirim({ ...kirim, 'nama_lengkap': value })} label="Nama Lengkap" placeholder="Masukana nama lengkap" />
                        <MyGap jarak={20} />

                        {/* username*/}
                        <MyInput iconname='at' onChangeText={value => setKirim({ ...kirim, username: value })} value={kirim.username} label="Username" placeholder="Masukan username" />


                        <MyGap jarak={20} />
                        {/* Buat Password*/}
                        <MyInput iconname='lock-closed' onChangeText={value => setKirim({ ...kirim, 'password': value })} value={kirim.password} label="Buat Kata Sandi" placeholder="Masukan kata sandi" secureTextEntry='true' />

                        <MyGap jarak={20} />
                        {/* Konfimasi Password*/}
                        <MyInput iconname='lock-closed' onChangeText={value => setKirim({ ...kirim, 'repassword': value })} value={kirim.repassword} label="Konfirmasi Kata Sandi" placeholder="Masukan ulang kata sandi" secureTextEntry='true' />


                        {/* Button */}
                        <MyGap jarak={20} />
                        <MyButton title="Daftar" warna={colors.secondary} onPress={simpan} />

                        {/* Button Daftar */}
                        <MyGap jarak={10} />
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                            <View style={{ padding: 10 }}>
                                <Text style={{
                                    fontFamily: fonts.primary[500],
                                    textAlign: "center",
                                    color: colors.white,
                                    fontSize: 13

                                }}>Sudah punya akun? Silakan <Text style={{
                                    fontWeight: 'bold'
                                }}>masuk</Text></Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {loading && <MyLoading />}
                    </View>




                </ScrollView>
            </ImageBackground>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
