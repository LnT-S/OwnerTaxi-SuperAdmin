import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const NotificationBox = (props) => {

    const {notificationType, content, time} = props.item

    const getFirst10Words = (content) => {
        const words = content.split(' ');
        const first10Words = words.slice(0, 10).join(' ');
        return first10Words;
    };

    return (
        <View style={styles.boxStyle}>
            <View style={styles.displayflex}>
                <Text style={styles.typeStyle}>{notificationType}</Text>
                <Text style={styles.timeStyle}>{time}</Text>
            </View>
            <View>
                <Text style={styles.contentStyle}>{getFirst10Words(content)}...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: 'black',
        padding: 8,
        marginHorizontal: 10
    },
    displayflex: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    typeStyle: {
        fontSize: 18,
        fontWeight: '800',
        color: 'white'
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

export default NotificationBox;
