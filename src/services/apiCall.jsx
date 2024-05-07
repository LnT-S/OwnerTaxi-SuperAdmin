import axios from "axios";
import server from './server.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOtp = async (phoneNo) => {
    const URL = `${server.server}/authentication/get-otp`
    console.log('URL ', URL, phoneNo)

    // Authorization: auth_token ? `Bearer ${auth_token}` : ''
    try {
        let res = await fetch(URL, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phoneNo, type : 'superAdmin' })

        })
        let data = await res.json()
        console.log('DATA RECIVED ', data)
        return { status: res.status, data: data }
    } catch (error) {
        console.log('GET_OTP ERROR', error)
    }
}
export const verifyOtp = async (phone, otp) => {
    const URL = `${server.server}/authentication/verify-otp`
    console.log('URL ', URL, otp)

    // Authorization: auth_token ? `Bearer ${auth_token}` : ''
    let res = await fetch(URL, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNo: phone, otp: otp })

    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
export const deleteAccount = async () => {
    const URL = `${server.server}/authentication/delete-account`
    console.log('URL ', URL)
    let auth_token = await AsyncStorage.getItem('token')

    let res = await fetch(URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            'Content-Type': 'application/json',
        }
    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
export const addDocumentList = async (document) => {
    const URL = `${server.server}/superadmin/add-document-to-list`
    console.log('URL ', URL)
    let auth_token = await AsyncStorage.getItem('token')

    let res = await fetch(URL, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(document)
    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
