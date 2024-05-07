import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BgColor } from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Footer = (props) => {

    const { showAddIcon,addButtonAction } = props
    const navigation = useNavigation()
    const [userIs, setUserIs] = useState(null)

    const userIS = async function () {
        let temp = await AsyncStorage.getItem('userIs')
        return temp
    }

    useEffect(() => {
        userIS().then(data => {
            setUserIs(data)
        }).catch(err => {
            console.log('UNABLE TO GET USER TYPE IN FOOTER')
        })
    }, [])

    return (
        <SafeAreaView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <View style={styles.icons}>
                        <Icon name="home" size={40} color="#000" />
                    </View>
                </TouchableOpacity>
                {/*} <TouchableOpacity onPress={() => navigation.navigate('Document')}>
                    <View style={styles.icons}>
                        <Icon name="event" size={40} color="#000" />
                    </View>
                </TouchableOpacity>*/}
                {showAddIcon&&(addButtonAction!==undefined)&&<TouchableOpacity onPress={addButtonAction}>
                    <View style={styles.icons}>
                        <Icon name="add-circle" size={40} color="#000" />
                    </View>
                </TouchableOpacity>}
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.icons}>
                        <Icon name="person" size={40} color="#000" />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    footer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: BgColor,
        zIndex: 2
    },
    icons: {
        margin: 5
    }
})

export default Footer