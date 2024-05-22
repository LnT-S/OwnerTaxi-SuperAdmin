import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, RefreshControl, Image, FlatList, Alert } from 'react-native';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';

import ThreeWayPushButton from '../../adOns/molecules/ThreeWayPushButton';
import AddDocumentModal from '../../adOns/molecules/AddDocumentModal';
import { getAllUserDocInfo, verifyDrivers } from '../../services/apiCall';
import { showNoty } from '../../common/flash/flashNotification';
import FlashMessage from 'react-native-flash-message';
import server from '../../services/server.tsx'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import YesNoModal from '../../adOns/molecules/YesNoModal.jsx';
import { BgColor } from '../../styles/colors.jsx';
import SearchBox from '../../adOns/atoms/Search.js';

const VerifyDrivers = () => {
    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [docList, setDocList] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const ref = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [phoneNo, setPhoneNo] = useState(0)
    const [searchedTerm, setSearchedTerm] = useState('')
    const [searchedData, setSearchedData] = useState([])
    const handleYes = (verify) => {
        setIsRefreshing(true)
        if (phoneNo === 0) {
            Alert.alert("Error", "Try Loggin Again")
            return
        }
        verifyDrivers({ phoneNo, verify: verify })
            .then(data => {
                if (data.status === 200) {
                    Alert.alert("Verification Status : 200", data.data.message)
                } else {
                    showNoty(data.data.message, "danger")
                }
            })
            .catch(err => {
                console.log("ERROR IN GET ALL USER DOC INFO", err);
                showNoty("ERROR IN FETCHING USER DOC INFO", "danger")
            })
        setIsRefreshing(false)
        setShowModal(false);
    };
    useEffect(() => {
        // Filter data whenever the search query changes
        if (searchedTerm === '') {
            return setSearchedData(docList)
        }
        // console.log('Serched term', searchedTerm)
        const filtered = docList.filter(item =>
            (item.name && item.name.includes(searchedTerm || '')) ||
            (item.phoneNo && item.phoneNo.toString().includes(searchedTerm || ''))
        );
        setSearchedData(filtered);
    }, [searchedTerm]);

    const fetchData = () => {
        setIsRefreshing(true)
        setDocList([])
        getAllUserDocInfo()
            .then(data => {
                if (data.status === 200) {
                    setDocList(prev => { return [...data.data.data] });
                    setSearchedData(prev => { return [...data.data.data] });
                } else {
                    showNoty(data.data.message, "danger")
                }
            })
            .catch(err => {
                console.log("ERROR IN GET ALL USER DOC INFO", err);
                showNoty("ERROR IN FETCHING USER DOC INFO", "danger")
            })
        setIsRefreshing(false)
    }
    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )
    useEffect(() => {
        setIsRefreshing(true)
        fetchData()
        setIsRefreshing(false)
    }, [])
    useEffect(() => {
        console.log("CHANGED");
    }, [docList])

    return (
        <AuthenticatedLayout
            title={'Verify Drivers'}
            showAddIcon={true}
            addButtonAction={() => { setShowAddModal(true) }}
        >
            <YesNoModal
                show={showModal}
                setShow={setShowModal}
                title={'Verify Driver?'}
                message={'Are You Sure Want To Verify this driver as Owner Taxi ?'}
                handleYes={() => handleYes("Owner Taxi")}
                handleNo={() => handleYes("")}
                yesText={'Verify'}
                noText={'Unverify'} />
            <FlashMessage ref={ref} />
            <AddDocumentModal
                show={showAddModal}
                setShow={setShowAddModal}
            />
            <SearchBox placeholder={'Search by Name or Phone Number'}
                setSearchedTerm={setSearchedTerm}
                searchedTerm={searchedTerm} />
            {/*<ThreeWayPushButton outerStyles={{ margin: 9, width: '96%', height: 55 }}
    option1={'All'} option2={'Pending'} option3={'Verified'} setter={setSelectedOption} />*/}

            <FlatList
                style={{}}
                keyExtractor={(item, index) => (index)}
                data={searchedData}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                }
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { setPhoneNo(item.phoneNo); setShowModal(true) }}
                            style={{ ...styles.itemContainer, backgroundColor: item.verifiedBy === "Owner Taxi" ? BgColor : '#E7EEF6' }} key={index}>
                            <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 15 }}>
                                {item.avatar && <Image source={{ uri: `${server.server}${item.avatar}` }} style={{ height: 50, width: 50, borderRadius: 10 }} />}
                                <Text style={styles.text}>
                                    {item.name}
                                </Text>
                            </View>
                            <Text style={styles.text}>
                                {item.phoneNo}
                            </Text>
                        </TouchableOpacity>)
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 18
    }
})

export default VerifyDrivers;
