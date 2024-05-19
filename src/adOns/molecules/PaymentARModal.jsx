import React, { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, Image, Alert } from "react-native";
import PressButton from "../atoms/PressButton";
import { captureAndDownload, copyToClipboard } from "../../utils/UtilityFuntions";
import * as Progress from 'react-native-progress';
import { useFocusEffect } from "@react-navigation/native";
import { setPaymentStatus } from "../../services/apiCall";

export default function PaymentARModal(props) {

    const { show, setShow, title, message, messageJsx, imageSource, serverImageSource,transactionInfo,tId } = props
    const [progress, setProgress] = useState(0)
    const [isDownloading, setIsDownlaoding] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showCopied, setShowCopied] = useState(false)
    useFocusEffect(
        useCallback(() => {
            setProgress(0)
        }, [])
    )
    const handleSet = (status) => {
        setIsUpdating(true)
        const formData = {
            status,
            id: transactionInfo?._id,
            tId 
        }
        console.log("FORM DATA ",formData);
        setPaymentStatus(formData)
            .then(data => {
                Alert.alert("Payment Verification", data.data.message)
            })
            .catch(err => {
                console.log("ERROR IN UPDAITNG ", err);
                Alert.alert("Error", "Try Loggin Again")
            })
        setTimeout(() => { setIsUpdating(false) }, 1500)
        console.log("USER ", formData);
        // setShow(false);
    };
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
                {isUpdating && <View style={{ zIndex: 999, position: 'absolute', bottom: 400 }}><Progress.CircleSnail color={['#ffea00', "black", '#ffea00', "black"]} strokeCap="round" size={60} spinDuration={500} /></View>}
                <View style={{ ...styles.modalContent, ...props.extContStyle }}>
                    <View style={{ width: '100%', marginBottom: 15 }}>
                        <Text style={{ fontSize: 26, color: 'black' }}>{title}</Text>
                    </View>
                    {(messageJsx === undefined && message !== undefined) ? <View style={{ marginBottom: 4 }}>
                        <Text style={styles.modalText}>{message}</Text>
                    </View> : messageJsx}
                    {imageSource ? <Image source={imageSource} style={{ height: 350, width: '90%', marginBottom: 15 }} /> : ''}
                    {serverImageSource ? <Image source={{ uri: serverImageSource }} style={{ height: 350, width: '90%', marginBottom: 15 }} /> : ''}
                    <View style={styles.row}>
                        <View style={styles.r1}>
                            <PressButton name={'Accept'} onPress={() => handleSet("verifed")} bg='green' />
                        </View>
                        <View style={styles.r1}>

                            <PressButton name={'Reject'} bg='red' onPress={() => handleSet("discarded")} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.r1}>
                            <PressButton name={'Close'} onPress={handleCancel} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'relative',
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
        marginVertical : 10,
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
