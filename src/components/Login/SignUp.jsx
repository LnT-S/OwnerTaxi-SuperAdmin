import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    Image, 
    ScrollView, 
    BackHandler} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import PressButton from '../../adOns/atoms/PressButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgColor } from '../../styles/colors';
import TwoWayPushButton from '../../adOns/molecules/TwoWayPushButton';
import UserInput from '../../adOns/atoms/UserInput';
import PassInput from '../../adOns/atoms/PassInput';
import CheckbocTC from '../../adOns/atoms/CheckbocT&C';
import global from '../../styles/global'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
const SignupScreen = () => {

    const navigation = useNavigation()
    const [isChecked, setIsChecked] = useState(false);

    

    useEffect(() => {
        const backAction = ()=>{
            navigation.goBack()
            return true
        }
        console.log("BACKHANDLER SET IN SIGNUPPAGE")
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            console.log('BACKHANDLER REMOVED FROM SIGNUP')
            backHandler.remove()
        };
      }, []);

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: BgColor }}>
            <ScrollView>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon name="arrow-back" style={global.backIcon} size={30} />
                </TouchableOpacity>

                <View style={styles.signupcontainer}>
                    <View style={styles.logoPart}>
                        <Image
                            source={require('../../assets/imgaes/DriverAppLogo.png')}
                            style={{ width: 300, height: 100 }}
                        />
                        <Text style={styles.title}>Sign Up</Text>
                    </View>

                    

                    <View style={styles.logoPart}>
                        <UserInput
                            placeholder='UserName or Phone No.'
                            icon={'person'}
                        />
                        <UserInput
                            placeholder='Email'
                            icon={'email'}
                        />
                        <PassInput
                            placeholder='Password'
                        />
                        <PassInput
                            placeholder='Re-enter Password'
                        />
                        <CheckbocTC
                            placeholder="I accept all Terms & Conditions"
                            setIsChecked = {setIsChecked}
                            isChecked = {isChecked}
                        />
                        <PressButton
                            name="Continue"
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
   
    signupcontainer: {
        justifyContent: `center`,
        alignItems: `center`
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
        marginBottom:20
    }
})
export default SignupScreen