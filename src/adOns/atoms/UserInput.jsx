
import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserInput = (props) => {

    return (
        <View style={styles.inputContainer}>
            <Icon name={props.icon} style={styles.icon} size={24} />
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor='gray'
            // Other TextInput props go here
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: getResponsiveValue(500, screenWidth * 0.8),
        height: getResponsiveValue(70, 50),
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: `white`,
        marginBottom: getResponsiveValue(40, 20),
        color: 'black',
        borderColor: 'black',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize:18,
    },
});

export default UserInput;