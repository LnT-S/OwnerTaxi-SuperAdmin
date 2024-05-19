import React, { useEffect, useState } from 'react';
import { Button, Modal, Text, View, StyleSheet, ImageBackground } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import PressButton from '../../adOns/atoms/PressButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../adOns/atoms/Input';

const CustomDocumentPicker = (props) => {

    const { documentName, visible, setVisible,documentDetails,vehicleNo,reload } = props
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [document, setDocument] = useState(null)
    const [isDocumentUploading, setIsDocumentUploading] = useState(false)

    console.log("DOCUMENT DETAILS ",documentDetails , vehicleNo)

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: false
            });

            res[0] = { ...res[0], documentName: documentName }
            setDocument(res[0])
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Error', err);
            }
        }
    };

    const uploadDocument = () => {
        // API CALL FOR DOCUMENT UPLOAD
        if (input === '') {
            setError('Required')
            return 
        }
        let documentFor = ''
        if(documentDetails.documentFor==='' || documentDetails.documentFor==="Driver" || documentDetails.documentFor===undefined){
            documentFor="Driver"
        }else{
            if(documentDetails.documentFor==='Vehicle'){
                documentFor="Vehicle"
            }
        }
        let data = {
            vehicleNo : vehicleNo,
            document,
            documentName,
            documentFor,
            documentNo :  input,
        }
        uploadDocumentDriver(data)
        .then(data=>{
            console.log(data.data.message)
            if(data.status===200){
                reload()
                setVisible(false)
            }
        })
        .catch(err=>{
            console.log("ERROR IS ", err)
        })
        setIsDocumentUploading(true)
        setTimeout(() => { setIsDocumentUploading(false); setVisible(false) }, 2000)
        setDocument(null)
    }

    const cancelUpload = () => {
        console.log('UPLOAD CANCELLED')
        setError('')
        setDocument(null)
        setVisible(false)
    }

    useEffect(()=>{
        console.log("DOCUMENT SELECTED ",document)
    },[document])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {document !== null ? <Text style={styles.modalText}>{document.name.substring(0, 20)}...</Text> :
                        <Text style={styles.modalText}>Choose {documentName}</Text>}
                    <View style={{ maxWidth: '80%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginVertical: 10 }}>
                        <Text style={{ fontSize: 22, color: 'black', marginBottom: 7, letterSpacing: -0.5 }}>{documentName} No</Text>
                        <Input
                            containerStyles={{ width: 230 }}
                            textInputProps={{
                                onChangeText: (v) => { setInput(v) },
                                value: input
                            }}
                        />
                        {error!==''?<Text style={{ color: 'red', textAlign: 'center', fontSize: 12, fontWeight: '300' }}>* {error}</Text> : ''}
                    </View>
                    {document !== null ? <PressButton name="Upload Document" onPress={uploadDocument} /> :
                        <PressButton
                            name="Pick Document"
                            onPress={() => pickDocument().then(() => { }).catch(err => { console.log('ERROR PICKING DOCUMENT') })}
                            loading={isDocumentUploading}
                            disabled={isDocumentUploading} />}
                    <PressButton name="Close" onPress={cancelUpload} disabled={isDocumentUploading} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
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
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 10,
        color: 'black',
        fontSize: 22
    },
    circle: {
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
});

export default CustomDocumentPicker;
