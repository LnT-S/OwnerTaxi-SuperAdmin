import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Text } from 'react-native-elements';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import { height } from '../../styles/responsive';
import { BgColor } from '../../styles/colors';


const Stack = createNativeStackNavigator()

const AuthenticatedLayout = (props) => {
    const {
        children,
        showHeader,
        showFooter,
        showBackIcon,
        showNotification,
        showHMIcon,
        showMessageIcon,
        show3DotIcon,
        threeDotOptionObject,
        leftCenterJsx,
        headerStyles,
        headerTextStyles
    } = props
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: BgColor }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <View style={{position : 'relative'}}>
                <View style={styles.layout}>
                    {/*NAVIGATION */}
                    {(showHeader === undefined || showHeader === true) ? <View style={styles.header}>
                        <Header
                            title={props.title}
                            showNotification={showNotification}
                            showHMIcon={showHMIcon}
                            showMessageIcon={showMessageIcon}
                            show3DotIcon={show3DotIcon}
                            showBackIcon={showBackIcon}
                            leftCenterJsx={leftCenterJsx}
                            headerStyles={headerStyles}
                            headerTextStyles={headerTextStyles}
                            threeDotOptionObject={threeDotOptionObject}
                        />
                    </View> : ''}
                    {/*BODY*/}
                    <View style={{ ...styles.body, marginBottom: showFooter === false ? 0 : 52 }}>
                        {children}
                    </View>
                    {/*FOOTER*/}
                    {(showFooter === undefined || showFooter === true) ? <View style={styles.footer}>
                        <Footer />
                    </View> : ''}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    layout: {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    header :{
        zIndex : 9999
    },
    body: {
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    }
})

export default AuthenticatedLayout