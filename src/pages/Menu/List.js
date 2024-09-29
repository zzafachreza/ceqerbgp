import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import { Color, colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

export default function List({ navigation, route }) {

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    const isFocused = useIsFocused();

    const __getTransaction = () => {

        getData('user').then(u => {
            setUser(u);
            axios.post(apiURL + 'laporan', {
                fid_user: u.id,
            }).then(res => {
                console.log(res.data);
                setData(res.data)
            })

        })
    }

    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }
    }, [isFocused])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Output Laporan" />
            <View style={{
                flex: 1,
                padding: 12
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            marginBottom: 10,
                            padding: 10,
                            backgroundColor: colors.white,
                            borderWidth: 1,
                            borderColor: Color.blueGray[300],
                            borderRadius: 12,
                        }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>Tanggal</Text>
                                <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                <Text style={{ ...fonts.headline5, color: colors.primary, flex: 1, }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>Nama Supplier</Text>
                                <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                <Text style={{ ...fonts.headline5, color: colors.primary, flex: 1, }}>{item.nama_supplier}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 1, }}>Plat Nomor Kendaraan</Text>
                                <Text style={{ ...fonts.subheadline3, color: colors.primary, flex: 0.1, }}>:</Text>
                                <Text style={{ ...fonts.headline5, color: colors.primary, flex: 1, }}>{item.plat_nomor}</Text>
                            </View>






                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Detail', item)} style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: colors.tertiary,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50,

                                }}>
                                    <Icon type='ionicon' name='search' color={colors.white} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('Edit', item)} style={{
                                    marginLeft: 10,
                                    width: 50,
                                    height: 50,
                                    backgroundColor: colors.secondary,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}>
                                    <Icon type='ionicon' name='create' color={colors.white} />
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
                                    marginLeft: 10,
                                    width: 50,
                                    height: 50,
                                    backgroundColor: colors.danger,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}>
                                    <Icon type='ionicon' name='trash' color={colors.white} />
                                </TouchableOpacity>

                            </View>

                        </View>
                    )
                }} />
            </View>
            {
                user.level == 'Petugas' && <TouchableOpacity onPress={() => navigation.navigate('InformasiAdd')} style={{
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50
                }}>
                    <Icon type='ionicon' name='add' color={colors.white} />
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})