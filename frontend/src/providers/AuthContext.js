import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
import axios from 'axios';
import { getFirebaseIdToken } from '../util/firebaseFunctions';
import { apiURL } from '../util/apiURL';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    
    const API = apiURL();

    const updateUser = async (user) => {
        try {
            if(user) {
                const { uid } = user;
                const lastLogIn = user.metadata.lastLogin;
                let res = await axios.get(API + "/api/users/" + uid);
                setCurrentUser({...res.data.user, lastLogIn});
                getFirebaseIdToken().then(token => {
                    setToken(token);
                    setLoading(false);
                })
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        } catch(error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(updateUser)
        return unsubscribe;
    }, [])

    if(loading) return (<div>Loading...</div>)
    return (
        <AuthContext.Provider value={{currentUser, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;