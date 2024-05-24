import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import PressButton from '../atoms/PressButton';
import { Dropdown } from 'react-native-element-dropdown';
import { BgColor } from '../../styles/colors';
import { addDocumentList } from '../../services/apiCall';
import FlashMessage from 'react-native-flash-message';
import { showNoty } from '../../common/flash/flashNotification';
import CheckbocTC from '../atoms/CheckbocT&C';

const AddDocumentModal = (props) => {
    const { show, setShow } = props
    const modalRef = useRef(null)

    const [documentFor, setDocumentFor] = useState('')
    const [documentName, setDocumentName] = useState('')
    const [required, setIsRequired] = useState(false)
    const [autoGenerateNo, setAutoGenerateNo] = useState(false)

    const handleCancel = () => {
        setDocumentFor('')
        setDocumentName('')
        setShow(false);
    };
    const handleAddDocument = () => {
        if (documentFor === '' || documentName === '') {
            showNoty("Enter Valid and All Fields", "danger")
            setDocumentName('')
            return
        }
        addDocumentList({ documentFor, documentName, required ,autoGenerateNo})
            .then(data => {
                showNoty(data.data.message, "success")
                setDocumentFor('')
                setDocumentName('')
            })
            .catch(err => {
                setDocumentFor('')
                setDocumentName('')
                console.log("ERRROR UPLOADING DOCUMENT", err)
                showNoty(err, "danger")
            })
    }
    // useEffect(() => {
    //     console.log("FOR ", documentFor)
    // }, [documentFor])
    useEffect(() => {
        console.log("FOR ", autoGenerateNo)
    }, [autoGenerateNo])

    return (
        <Modal
            visible={show}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>
                <FlashMessage ref={modalRef} />
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{"Add Required Document Name "}</Text>
                    <View style={styles.fieldContainer}>
                        <View style={styles.field}>
                            <Text style={styles.fieldText}>
                            </Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder='Document Name'
                                placeholderTextColor={"black"}
                                value={documentName}
                                onChangeText={v => { setDocumentName(v) }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.fieldText}>
                            </Text>
                            <Dropdown
                                style={styles.fieldDD}
                                data={[{ label: 'Driver', value: 'Driver' }, { label: 'Vehicle', value: 'Vehicle' }]}
                                placeholder='Select Document For'
                                placeholderStyle={{ color: 'black' }}
                                value={documentFor}
                                labelField="label"
                                valueField="value"
                                onChange={item => {
                                    setDocumentFor(item.value);
                                }}
                            />
                        </View>
                        <View style={{ borderWidth: 2, borderColor: BgColor, justifyContent: "flex-start", marginTop: 15, padding: 0 }}>
                            <CheckbocTC isChecked={required} setIsChecked={setIsRequired} placeholder={"Required"} styles={{}} />
                        </View>
                        <View style={{ borderWidth: 2, borderColor: BgColor, justifyContent: "flex-start", marginTop: 15, marginBottom: -15, padding: 0 }}>
                            <CheckbocTC isChecked={autoGenerateNo} setIsChecked={setAutoGenerateNo} placeholder={"Auto Generate No"} styles={{}} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.r1}>
                            <PressButton name={"Cancel"} onPress={handleCancel} />
                        </View>
                        <View style={styles.r2}>
                            <PressButton name={"Add"} onPress={handleAddDocument} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
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
        fontWeight: 'bold',
        color: 'black',
    },
    fieldContainer: {
        width: '90%',
        marginBottom: 40
    },
    field: {
    },
    fieldText: {

    },
    fieldInput: {
        borderBottomWidth: 1,
        borderBottomColor: BgColor
    },
    fieldDD: {
        borderWidth: 2,
        borderColor: BgColor,
        padding: 5,
        color: 'black'
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


export default AddDocumentModal