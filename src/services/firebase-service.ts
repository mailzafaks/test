import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

const config = {
    apiKey: "AIzaSyB_sk4heUtB6d_vYcbUWPiOrWBp9cVHObI",
    authDomain: "chat-app-19a06.firebaseapp.com",
    projectId: "chat-app-19a06",
    storageBucket: "chat-app-19a06.appspot.com",
    messagingSenderId: "77819111907",
    appId: "1:77819111907:web:e8240fcd930b69b19098d6",
    measurementId: "G-8KML8N82J7"

}

firebase.initializeApp(config);


export async function loginUser(email: string, password: string) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        return true;
    }catch (e) {
        return false;
    }
}

export async function registerUser(userData:any) {
    const userRef = firestore.collection('users');

    try {
        await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(async (res:any)=>{
            await userRef.add({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                userId: res.user.uid
            });
            console.log("RESULT :::: ", res)
            return true;
        }).catch(e =>{
            console.log("ERROR :::: ", e.message)
            return false;
        });
    }catch (e) {
        console.log("ERROR 2 :::: ", e.message);
        return false;
    }
}


export async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    }catch (e) {
        return false;
    }
}

const storage = firebase.storage();
export const storageRef = storage.ref();

export const auth = firebase.auth();
export const firestore = firebase.firestore();


