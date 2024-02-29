import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ThreeWayPushButton = (props) => {

    const { option1, option2,option3, setter } = props
    const [isOption1, setOption1] = useState(true)
    const [isOption2, setOption2] = useState(false)
    const [isOption3, setOption3] = useState(false)

    const handlePressed = (v) => {
        if (v === option1) {
            setOption1(true)
            setOption2(false)
            setOption3(false)
        } else if(v === option2){
            setOption1(false)
            setOption2(true)
            setOption3(false)
        }  else if(v === option3){
            setOption1(false)
            setOption2(false)
            setOption3(true)
        }
        setter(v)
    }

    useEffect(() => {
        setTimeout(() => setter(option1), 1000)
    }, [])

    return (

        <SafeAreaView>
            <View style={{...styles.pushbtn , ...props.outerStyles} }>
                <TouchableOpacity
                    onPress={() => handlePressed(option1)}
                    style={{ width: '30%' }}
                >
                    <View style={isOption1 ? styles.pushstyle : styles.defaultpushstyle}>
                        <Text style={isOption1 ? styles.selectedButton : styles.defaultBottonText}>{option1}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePressed(option2)}
                    style={{ width: '30%' }}
                >
                    <View style={isOption2 ? styles.pushstyle : styles.defaultpushstyle}>
                        <Text style={isOption2 ? styles.selectedButton : styles.defaultBottonText}>{option2}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePressed(option3)}
                    style={{ width: '32%' }}
                >
                    <View style={isOption3 ? styles.pushstyle : styles.defaultpushstyle}>
                        <Text style={isOption3 ? styles.selectedButton : styles.defaultBottonText}>{option3}</Text>
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
        borderRadius: 10,
        padding : 7,
        marginLeft: 10,
        width: '75%'
    },
    defaultpushstyle: {
        color: `white`,
        borderRadius: 5,
    },
    pushstyle: {
        backgroundColor: `white`,
        color: `black`,
        borderRadius: 10,
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

export default ThreeWayPushButton