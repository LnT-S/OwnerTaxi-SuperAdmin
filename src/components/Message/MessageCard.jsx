import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const MessageCard = (props) => {

    const {image, name, lastMessage} = props.item

    const getFirst40Words = (lastMessage) => {
        const words = lastMessage.split('');
        const first40Words = words.slice(0, 40).join('');
        return first40Words;
    };

    return (
        <View style={styles.boxStyle}>
            <View>
                <Image source={image} style={styles.typeStyle} resizeMode='contain'/>
                </View>
                <View  style={styles.displayflex}>
                <Text style={styles.contentStyle}>{name}</Text>
                <Text style={styles.timeStyle}>{getFirst40Words(lastMessage)}...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: 'black',
        padding: 8,
        marginHorizontal: 10,
        display:'flex',
        flexDirection: 'row',
    },
    displayflex: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 20
    },
    typeStyle: {
        height: 50,
        width: 50
    },
    contentStyle: {
        fontSize: 18,
        color: 'white'
    },
    timeStyle: {
        fontSize: 13,
        fontWeight: '400',
        color: '#f0e6e6'
    }
})

export default MessageCard;
