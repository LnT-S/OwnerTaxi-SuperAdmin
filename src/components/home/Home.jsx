import React, { useEffect, useState } from 'react'
import { BackHandler, FlatList, ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchBox from '../../adOns/atoms/Search'
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import { height } from '../../styles/responsive'
import YesNoModal from '../../adOns/molecules/YesNoModal'

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

    ]
    const [showModal, setShowModal] = useState(false)
    const handleYes = async () => {
        setShowModal(false);
        BackHandler.exitApp();
    };
    useEffect(() => {
        const backAction = () => {
            setShowModal(true)
            return true
            // navigation.goBack()
            // return true
        }
        console.log("BACKHANDLER SET IN HOME PAGE")
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            console.log('BACKHANDLER REMOVED FROM HOME PAGE')
            backHandler.remove()
        };
    }, []);

    return (
        <AuthenticatedLayout title={'Home'} showBackIcon={false}>
            <YesNoModal
                show={showModal}
                setShow={setShowModal}
                title={'EXIT ?'}
                message={'Are You Sure Want To Exit ?'}
                handleYes={handleYes}
                yesText={'Exit'}
                noText={'Cancel'} />
            <TouchableOpacity onPress={() => { navigation.navigate('DocVerification') }} style={styles.itemContainer}>
                <Text style={styles.text}>
                    Document Verification
                </Text>
                <Text style={[styles.text]}>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('DriverpayInfo') }} style={styles.itemContainer}>
                <Text style={styles.text}>
                    Driver Payment Info
                </Text>
                <Text style={[styles.text]}>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('VerifyDrivers') }} style={styles.itemContainer}>
                <Text style={styles.text}>
                    Verify Drivers
                </Text>
                <Text style={[styles.text]}>
                </Text>
            </TouchableOpacity>
            {/*<FlatList
                style={{}}
                keyExtractor={(item, index) => (index)}
                data={OptionList}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => { navigation.navigate(item.route) }} style={styles.itemContainer}>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                        <Text style={[styles.text]}>
                        </Text>
                    </TouchableOpacity>
                }}

            />*/}
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