import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, RefreshControl, Image, FlatList } from 'react-native';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';

import ThreeWayPushButton from '../../adOns/molecules/ThreeWayPushButton';
import AddDocumentModal from '../../adOns/molecules/AddDocumentModal';
import { getAllUserDocInfo } from '../../services/apiCall';
import { showNoty } from '../../common/flash/flashNotification';
import FlashMessage from 'react-native-flash-message';
import server from '../../services/server.tsx'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SearchBox from '../../adOns/atoms/Search.js';

const DocVerification = () => {
    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [docList, setDocList] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const ref = useRef(null)
    const [searchedTerm, setSearchedTerm] = useState('')
    const [searchedData, setSearchedData] = useState([])

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
                    setSearchedData(prev => { return [...data.data.data] })
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
            title={'Document Verification'}
            showAddIcon={true}
            addButtonAction={() => { setShowAddModal(true) }}
        >
            <FlashMessage ref={ref} />
            <AddDocumentModal
                show={showAddModal}
                setShow={setShowAddModal}
            />
            <SearchBox  placeholder={'Search by Name or Phone Number'}
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
                    return (<TouchableOpacity onPress={() => {
                        navigation.navigate('Documents', {
                            item: item
                        })
                    }} style={styles.itemContainer} key={index}>
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

export default DocVerification;
