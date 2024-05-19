import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, FlatList, StyleSheet, BackHandler, ActivityIndicator, RefreshControl } from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout.jsx'
import PaymentCard from './PaymentCard.jsx'
import PressButton from '../../adOns/atoms/PressButton.jsx'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProfile } from '../../context/ContextProvider.jsx'
import server from '../../services/server.tsx'
import LoadingScreen from '../../adOns/organisms/LoadingScreen.jsx'
import { showNoty } from '../../common/flash/flashNotification.jsx'
import FlashMessage from 'react-native-flash-message'
import InfoModal from '../../adOns/molecules/InfoModal.jsx'
import { getPaymentsInfo } from '../../services/apiCall.jsx'
import PaymentARModal from '../../adOns/molecules/PaymentARModal.jsx'

const UserPayment = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const item = route.params?.item
    console.log("INSIDE ", item);
    const { profileState, profileDispatch } = useProfile()
    const ref = useRef()
    const [comingSoon, setComingsoon] = useState(false)

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [transactionInfo, setTransactionInfo] = useState(null)
    const [showSs, setShowss] = useState(false)
    const [ss, setSs] = useState('')
    const [tId ,setTid] = useState('')
    useFocusEffect(
        useCallback(() => {
            setTransactionInfo(item)
        }, [item ,route ]))
    useEffect(() => {
        const backFuntion = () => {
            navigation.goBack()
            return true
        }
        console.log("BACKHANDLER SET IN HOME PAGE")
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backFuntion);
        return () => {
            console.log('BACKHANDLER REMOVED FROM HOME PAGE')
            backHandler.remove()
        };
    }, []);
    return (
        <AuthenticatedLayout title={'User Payment '}>
            <FlashMessage ref={ref} />
            <PaymentARModal
                show={showSs}
                setShow={setShowss}
                title={"Screen Shot"}
                extContStyle={{ width: '85%' }}
                serverImageSource={server.server + ss}
                transactionInfo={transactionInfo}
                tId={tId}
            />
            <View style={styles.displayFlex}>
                <Image source={!transactionInfo?.id?.avatar ? require('../../assets/imgaes/Profile2.png') : { uri: server.server + transactionInfo?.id?.avatar }} style={styles.imagestyle} />
                <Text style={styles.textstyle}>{transactionInfo?.id?.name}</Text>
            </View>
            {!comingSoon ? <View style={{ flex: 1, marginBottom: 20 }}>
                <View style={styles.rupeeBox}>
                    <Text style={{ ...styles.rupeetext, color: 'red' }}>Balance : </Text>
                    <Text style={styles.rupeetext}>₹ {transactionInfo !== null ? transactionInfo.balance : <ActivityIndicator />}</Text>
                </View>
                <View style={styles.col}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.text}>Transaction History</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {transactionInfo !== null
                                ?
                                <FlatList
                                    style={{ flex: 1, marginBottom: 10 }}
                                    keyExtractor={(item, index) => (index)}
                                    data={transactionInfo?.transactionList}
                                    renderItem={({ item, i }) => {
                                        return <TouchableOpacity key={i} onPress={() => { setTid(item.date); setSs(item.ss); setShowss(true) }}>
                                            <View style={styles.FlatListviewStyle}>
                                                <PaymentCard item={item} />
                                            </View>
                                        </TouchableOpacity>
                                    }}
                                /> : <ActivityIndicator color={"black"} />}
                        </View>
                    </View>
                    <View>
                        <PressButton
                            name='Recharge Now'
                            onPress={() => navigation.navigate('Recharge')}
                        />
                    </View>
                </View>
            </View> : <LoadingScreen cs={true} showFooter={false} showHeader={false} />}

        </AuthenticatedLayout>
    )
}

const styles = StyleSheet.create({
    imagestyle: {
        width: 80,
        height: 80,
        borderRadius: 30,
        marginBottom: 10,
    },
    FlatListviewStyle: {
        marginVertical: 1
    },
    displayFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    textstyle: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: '800',
    },
    text: {
        marginLeft: 15,
        fontSize: 20,
        fontWeight: '500',
        color: 'black'
    },
    rupeeBox: {
        marginHorizontal: 10,
        backgroundColor: 'black',
        height: 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    rupeetext: {
        color: 'white',
        fontSize: 25
    },
    col: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

})

export default UserPayment 