import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgColor } from '../../styles/colors';
import global from '../../styles/global'
import { getResponsiveValue } from '../../styles/responsive';
import OTPInput from '../../adOns/molecules/OTPInput';
import { useNavigation } from '@react-navigation/native';
import PressButton from '../../adOns/atoms/PressButton';
import SmsListener from 'react-native-android-sms-listener'
// import SmsRetriever from 'react-native-sms-retriever';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useProfile } from '../../context/ContextProvider';
import { getOtp, verifyOtp } from '../../services/apiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = () => {

    const navigation = useNavigation()
    const { profileState, profileDispatch } = useProfile()
    const [otp, setOtp] = useState('      ');
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [timer , setTimer] = useState('')

    const handleVerificationOTP = async () => {
        await getOtp(profileState.phone)
    }

    const extractOTP = (messageBody) => {
        // Implement your OTP extraction logic here
        // Example: Extract 6 digit OTP using regex
        const otpRegex = /Your OTP is (\d{6})/;
        const match = messageBody.match(otpRegex);
        const otp = match ? match[1] : null;
        console.log('OTP', otp);
        return otp
    };
    useEffect(()=>{
        console.log("TIMER OUT")
        clearInterval(timer)
    },[otp])

    useEffect(() => {
        // Request SMS read permission
        if (Platform.OS === 'android') {
            request(PERMISSIONS.ANDROID.READ_SMS)
            .then((result) => {
                request(PERMISSIONS.ANDROID.RECEIVE_SMS)
                .then(async results => {
                    console.log("Results", result)
                    if (results === 'granted' && result === 'granted') {
                                console.log("ANDROID")
                                // Start listening for incoming SMS
                                let timers = setTimeout(() => {
                                    if ((otp === '      ' || otp === '' || otp === undefined) || error !== '') {
                                        setLoading(false)
                                        console.log('OTP NULL Back To Login')
                                        navigation.navigate('LoginScreen', { error: 'Unable to auto fetch OTP\nMake Sure Permission is granted\nThe sim should be in the same phone' })
                                    }
                                }, 0.2 * 1000 * 60)
                                setTimer(timers)
                                SmsListener.addListener(async message => {
                                    // Extract OTP from the message
                                    console.log('MESSAGE CAPTURED IS ', message)
                                    setLoading(true)
                                    setError('')
                                    const otp = extractOTP(message.body);
                                    console.log('OTP EXTRACTED ', otp,otp.length)
                                    // Fill OTP in the input field
                                    if (otp && otp.length === 6) {
                                        // Assume you have a state for OTP input
                                        setOtp(otp);
                                        let resObj = await verifyOtp(profileState.phone, otp)
                                        if (resObj.status === 200) {
                                            if (resObj.data.token !== null) {
                                                setError('')
                                                profileDispatch({
                                                    type: 'TOKEN',
                                                    payload: resObj.data.token
                                                })
                                                await AsyncStorage.setItem('token', resObj.data.token)
                                            }
                                            navigation.navigate('HomeScreen')
                                            setLoading(false)
                                        } else {
                                            setError(resObj.data.message)
                                            setLoading(false)
                                        }
                                    }
                                });
                            }
                        })
                        .catch((error) => {
                            console.log('PERMISSION ERROR', error);
                        });
                })
                .catch((error) => {
                    console.log('PERMISSION ERROR', error);
                });
        }
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: BgColor }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={global.backIcon} size={30} />
            </TouchableOpacity>


            <View style={[styles.signupcontainer, { flex: 1, backgroundColor: BgColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }]}>
                <View>
                    <Image
                        source={require('../../assets/imgaes/OTP.png')}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <Text style={styles.title}>Verification</Text>
                </View>

                <View style={styles.otpcontainer}>
                    <OTPInput length={6} OTP={otp} />
                    {error !== '' ? <View style={{ marginTop: 20, marginBottom: -25 }}><Text style={{ color: 'red', fontSize: 14 }}>{error}</Text></View> : ''}

                    <PressButton
                        style={{ marginTop: 60 }}
                        name='Resend OTP'
                        loading={loading}
                        disabled={loading}
                        onPress={handleVerificationOTP}
                    />
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
        justifyContent: `center`,
        alignItems: `center`
        
    },
    otpcontainer: {
        justifyContent: `center`,
        alignItems: `center`
    },
    resendtext: {
        marginTop: 20
    }
})
export default OtpScreen