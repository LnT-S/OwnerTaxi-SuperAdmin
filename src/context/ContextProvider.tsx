import React, { createContext, useReducer , Dispatch, useContext } from 'react'
import type { PropsWithChildren } from 'react'

type ProfileDataType = {
    userName: String,
    token: String,
    phone: Number,
    email: String,
    countryCode: Number,
}
type ActionType = {
    type: String,
    payload: any
}

const profileData: ProfileDataType = {
    userName: '',
    token: '',
    countryCode: 10,
    phone: 1000000000,
    email: ''
}
const profileReducer = (state: ProfileDataType, action: ActionType): ProfileDataType => {
    switch (action.type) {
        case 'USERNAME':
            return { ...state, userName: action.payload }
        case 'TOKEN':
            return { ...state, token: action.payload }
        case 'CC':
            return { ...state, countryCode: action.payload }
        case 'PHONE':
            return { ...state, phone: action.payload }
        case 'EMAIL':
            return { ...state, email: action.payload }
        default:
            return state
    }
}
export const ProfileContext =  createContext<{ profileState: ProfileDataType; profileDispatch: Dispatch<ActionType> } | undefined>(undefined)
export const ContextProvider = ({ children }: PropsWithChildren) => {


    const [profileState, profileDispatch] = useReducer(profileReducer, profileData)

    return (
        <ProfileContext.Provider value={{ profileState , profileDispatch }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = ()=>{
    const context = useContext(ProfileContext);
    return context
}
