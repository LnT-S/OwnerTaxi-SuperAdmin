import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';
import ThreeWayPushButton from '../../adOns/molecules/ThreeWayPushButton';

const VendorList = () => {
    const [selectedOption, setSelectedOption] = useState('')
    const vendorList = [
        {
            type: 'pending',
            phone: '0000110000'
        },
        {
            type: 'pending',
            phone: '1000000000'
        },
        {
            type: 'verified',
            phone: '0001000002'
        },
        {
            type: 'pending',
            phone: '1000999000'
        },
        {
            type: 'verified',
            phone: '1012300002'
        },
        {
            type: 'pending',
            phone: '1000600000'
        },
        {
            type: 'verified',
            phone: '0060000002'
        },
        {
            type: 'pending',
            phone: '0000110000'
        },
        {
            type: 'pending',
            phone: '1000000000'
        },
        {
            type: 'verified',
            phone: '0001000002'
        },
        {
            type: 'pending',
            phone: '1000999000'
        },
    ]
    return (
        <AuthenticatedLayout title={'Vendor List'}>
            <ThreeWayPushButton outerStyles={{ margin: 9, width: '96%', height: 55 }}
                option1={'All'} option2={'Requested'} option3={'Verified'} setter={setSelectedOption} />

            <FlatList
                style={{}}
                keyExtractor={(item, index) => (index)}
                data={vendorList}
                renderItem={({ item }) => {
                    return <View style={styles.itemContainer}>
                        <Text style={styles.text}>
                            {item.phone}
                        </Text>
                        <Text style={styles.text}>
                        </Text>
                    </View>
                }}

            />
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#E7EEF6',
        marginVertical: 4,
        marginHorizontal: 15,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        fontSize: 18
    }
})

export default VendorList;
