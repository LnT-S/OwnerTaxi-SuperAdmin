import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import UserInput from '../../adOns/atoms/UserInput';
import MessageInput from '../../adOns/atoms/MessageInput';
import { height } from '../../styles/responsive';
import { activeMessageArray } from '../../utils/UtilityFuntions';

const MessageScreen = (props) => {

    const route = useRoute()
    const scrollViewRef = useRef();
    const { image, name, lastMessage } = route.params.item

    const [chatData, setchatData] = useState({
        user1: [{ ts: 1, message: 'hi' }, { ts: 0, message: 'how are you' }],
        user2: [{ ts: 6, message: 'user2' }, { ts: 2, message: 'hello' }, { ts: 1, message: 'fine' }]
    })

    const [msgRenderArray, setmsgRenderArray] = useState([])
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

    const sendMessage = async (message) => {
        if (message === '') return;
        let ts = new Date().getTime()
        console.log('ts', ts, '\nmessage', message)
        let msgObj = {
            ts: ts,
            message: message
        }
        let newArr = [msgObj, ...chatData.user1]
        setchatData({ ...chatData, user1: newArr })
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                console.log('KEYBOARD VISIBLE');
                setIsKeyboardVisible(true)
                // You can perform actions when the keyboard is shown
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                console.log('KEYBOARD HIDDEN');
                setIsKeyboardVisible(false)
                // You can perform actions when the keyboard is hidden
            }
        );
        // Clean up listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
        console.log('New Message Added', chatData)
        let temp = activeMessageArray(chatData.user1, chatData.user2)
        // console.log('MESSAGE RENDER ARRAY', temp)
        setmsgRenderArray(temp)
    }, [chatData])


    const dp = <Image source={image} style={{ height: 50, width: 50, marginLeft: 5 }} />
    const optionObject = {
        option1 : {
            name : 'Delete All Message',
            action : ()=>{
                // API CALL TO DELETE ALL MESSAGES OF CURRENT USER
                console.log('ALL MESSAGES DELETED')
            }
        },
        option2: {
            name : `Block`,
            action : ()=>{
                //API CALL TO BLOCK THE USER
                console.log('USER BLOCKED')
            }
        },
        option3 : {
            name : 'Report',
            action : ()=>{
                //API CALL TO BLOCK THE USER
                console.log('REPORT SUCCESSFULL')
            }
        }
    }

    return (
        <AuthenticatedLayout
            title={name}
            showBackIcon={true}
            showMessageIcon={false}
            showNotification={false}
            showHMIcon={false}
            show3DotIcon={true}
            threeDotOptionObject={optionObject}
            leftCenterJsx={dp}
            headerStyles={styles.customHeaderStyle}
            headerTextStyles={styles.customHeaderTextStyle}
            showFooter={false}
        >

            <View style={styles.screen}>
                <View style={styles.container}>
                    <View style={{ marginTop: 53 }}>
                        <ScrollView ref={scrollViewRef}>
                            <View style={styles.screenStyle}>
                                {/*Chat Display Screen*/}

                                {msgRenderArray.map((item, index) => {
                                    if (item.user === 'self') {
                                        return <View key={index} style={styles.selfUserChatContainer}><Text style={styles.selfUserChat}>{item.message}</Text></View>
                                    } else {
                                        return <View key={index} style={styles.otherUserChatContainer}><Text style={styles.otherUserChat}>{item.message}</Text></View>
                                    }
                                })}
                                
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.messageInput}>
                        <MessageInput placeholder="Type a message" sendMessage={sendMessage} />
                    </View>
                </View>
            </View>
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    screen :{
        backgroundColor: '#e7eef6',
        flex:1
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    customHeaderStyle: {
        backgroundColor: 'black',
        height: 70
    },
    customHeaderTextStyle: {
        color: 'white'
    },
    screenStyle: {
        display: 'flex',
        flexDirection: 'column-reverse',
        // borderWidth: 1,
        // borderColor: 'violet',
        width: '100%',
        padding: 10
    },
    messageInput: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    chatDisplayScreen: {
    },
    chat: {

    },
    selfUserChatContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 2
    },
    otherUserChatContainer: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 2
    },
    selfUserChat: {
        textAlign: 'right',
        maxWidth: '80%',
        backgroundColor: '#ffea00',
        color: 'black',
        fontSize: 18,
        padding: 8,
        paddingRight: 25,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 20,
    },
    otherUserChat: {
        textAlign: 'left',
        maxWidth: '80%',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 18,
        padding: 8,
        paddingRight: 25,
        paddingLeft: 15,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 20,
    }
})

export default MessageScreen;
