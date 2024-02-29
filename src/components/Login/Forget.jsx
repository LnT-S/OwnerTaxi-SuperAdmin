import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { BgColor } from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native-elements';
import UserInput from '../../adOns/atoms/UserInput';
import PressButton from '../../adOns/atoms/PressButton';
import global from '../../styles/global'
import { height } from '../../styles/responsive';
import { useNavigation } from '@react-navigation/native';
const Forget = () => {

  const navigation = useNavigation()
  const [isEmail, setIsEmail] = useState(true)

  const handleInput = () => {
    setIsEmail(!isEmail)
  }
  const handleSendOTP = () => {
    navigation.navigate('OTPScreen')
  }

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: BgColor }}>
      <ScrollView >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" style={styles.icon} size={30} />
        </TouchableOpacity>

        <View style={styles.forgetcontainer}>

          <View style={styles.logoPart}>
            <Image
              source={require('../../assets/imgaes/DriverAppLogo.png')}
              style={{ width: 400, height: 150 }}
            />
            <Text style={styles.title}>Forget Password</Text>
          </View>

          <View style={styles.forgetpart}>
            <UserInput
              placeholder={isEmail ? 'Enter Email' : 'Enter Phone no.'}
              icon={isEmail ? 'email' : 'phone'}
            />

            <PressButton
              name='Send OTP'
              onPress = {handleSendOTP}
            />
            <TouchableOpacity onPress={handleInput} style>
              <Text style={global.textWithUnderline}>{isEmail ? 'Use Phone' : 'Use Email'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  icon: {
    color: `black`,
    marginLeft: 10,
  },
  forgetcontainer: {
    display: 'flex',
    justifyContent: `center`,
    alignItems: 'center',
    gap: 60,
    height: height - 100,
    maxHeight: height
  },
  logoPart: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    width: '100%',
  },
  title: {
    color: `black`,
    fontSize: 35,
    fontWeight: `500`,
  },
  forgetpart: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    width: '100%',
  }
})
export default Forget