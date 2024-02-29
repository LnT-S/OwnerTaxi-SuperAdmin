import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';
import { useRoute } from '@react-navigation/native';

const NotificationFullPage = (props) => {

    const route = useRoute()
    const { notificationType, content, time } = route.params.item

    return (
        <AuthenticatedLayout
            title={notificationType}
            showBackIcon={true}
            showMessageIcon={false}
            showNotification={false}
            showHMIcon={false}
            show3DotIcon={false}
            headerStyles={styles.customHeaderStyle}
            headerTextStyles={styles.customHeaderTextStyle}
            showFooter={false}
        >
            <View style={styles.notificationContainer}>
                <View style={styles.notificationContentContainer}>
                    <Text style={styles.ContentStyle}>{content}</Text>
                </View>
            </View>
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    customHeaderStyle: {
        backgroundColor: 'black',
        height: 70
    },
    customHeaderTextStyle: {
        color: 'white'
    },
    notificationContainer: {
        position: 'relative',
        flex: 1
    },
    notificationContentContainer: {
        display: 'flex',
        position: 'absolute',
        bottom: 5,
        left: 5,
        borderWidth: 2,
        maxWidth: '90%',
        backgroundColor: 'black',
        borderRadius:20,
        paddingLeft:10
        
    },
    ContentStyle: {
        textAlign: 'left',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 18,
        margin:10
    }
})

export default NotificationFullPage;
