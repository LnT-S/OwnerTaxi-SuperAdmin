import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, Image } from "react-native";
import PressButton from "../atoms/PressButton";

export default function ProgressModal(props) {

    const { show, setShow,progress } = props
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
        borderRadius: 0,
        elevation: 5,
        alignItems: 'center',
        width: '70%',
        height : 60
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
