import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WHITEBG } from '../../styles/colors'

const VehicleCard = (props) => {
    const { type, subType, capacity, pending,vehicleNo } = props.item

    return (
        <View style={{ width: '100%', borderRadius: 10, borderWidth: 1,backgroundColor : WHITEBG, }}>
            <Text style={{fontSize : 26, color : 'black' , fontFamily : 'serif'}}> Vehicle {props.index} </Text>
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.text}>TYPE : {type}</Text>
                    <Text style={styles.text}>SUB TYPE  : {subType}</Text>
                    <Text style={styles.text}>CAPACITY : {capacity}</Text>
                    <Text style={{...styles.text , color :  'gray'}}>NO : {vehicleNo}</Text>
                </View>
                <View style={styles.right}>
                    <View style={{ ...styles.button, backgroundColor: pending !== 0 ? 'red' : 'green' }}></View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor : WHITEBG,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
        borderRadius: 10
    },
    left: {
        width: '55%',

    },
    text: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'serif'
    },
    right: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth : 1,
        position : 'relative',
        top : -20
    },
    button: {
        borderRadius: 50,
        width: 50,
        height: 50
    }
})

export default VehicleCard