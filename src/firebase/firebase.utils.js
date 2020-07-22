import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCgFr3xJs6jv2njH4zOiiUF4ogM3ok7arY",
    authDomain: "crown-fashion-1fb4e.firebaseapp.com",
    databaseURL: "https://crown-fashion-1fb4e.firebaseio.com",
    projectId: "crown-fashion-1fb4e",
    storageBucket: "crown-fashion-1fb4e.appspot.com",
    messagingSenderId: "593217939779",
    appId: "1:593217939779:web:b295e5026cf0133d9627f6",
    measurementId: "G-SFTV2MKZEZ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;