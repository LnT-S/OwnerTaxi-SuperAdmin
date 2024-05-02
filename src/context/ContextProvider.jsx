import React, { createContext, useReducer, Dispatch, useContext, useState } from 'react'
export const ProfileContext = createContext()

export const ContextProvider = ({ children }) => {

    const profileData = {
        refresh:false,
        userName: '',
        token: '',
        countryCode: 10,
        phone: 1000000000,
        email: '',
        avatar : '',
    } 
    const profileReducer = (state = profileData, action) => {
        switch (action.type) {
            case 'REFRESH':
                return { ...state, refresh: action.payload }
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
            case 'AVATAR':
                return { ...state, avatar: action.payload }
            default:
                return state
        }
    }
    const [profileState, profileDispatch] = useReducer(profileReducer, profileData)

    return (
        <ProfileContext.Provider value={{ profileState, profileDispatch }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if(context===undefined){
        throw new Error("OUT OF BOUNDS FOR CONTEXT")
    }
    return context
}
