import { useNavigation } from '@react-navigation/native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import global from '../../styles/global'
import { Image } from 'react-native-elements'
import { BgColor } from '../../styles/colors'
import PassInput from '../../adOns/atoms/PassInput';
import PressButton from '../../adOns/atoms/PressButton';

const NewPassword = () => {
    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: BgColor }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={global.backIcon} size={30} />
            </TouchableOpacity>

            <View style={styles.newPasscontainer}>
                <View style={styles.logoPart}>
                    <Image
                        source={require('../../assets/imgaes/DriverAppLogo.png')}
                        style={{ width: 300, height: 100 }}
                    />
                    <Text style={styles.title}>Enter New Password</Text>
                </View>

                <View style={styles.newpassinput}>
                    <PassInput
                        placeholder='Enter New Password'
                    />
                    <PassInput
                        placeholder='Confirm Password'
                    />
                    <PressButton
                    style = {{marginTop:30}}
                        name='Reset Password'
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    newPasscontainer: {
        marginTop: 50
    },
    logoPart: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    title: {
        color: `black`,
        fontSize: 35,
        fontWeight: `500`,
    },
    newpassinput: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default NewPassword