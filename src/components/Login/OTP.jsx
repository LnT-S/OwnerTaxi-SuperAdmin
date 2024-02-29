import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgColor } from '../../styles/colors';
import global from '../../styles/global'
import { getResponsiveValue } from '../../styles/responsive';
import OTPInput from '../../adOns/molecules/OTPInput';
import { useNavigation } from '@react-navigation/native';
import PressButton from '../../adOns/atoms/PressButton';

const OtpScreen = () => {

    const navigation = useNavigation()
    const [otp, setOtp] = useState('');

    const handleOTPChange = (otp) => {
        setOtp(otp);
    };
    const handleVerificationOTP = () => {
        navigation.navigate('HomeSceen')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: BgColor }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={global.backIcon} size={30} />
            </TouchableOpacity>


            <View style={styles.signupcontainer}>
                <Image
                    source={require('../../assets/imgaes/OTP.png')}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.title}>Verification</Text>
            </View>

            <View style={styles.otpcontainer}>
                <OTPInput length={6} onOTPChange={handleOTPChange} />

                <PressButton
                    style={{ marginTop: 60 }}
                    name='Verify OTP'
                    onPress = {handleVerificationOTP}
                />

                <View style = {styles.resendtext}>
                    <Text style= {{fontSize:15, color: 'black'}}>
                    Resend OTP in 00:00 seconds
                    </Text>
                </View>
            </View>

        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    image: {
        width: getResponsiveValue(200, 100),
        height: getResponsiveValue(200, 100),
        left: getResponsiveValue("4%", "4%"),
    },
    title: {
        color: `black`,
        fontSize: 35,
        fontWeight: `500`,
    },
    signupcontainer: {
        marginTop: 40,
        justifyContent: `center`,
        alignItems: `center`
        
    },
    otpcontainer: {
        marginTop: 40,
        justifyContent: `center`,
        alignItems: `center`
    },
    resendtext: {
        marginTop: 20
    }
})
export default OtpScreen