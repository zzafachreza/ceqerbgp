import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { Color, colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';
export default function Detail({ navigation, route }) {
    const item = route.params;

    const Mylist = ({ label, value, satuan = false }) => {
        return (

            <View style={{
                padding: 10,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: Color.blueGray[100]
            }}>
                <Text style={{
                    flex: 1,
                    ...fonts.subheadline3,
                    color: colors.tertiary,
                }}>{label}</Text>

                <Text style={{
                    ...fonts.headline5,
                    color: colors.tertiary,
                }}>{value}</Text>
                {satuan &&

                    <>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: 14,
                            lineHeight: 26
                        }}> cm

                        </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: 12,
                            lineHeight: 20
                        }}>3</Text>
                    </>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
        }}>
            <MyHeader title="Output Laporan" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    margin: 12,
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 12,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: colors.tertiary,
                        textAlign: 'center'
                    }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>

                    <Mylist label="Nama Supplier" value={item.nama_supplier} />
                    <Mylist label="Plat Nomor Kendaraan" value={item.nama_supplier} />
                    <Mylist label="Volume Bak Truk Normal" satuan value={item.volume_normal} />
                    <Mylist label="Volume Bak Truk Tambahan" satuan value={item.volume_tambahan} />
                    <Mylist label="Jenis Material" value={item.jenis_material} />

                </View>

                <View style={{
                    margin: 12,
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 12,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: colors.tertiary,
                        textAlign: 'center'
                    }}>Foto Kendaraan</Text>

                    <Image source={{
                        uri: item.foto_kendaraan,
                    }} style={{
                        width: '100%',
                        height: 250,
                        resizeMode: 'contain'
                    }} />
                    <Mylist label="Waktu" value={moment(item.tanggal).format('DD MMMM YYYY') + ' | ' + item.jam} />
                    <Mylist label="Titik Koordinat" value={item.latitude + ', ' + item.longitude} />

                </View>

                <View style={{
                    margin: 12,
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 12,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        color: colors.tertiary,
                        textAlign: 'center'
                    }}>Foto Pengukuran/Muatan</Text>

                    <Image source={{
                        uri: item.foto_muatan,
                    }} style={{
                        width: '100%',
                        height: 250,
                        resizeMode: 'contain'
                    }} />
                    <Mylist label="Waktu" value={moment(item.tanggal).format('DD MMMM YYYY') + ' | ' + item.jam} />
                    <Mylist label="Titik Koordinat" value={item.latitude + ', ' + item.longitude} />

                </View>

                {/* <View style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    paddingBottom: 10,

                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Edit', item)} style={{
                        flex: 1,
                        height: 50,
                        marginLeft: 10,
                        backgroundColor: colors.secondary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderRadius: 50
                    }}>
                        <Icon type='ionicon' name='create' color={colors.white} />
                        <Text style={{
                            ...fonts.headline4,
                            color: colors.white
                        }}>Edit</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                        { text: 'Tidak' },
                        {
                            text: 'Ya, Hapus',
                            onPress: () => {

                                axios.post(apiURL + 'delete_laporan', item).then(res => {
                                    if (res.data.status == 200) {
                                        showMessage({
                                            type: 'success',
                                            icon: 'success',
                                            message: res.data.message
                                        });
                                        __getTransaction();
                                    }
                                })
                            }
                        }
                    ])} style={{
                        flex: 1,
                        height: 50,
                        marginLeft: 10,
                        backgroundColor: colors.danger,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderRadius: 50
                    }}>
                        <Icon type='ionicon' name='trash' color={colors.white} />
                        <Text style={{
                            ...fonts.headline4,
                            color: colors.white
                        }}>Hapus</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})