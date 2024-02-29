import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TwoWayPushButton = (props) => {

    const { option1, option2, setter } = props
    const [isOption1, setOption1] = useState(true)

    const handlePressed = (v) => {
        if (v === option1) {
            setOption1(true)
        } else {
            setOption1(false)
        }
        setter(v)
    }

    useEffect(() => {
        setTimeout(() => setter(option1), 1000)
    }, [])

    return (

        <SafeAreaView>
            <View style={styles.pushbtn}>
                <TouchableOpacity
                    onPress={() => handlePressed(option1)}
                    style={{ width: '50%' }}
                >
                    <View style={isOption1 ? styles.pushstyle : styles.defaultpushstyle}>
                        <Text style={isOption1 ? styles.selectedButton : styles.defaultBottonText}>{option1}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePressed(option2)}
                    style={{ width: '50%' }}
                >
                    <View style={!isOption1 ? styles.pushstyle : styles.defaultpushstyle}>
                        <Text style={!isOption1 ? styles.selectedButton : styles.defaultBottonText}>{option2}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pushbtn: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-around`,
        alignItems: 'center',
        backgroundColor: `black`,
        borderRadius: 20,
        padding : 7,
        margin: 20,
        width: '60%'
    },
    defaultpushstyle: {
        color: `white`,
        borderRadius: 5,
    },
    pushstyle: {
        backgroundColor: `white`,
        color: `black`,
        borderRadius: 12,
    },
    defaultBottonText : {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: `700`,
        color : 'white',
        flexWrap : 'nowrap'
    },
    selectedButton : {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: `500`,
        color : 'black',
        flexWrap : 'nowrap'
    }
})

export default TwoWayPushButton