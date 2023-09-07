import React, { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../../firebase.config';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios';
// import UseAxiosSecure from '../Hooks/UseAxiosSecure';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [authLoading, setAuthLoading] = useState(false)
    // const { axiosSecure } = UseAxiosSecure()

    // signin by email func
    const signInByEmailFunc = () => {
        setAuthLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // signin by github func
    const signInByGithubFunc = () => {
        setAuthLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    // signUpByEmailPass
    const signUpByEmailPass = (email, password) => {
        setAuthLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //   signinByEmailPass
    const signinByEmailPass = (email, password) => {
        setAuthLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // profileUpdateFunc
    const profileUpdateFunc = (name, photo) => {
        setAuthLoading(true);
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      };

    // signout func
    const signoutFunc = () => {
        setAuthLoading(true)
        return signOut(auth)
    }

    const myAuth = {
        user, setUser, authLoading, setAuthLoading, signInByEmailFunc, signInByGithubFunc, signUpByEmailPass, signinByEmailPass, profileUpdateFunc, signoutFunc
    }

    useEffect(() => {
        setAuthLoading(true)

        const authMonitoring = onAuthStateChanged(auth, (currUser) => {
            if (currUser) {
                setAuthLoading(false)
                setUser(currUser)
                axios.post(`http://localhost:3000/create-jwt?email=${currUser.email}`)
                    .then(res => { localStorage.setItem('access_token', JSON.stringify(res.data.result)); })
                    .catch(e => console.log(e.message))
            } else {
                setAuthLoading(false)
                localStorage.removeItem('access_token',)
            }
        })

        return () => {
            authMonitoring()
        }

    }, [])


    return (
        <AuthContext.Provider value={myAuth}>{children}</AuthContext.Provider>
    );
};


const useAuth = () => {
    const { user, setUser, authLoading, setAuthLoading, signInByEmailFunc, signInByGithubFunc, signUpByEmailPass, signinByEmailPass, profileUpdateFunc, signoutFunc } = useContext(AuthContext)

    return { user, setUser, authLoading, setAuthLoading, signInByEmailFunc, signInByGithubFunc, signUpByEmailPass, signinByEmailPass, profileUpdateFunc, signoutFunc }
}
export { AuthProvider, useAuth }