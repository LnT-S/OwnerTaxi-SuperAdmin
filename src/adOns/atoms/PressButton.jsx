import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import { BgColor } from '../../styles/colors';


const PressButton = (props) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer]} {...props}>
            <View style={[styles.button]} >
                <Text style={styles.text}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default PressButton;

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        margin:2
    },
    iconWrapper: {
        paddingHorizontal: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: getResponsiveValue("5%", "8%"),
        letterSpacing: 1,
        fontWeight: `500`

    },
    button: {

        height: getResponsiveValue(60, screenWidth * 0.12),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        // width: "100%",
        backgroundColor: `black`
    },
});