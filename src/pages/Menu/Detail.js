import { FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { Color, colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';
export default function Detail({ navigation, route }) {
    const item = route.params;

    const Mylist = ({ label, value, satuan = false, nilai = '' }) => {
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
                        }}> m

                        </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: 12,
                            lineHeight: 20
                        }}>{nilai}</Text>
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

                    <Mylist label="Plat Nomor Kendaraan" value={item.plat_nomor} />
                    <Mylist label="Nama Supplier" value={item.nama_supplier} />

                    <Mylist label="Jenis Kendaraan" value={item.jenis_kendaraan} />
                    <Mylist label="Jenis Muatan" value={item.jenis_muatan} />
                    <Mylist label="Panjang" satuan value={item.panjang} />
                    <Mylist label="Lebar" satuan value={item.lebar} />
                    <Mylist label="Tinggi" satuan value={item.tinggi} />
                    <Mylist label="Pa" value={item.pa} />
                    <Mylist label="Fl" value={item.fl} />
                    <Mylist label="Volume" satuan nilai='3' value={item.volume} />
                    <Mylist label="RIT Ke" value={item.rit} />



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


                    <TouchableOpacity onPress={() => Linking.openURL('')} style={{
                        flex: 1,
                        height: 50,
                        marginLeft: 10,
                        backgroundColor: colors.danger,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderRadius: 50
                    }}>
                        <Icon type='ionicon' name='share' color={colors.white} />
                        <Text style={{
                            ...fonts.headline4,
                            color: colors.white
                        }}>Share</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})