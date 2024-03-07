
import React, { useState } from "react";
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from "react-native";
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgColor } from "../../styles/colors";

const MessageInput = (props) => {

    const { sendMessage } = props
    const [msg, setMsg] = useState('')

    return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={props.placeholder}
                    placeholderTextColor={'gray'}
                    value={msg}
                    onChangeText={(v) => setMsg(v)}
                    multiline={true}
                // Other TextInput props go here
                />
                <Icon
                    name="send"
                    size={30}
                    color="#ffea00"
                    style={styles.icon}
                    onPress={() => {sendMessage(msg);setMsg('')}}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minHeight: getResponsiveValue(70, 50),
        maxHeight : 120,
        borderRadius: 20,
        borderWidth: 2,
        paddingHorizontal: 15,
        backgroundColor: `black`,
        marginBottom: 3,
        color: 'black',
        borderColor: 'black',
        borderWidth: 2,
        borderColor: 'white'
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: 'white',
        display : 'flex',
        justifyContent : 'flex-start',
        flexWrap : 'wrap'
    },
});

export default MessageInput;