import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';
import ThreeWayPushButton from '../../adOns/molecules/ThreeWayPushButton';
import { FlatList } from 'react-native-gesture-handler';

const DriverpayInfo = () => {
    const [selectedOption, setSelectedOption] = useState('')
    const docList = [
        {
            paymentpending: true,
            phone: '0000110000'
        },
        {
            paymentpending: false,
            phone: '1000000000'
        },
        {
            paymentpending: true,
            phone: '0001000002'
        },
        {
            paymentpending: false,
            phone: '1000999000'
        },
        {
            paymentpending: true,
            phone: '1012300002'
        },
        {
            paymentpending: true,
            phone: '1000600000'
        },
        {
            paymentpending: true,
            phone: '0060000002'
        },
        {
            paymentpending: false,
            phone: '0000110000'
        },
        {
            paymentpending: false,
            phone: '1000000000'
        },
        {
            paymentpending: false,
            phone: '0001000002'
        },
        {
            paymentpending: false,
            phone: '1000999000'
        },
    ]

    return (
        <AuthenticatedLayout title={'Driver Payment Info'}>
         
            <FlatList
                style={{}}
                keyExtractor={(item, index) => (index)}
                data={docList}
                renderItem={({ item }) => {
                    return <View style={{...styles.itemContainer, backgroundColor: (item.paymentpending? 'red' : 'green')}}>
                        <Text style={styles.text}>
                            {item.phone}
                        </Text>
                        <Text style={styles.text}>
                        >
                        </Text>
                    </View>
                }}

            />
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 4,
        marginHorizontal: 15,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: '800'
    }
})

export default DriverpayInfo;
