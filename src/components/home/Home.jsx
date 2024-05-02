import React, { useEffect, useState } from 'react'
import { BackHandler, FlatList, ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchBox from '../../adOns/atoms/Search'
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import { height } from '../../styles/responsive'

const HomePage = () => {
    const navigation = useNavigation()

    const OptionList = [
        {
            name: 'Document Verification',
            route: 'DocVerification'
        },
        {
            name: 'Driver Payment Info',
            route: 'DriverpayInfo'
        },
        {
            name: 'Vendor List',
            route: 'vendorList'
        },
        {
            name: 'Option 4',
            route: 'Setting'
        },
        {
            name: 'Option 5',
            route: 'Setting'
        },
        {
            name: 'Option 6',
            route: 'Setting'
        },
        {
            name: 'Option 7',
            route: 'Setting'
        },
        {
            name: 'Option 8',
            route: 'Setting'
        },
        {
            name: 'Option 9',
            route: 'Setting'
        },
        {
            name: 'Option 10',
            route: 'Setting'
        },
        {
            name: 'Option 10',
            route: 'Setting'
        },   {
            name: 'Option 10',
            route: 'Setting'
        },   {
            name: 'Option 10',
            route: 'Setting'
        },
    ]
    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }
        console.log("BACKHANDLER SET IN HOME PAGE")
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            console.log('BACKHANDLER REMOVED FROM HOME PAGE')
            backHandler.remove()
        };
    }, []);

    return (
        <AuthenticatedLayout title={'Home'}>
            <FlatList
                style={{}}
                keyExtractor={(item, index) => (index)}
                data={OptionList}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => { navigation.navigate(item.route) }} style={styles.itemContainer}>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                        <Text style={[styles.text]}>
                        >
                        </Text>
                    </TouchableOpacity>
                }}

            />
        </AuthenticatedLayout>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'black',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white',
        fontSize: 18
    }
})
export default HomePage