
import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgColor } from "../../styles/colors";

const Input = (props) => {
    const {outerStyles} = props

    return (
            <TextInput
                style={{...styles.input , ...props.containerStyles}}
                placeholder={props.placeholder}
                placeholderTextColor='gray'
                maxLength={props.length || 15}
                {...props.textInputProps}
            // Other TextInput props go here
            />
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: getResponsiveValue(70, 50),
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: `white`,
        marginBottom: getResponsiveValue(40, 20),
    },
    input: {
        borderWidth: 1,
        fontSize:18,
        borderColor: BgColor,
        color: 'gray',
        width: getResponsiveValue(500, screenWidth * 0.8),
        paddingHorizontal: 10,
        backgroundColor: `white`,
    },
});

export default Input;