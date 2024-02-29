import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import NotificationBox from './NotificationBox';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {

    const navigation = useNavigation()

    const NotificationList = [
        {
            notificationType: 'Vendor Notification',
            content: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor This is just a example of Vendor Notification Click here to see more Notification related to vendor',
            time: '10:00 PM'
        },
        {
            notificationType: 'Driver Notification',
            content: 'This is just a example of Driver Notification Click here to see more Notification related to Driver',
            time: '10:00 PM'
        },
        {
            notificationType: 'Customer Notification',
            content: 'This is just a example of Customer Notification Click here to see more Notification related to Customer',
            time: '10:00 PM'
        },
        {
            notificationType: 'SuperAdmin Notification',
            content: 'This is just a example of Super Admin Notification Click here to see more Notification related to Super Admin',
            time: '10:00 PM'
        },
        {
            notificationType: 'Vendor Notification',
            content: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
            time: '10:00 PM'
        },
        {
            notificationType: 'Driver Notification',
            content: 'This is just a example of Driver Notification Click here to see more Notification related to Driver',
            time: '10:00 PM'
        },
        {
            notificationType: 'Customer Notification',
            content: 'This is just a example of Customer Notification Click here to see more Notification related to Customer',
            time: '10:00 PM'
        },
        {
            notificationType: 'SuperAdmin Notification',
            content: 'This is just a example of Super Admin Notification Click here to see more Notification related to Super Admin',
            time: '10:00 PM'
        },
        {
            notificationType: 'Vendor Notification',
            content: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
            time: '10:00 PM'
        },
        {
            notificationType: 'Driver Notification',
            content: 'This is just a example of Driver Notification Click here to see more Notification related to Driver',
            time: '10:00 PM'
        },
        {
            notificationType: 'Customer Notification',
            content: 'This is just a example of Customer Notification Click here to see more Notification related to Customer',
            time: '10:00 PM'
        },
        {
            notificationType: 'SuperAdmin Notification',
            content: 'This is just a example of Super Admin Notification Click here to see more Notification related to Super Admin',
            time: '10:00 PM'
        },
    ];

    const [isRefreshing, setIsRefreshing] = useState(false)

    const refreshing = async ()=>{
    }
    const fetchData = async ()=>{
        setIsRefreshing(true)
        setInterval(()=>{
            setIsRefreshing(false)
        },200)

    }

    const handleNotificationPage = (item) => {
        navigation.navigate('notificationScreen',{item})
    }
    return (
        <AuthenticatedLayout title={'Notification'} showNotification={false}>
            <View style={{ marginTop: 10 }}>
            {isRefreshing && <ActivityIndicator  size={'large'} color={'black'}/>}
                <FlatList
                    style={{}}
                    keyExtractor={(item, index) => (index)}
                    data={NotificationList}
                    renderItem={({ item }) => {
                        return <TouchableOpacity onPress={()=>handleNotificationPage(item)}>
                            <View style={styles.FlatListviewStyle}>
                                <NotificationBox item={item} />
                            </View>
                        </TouchableOpacity>
                    }}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                    }
                />
            </View>
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    FlatListviewStyle: {
        marginVertical: 2
    }
})

export default Notification;
