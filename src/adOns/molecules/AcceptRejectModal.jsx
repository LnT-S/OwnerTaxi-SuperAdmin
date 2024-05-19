import React, { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, Image, TouchableOpacity, Alert, TextInput } from "react-native";
import PressButton from "../atoms/PressButton";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgColor } from "../../styles/colors";
import { captureAndDownload, copyToClipboard } from "../../utils/UtilityFuntions";
import * as Progress from 'react-native-progress';
import { useFocusEffect } from "@react-navigation/native";
import { setDocumentStatus } from "../../services/apiCall";

export default function AcceptRejectModal(props) {

    const { show, setShow, title, message, messageJsx, imageSource, serverImageSource, documentNo, user, documentFor, vehicleNo,comments } = props
    const [progress, setProgress] = useState(0)
    const [isDownloading, setIsDownlaoding] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showCopied, setShowCopied] = useState(false)
    const [comment, setComment] = useState(comments || '')
    useFocusEffect(
        useCallback(() => {
            setProgress(0)
        }, [])
    )
    const handleCancel = () => {
        setShow(false);
    };
    const handleSet = (status) => {
        setIsUpdating(true)
        const formData = {
            documentNo,
            documentName: title,
            status,
            docFor: documentFor === 'Vehicle' ? 'vehicle' : 'driver',
            phoneNo: user.phoneNo,
            vehicleNo,
            comment : comment==='' ? undefined : comment
        }
        setDocumentStatus(formData)
            .then(data => {
                Alert.alert("Document Verification", data.data.message)
            })
            .catch(err => {
                console.log("ERROR IN UPDAITNG ", err);
                Alert.alert("Error", "Try Loggin Again")
            })
        setTimeout(() => { setIsUpdating(false) }, 1500)
        console.log("USER ", formData);
        // setShow(false);
    };
    const showCopiedHandler = () => {
        setShowCopied(true);
        setTimeout(() => { setShowCopied(false) }, 1000)
    }
    return (
        <Modal
            visible={show}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>
                {isUpdating && <View style={{ zIndex: 999, position: 'absolute', bottom: 400 }}><Progress.CircleSnail color={['#ffea00', "black", '#ffea00', "black"]} strokeCap="round" size={60} spinDuration={500} /></View>}
                <TouchableOpacity style={{ ...styles.r1, position: 'absolute', backgroundColor: BgColor, borderRadius: 50, top: 480, right: 75,zIndex : 9}} onPress={async () => { setIsDownlaoding(true); await captureAndDownload(serverImageSource, setProgress, user?.phoneNo?.toString(), user?.name); setIsDownlaoding(false); setProgress(0) }}>
                    <Icon name='download' size={30} color={'black'} />
                </TouchableOpacity>
                <View style={{ ...styles.modalContent, ...props.extContStyle }}>
                    <View style={{ width: '100%', marginBottom: 15 }}>
                        <Text style={{ fontSize: 26, color: 'black' }}>{title}</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>{documentNo}</Text>
                            <TouchableOpacity onPress={() => { copyToClipboard(documentNo); showCopiedHandler() }}>{!showCopied ? <Icon name='content-copy' size={30} color={'black'} /> : <Text>Copied...</Text>}</TouchableOpacity>
                        </View>

                    </View>
                    {(messageJsx === undefined && message !== undefined) ? <View style={{ marginBottom: 4 }}>
                        <Text style={styles.modalText}>{message}</Text>
                    </View> : messageJsx}
                    {imageSource ? <Image source={imageSource} style={{ height: 350, width: '90%', marginBottom: 15 }} /> : ''}
                    {(serverImageSource) ? <Image source={{ uri: serverImageSource }} style={{ height: 350, width: '90%', marginBottom: 15 }} />
                        : ''}
                    {isDownloading && <View style={styles.progressContainer}>
                        <Progress.Bar progress={progress} width={280} color="black" borderColor={BgColor} />
                    </View>}
                    <View style={styles.row}>
                        <TextInput
                            placeholder="Enter Comment"
                            placeholderTextColor={"gray"}
                            multiline={true}
                            numberOfLines={3}
                            value={comment}
                            onChangeText={v=>setComment(v)}
                            style={{width : '100%',borderWidth : 1,borderColor : BgColor,marginBottom : 30,marginTop : 15, color : 'black',padding : 5}}
                        />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.r1}>
                            <PressButton name={'Accept'} onPress={() => handleSet("Accept")} bg='green' />
                        </View>
                        <View style={styles.r1}>

                            <PressButton name={'Reject'} bg='red' onPress={() => handleSet("Reject")} />
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
    progressContainer: {

    },
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
