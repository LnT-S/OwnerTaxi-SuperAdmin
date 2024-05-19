import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import PressButton from '../../adOns/atoms/PressButton.jsx';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDocumentPicker from './CustomDocumentPicker.jsx';
import InfoModal from '../../adOns/molecules/InfoModal.jsx';
import AcceptRejectModal from '../../adOns/molecules/AcceptRejectModal.jsx';
import { WHITEBG } from '../../styles/colors.jsx';
import server from '../../services/server.tsx'
import ProgressModal from '../../adOns/molecules/ProgressModal.js';

const MainDocumentCard = (props) => {
    const { status, documentNo, documentName, image, documentFor, comment} = props.item
    const user = props.user
    const vehicleNo = props.vehicleNo
    const setProgress = props.setProgress
    const { reload } = props

    const [modalVisible, setModalVisible] = useState(false);

    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const [viewDocument, setViewDocument] = useState(false)

    const backgroundColorMapper = {
        Missing: styles.missingContainer,
        Uploaded: styles.pendingContainer,
        Reject: styles.rejectedContainer,
        Accept: styles.acceptedContainer
    }
    const infoMessage = {
        Missing: 'User has not yet uploaded the document',
        Uploaded: 'User have uploaded the document! Please Verify',
        Reject: 'You have rejected the document previously',
        Accept: 'You have acepted the document'
    }

    return (

        <View style={{ ...styles.container }}>
            
            <InfoModal
                show={infoModalVisible}
                setShow={setInfoModalVisible}
                title={status}
                message={infoMessage[status]}
            />
            <AcceptRejectModal
                show={viewDocument}
                setShow={setViewDocument}
                title={documentName}
                extContStyle={{ width: '85%' }}
                documentNo={documentNo}
                serverImageSource={server.server + image}
                user={user}
                documentFor = {documentFor}
                setProgress={setProgress}
                vehicleNo={vehicleNo}
                comments={comment}
            />
            <View style={styles.section1}>
                <TouchableOpacity
                    style={{ ...styles.statusContainer, ...backgroundColorMapper[status] }}
                    onPress={() => setInfoModalVisible(true)}
                >
                    <Text style={styles.statusContainerText}>{status}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section2}>
                {(status === 'Uploaded' || status === 'Accept' || status === 'Reject') ? <TouchableOpacity style={styles.viewButtonContainer} onPress={() => { setViewDocument(true) }}>
                    <Text style={styles.viewButtonContainerText}> View </Text>
                </TouchableOpacity> : ''}
                {(status === 'Missing' || status === 'Reject') ?
                    <TouchableOpacity
                        style={styles.uploadButtonContainer}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.uploadButtonContainerText}> Upload </Text>
                    </TouchableOpacity> : ''}
            </View>
            <View style={styles.section3}>
                <View style={styles.documentNameTextContainer}>
                    <Text style={styles.documentNameText}>{documentName}</Text>
                </View>
            </View>
            {/*<TouchableOpacity style={styles.crossButton}>
                <Icon name="close" size={18} color="red" />
    </TouchableOpacity>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITEBG,
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        width: '45%',
        // height: 170, //adjust,
        flexWrap: 'wrap',
        borderWidth: 1,
        flexDirection: 'column',
        borderRadius: 15
    },
    crossButton: {
        position: 'absolute',
        top: 3,
        right: 3,
        color: 'red',
        backgroundColor: 'white',
        borderRadius: 50,
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section1: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom : 30

    },
    statusContainer: {
        width: '60%',

    },
    statusContainerText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center'
    },
    section2: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom : 30

    },
    section3: {
        width: '100%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15

    },
    documentNameTextContainer: {
    },
    viewButtonContainer: {
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 5
    },
    viewButtonContainerText: {
        fontSize: 16,
        color: 'white'
    },
    documentNameText: {
        color: 'white',
        fontSize: 16,
        letterSpacing: 1.1,
        fontWeight: '400'
    },
    uploadButtonContainer: {
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'black',

    },
    uploadButtonContainerText: {
        color: 'white',
        fontSize: 16
    },
    acceptedContainer: {
        backgroundColor: 'green'
    },
    missingContainer: {
        backgroundColor: 'blue'
    },
    pendingContainer: {
        backgroundColor: 'orange'
    },
    rejectedContainer: {
        backgroundColor: 'red'
    }
})

export default MainDocumentCard;

