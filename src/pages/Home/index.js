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
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import MyCarouser from '../../components/MyCarouser';
import { Icon } from 'react-native-elements';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 4,
        height: windowWidth / 4,
      }}>
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: 12,
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 5, height: windowWidth / 5,
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  useEffect(() => {
    __getUser();
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.primary,
    }}>




      {/* HEADER */}
      <View style={{
        padding: 20, backgroundColor: colors.secondary, borderBottomLeftRadius: 50, borderBottomRightRadius: 50,
        flexDirection: "row",
        // alignItems: 'center',
        justifyContent: 'space-between', height: 250,
      }}>



        <Text style={{
          ...fonts.headline3,
          color: colors.white
        }}>
          Selamat datang,{'\n'}{user.nama_lengkap}
        </Text>

        <Image style={{
          width: 80,
          height: 80,
          resizeMode: 'contain'
        }} source={require('../../assets/logo.png')} />
      </View>


      <View style={{ alignItems: "center", marginTop: -140 }}>
        <MyCarouser />
      </View>

      <View style={{
        flex: 1,
        padding: 16
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Add', user)} style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/a1.png')} style={{
              width: windowWidth / 4,
              height: windowWidth / 4
            }} />
            <Text style={{
              ...fonts.headline3,
              color: colors.white
            }}>Input Laporan</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('List', user)} style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/a2.png')} style={{
              width: windowWidth / 4,
              height: windowWidth / 4
            }} />
            <Text style={{
              ...fonts.headline3,
              color: colors.white
            }}>Output Laporan</Text>
          </TouchableOpacity>
        </View>
      </View>



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})