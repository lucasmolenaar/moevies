import React, {createContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    deleteUser,
    updateProfile,
    updateEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
    } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const updateUserAccount = (username) => {
        return updateProfile(auth.currentUser, {
            displayName: username,
        })
    }

    const updateUserEmail = (email) => {
        return updateEmail(auth.currentUser, email)
    }

    const updateUserPassword = (password) => {
        return updatePassword(auth.currentUser, password);
    }

    const reauthenticateUser = (password) => {
        const credentials = EmailAuthProvider.credential(auth.currentUser.email, password)
        return reauthenticateWithCredential(auth.currentUser, credentials);

    }

    const deleteUserAccount = () => {
        return deleteUser(auth.currentUser);
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })

        return () => unsubscribe();
    }, [])

    //CONTEXT DATA
    const data = {
        user,
        createUser,
        login,
        logout,
        deleteUserAccount,
        updateUserAccount,
        updateUserEmail,
        updateUserPassword,
        reauthenticateUser,
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={ data }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
