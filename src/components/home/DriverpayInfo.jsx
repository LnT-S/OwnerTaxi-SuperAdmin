import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, BackHandler, TouchableOpacity } from 'react-native';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';
import ThreeWayPushButton from '../../adOns/molecules/ThreeWayPushButton';
import { FlatList } from 'react-native-gesture-handler';
import { getPaymentsInfo } from '../../services/apiCall';
import YesNoModal from '../../adOns/molecules/YesNoModal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import SearchBox from '../../adOns/atoms/Search';

const DriverpayInfo = () => {
    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState('')
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [docList, setDocList] = useState([])
    const [searchedTerm, setSearchedTerm] = useState('')
    const [searchedData, setSearchedData] = useState([])
    useEffect(() => {
        // Filter data whenever the search query changes
        if (searchedTerm === '') {
            return setSearchedData(docList)
        }
        // console.log('Serched term', searchedTerm)
        const filtered = docList.filter(item =>
            (item?.id?.name && item?.id?.name.includes(searchedTerm || '')) ||
            (item?.id?.phoneNo && item?.id?.phoneNo.toString().includes(searchedTerm || ''))
        );
        setSearchedData(filtered);
    }, [searchedTerm]);
    const fetchData = () => {
        getPaymentsInfo()
            .then(data => {
                if (data.status === 200) {
                    setDocList([...data.data.data])
                    setSearchedData([...data.data.data])
                } else {
                    Alert.alert("Error", "Try Logging Again")
                }
            })
            .catch(err => {
                console.log("ERROR IN FETCHING DATA", err);
            })
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )
    const [showModal, setShowModal] = useState(false)
    const handleYes = async () => {
        setShowModal(false);
        BackHandler.exitApp();
    };
    useEffect(() => {
        console.log("CHANGING");
    }, [docList])
    useEffect(() => {
        fetchData()
        const backAction = () => {
            // setShowModal(true)
            // return true
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
    // const docList = [
    //     {
    //         paymentpending: true,
    //         phone: '0000110000'
    //     },
    //     {
    //         paymentpending: false,
    //         phone: '1000000000'
    //     },
    //     {
    //         paymentpending: true,
    //         phone: '0001000002'
    //     },
    //     {
    //         paymentpending: false,
    //         phone: '1000999000'
    //     },
    //     {
    //         paymentpending: true,
    //         phone: '1012300002'
    //     },
    //     {
    //         paymentpending: true,
    //         phone: '1000600000'
    //     },
    //     {
    //         paymentpending: true,
    //         phone: '0060000002'
    //     },
    //     {
    //         paymentpending: false,
    //         phone: '0000110000'
    //     },
    //     {
    //         paymentpending: false,
    //         phone: '1000000000'
    //     },
    //     {
    //         paymentpending: false,
    //         phone: '0001000002'
    //     },
    //     {
    //         paymentpending: false,
    //         phone: '1000999000'
    //     },
    // ]

    return (
        <AuthenticatedLayout title={'Driver Payment Info'}>
            <YesNoModal
                show={showModal}
                setShow={setShowModal}
                title={'EXIT ?'}
                message={'Are You Sure Want To Exit ?'}
                handleYes={handleYes}
                yesText={'Exit'}
                noText={'Cancel'} />
            <SearchBox placeholder={'Search by Name or Phone Number'}
                setSearchedTerm={setSearchedTerm}
                searchedTerm={searchedTerm} />
            <FlatList
                style={{}}
                keyExtractor={(item, index) => (index)}
                data={searchedData}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                }
                renderItem={({ item, i }) => {
                    return <TouchableOpacity onPress={() => navigation.navigate("userPay", { item: item })} style={{ ...styles.itemContainer, backgroundColor: (item.paymentpending ? 'red' : 'green') }}>
                        <Text style={styles.text}>
                            {item.id?.name}
                        </Text>
                        <Text style={styles.text}>
                            {item.id?.phoneNo}
                        </Text>
                        <Text style={styles.text}>
                            {'\>'}
                        </Text>
                    </TouchableOpacity>
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
