import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

/**
 * Initializes the Firebase app with the provided configuration object.
 * @param {Object} config - The configuration object containing the Firebase API key, authentication domain,
 * database URL, project ID, storage bucket, messaging sender ID, app ID, and measurement ID.
 * @returns None
 */
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

firebase.initializeApp(config);

/**
 * Creates a user profile document in the Firestore database for the given user authentication object.
 * If the user authentication object is null or undefined, the function returns immediately.
 * @param {Object} userAuth - The user authentication object.
 * @param {Object} additionalData - Additional data to be stored in the user profile document.
 * @returns {Promise<DocumentReference>} A promise that resolves to the user profile document reference.
 */
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

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

/**
 * Adds a collection of documents to Firestore using a batch write operation.
 * @param {string} collectionKey - The key of the collection to add the documents to.
 * @param {Array<Object>} objectsToAdd - An array of objects representing the documents to add.
 * @returns {Promise<void>} A promise that resolves when the batch write operation is complete.
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

/**
 * The function `convertCollectionsSnapshotToMap` takes a collection of documents and converts it into
 * a map where the keys are the titles of the documents in lowercase and the values are the documents
 * themselves.
 * @param collections - The `collections` parameter is an array of documents returned from a Firestore
 * query. Each document represents a collection in the database.
 * @returns an object that contains the transformed collection data. The keys of the object are the
 * titles of the collections in lowercase, and the values are the corresponding collection objects.
 */
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    
    return transformedCollection.reduce((accumulator , collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/**
 * Signs in the user with Google using Firebase authentication.
 * @returns A promise that resolves with the user's authentication credentials.
 */
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;