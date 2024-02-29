import React, { useEffect, useState } from 'react'
import { BackHandler, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchBox from '../../adOns/atoms/Search'
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import { height } from '../../styles/responsive'

const HomePage = () => {
    const navigation = useNavigation()

    const [showSearchResult , setShowSearchResults] = useState(true)
    const [searchArray, setSearchArray] = useState(['item1', 'ghantu', 'kalyaanimaam', 'shrutimaam','herapheri','kgf'])



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
            <ScrollView >
                <View style={{ position: 'relative' }}>
                    <View style= {{zIndex : 2}}>
                        <SearchBox searchArray={searchArray}/>
                    </View>
                    <View style={{ position: 'relative', zIndex: 1 }}>
                        <Text style={{ color: 'red' }}>Hoome Page</Text>
                       
                    </View>
                </View>
            </ScrollView>
        </AuthenticatedLayout>
    )
}

export default HomePage