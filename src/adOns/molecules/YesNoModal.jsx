import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View , Modal, Text} from "react-native";
import PressButton from "../atoms/PressButton";

export default function YesNoModal(props) {

    const { show ,setShow, title, message, handleYes, handleNo, yesText, noText } = props
    const handleCancel = () => {
        setShow(false);
    };
    return (
        <Modal
            visible={show}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.row}>
                        <View style={styles.r1}>
                            <PressButton name={noText ? noText : 'No'} onPress={handleCancel} />
                        </View>
                        <View style={styles.r2}>
                            <PressButton name={yesText ? yesText : 'Yes'} onPress={handleYes} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        width: '70%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    r1: {
        right: 10,
    },
    r2: {
        left: 10,
    },
});
