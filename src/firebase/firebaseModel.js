import { initializeApp } from "firebase/app";
import config from "./firebaseConfig.js";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
} from "firebase/firestore";
import { reaction } from "mobx";

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

function signInACB() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result); // This gives you a Google Access Token. You can use it to access the Google API.
            const token = credential.accessToken;
            const user = result.user; // The signed-in user info.
            console.debug("sign in with pop up successful");
            console.debug("user: ", user);
        })
        .catch((error) => {
            console.error("sign in with pop up error", error.code, error.message);
        });
}

function signOutACB() {
    signOut(auth)
        .then(() => {
            console.debug("sign out successful");
        })
        .catch((error) => {
            console.error("sign out error", error.code, error.message);
        });
}

function connectToFirebase(model) {
    model.userReady = false;
    function watchUserCB() {
        return [model.user];
    }
    function callSaveUserToFirebaseCB() {
        console.debug("model.user changed, calling saveUserToFirebase if model.userReady");
        if (model.userReady) {
            saveUserToFirebase(model.user);
            console.debug("saved user to firebase since model.userReady");
        }
    }
    function onAuthStateChangedCB(userAuthObj) {
        console.debug("new userAuthObj: ", userAuthObj);
        if (userAuthObj?.uid) { // Signed in
            const userObj = {uid: userAuthObj.uid};
            readUserFromFirebase(userAuthObj.uid)
            .then((userObjFromFirebase)=>{
                if (userObjFromFirebase) { // Document for this user exists on Firestore
                    userObj.data = { ...userObjFromFirebase };
                } else { // Document for this user does not exist on Firestore
                    console.debug("Creating new user document on Firestore");
                    userObj.data = { fullName: "", displayName: userAuthObj.displayName, profilePicture: userAuthObj.photoURL, follows: [], followedBy: [] };
                    saveUserToFirebase(userObj);
                }
                model.setUser(userObj);
                model.userReady = true;
            })
            .catch((error)=>console.error(error));            
        } else { // Signed out
            delete model.user; // Now user is falsy
        }
    }
    onAuthStateChanged(auth, onAuthStateChangedCB);
    // reaction(watchUserCB, callSaveUserToFirebaseCB);
}

function readUserFromFirebase(uid) {
    if (!uid) {
        throw new Error("uid is falsy");
    }
    const docRef = doc(db, "Users", uid);
    return getDoc(docRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) { // Document for this user exists on Firestore
                console.debug("User exists on Firestore, reading data");
                return docSnapshot.data();
            } else { // Document for this user does not exist on Firestore
                console.debug("No such user!");
                return null;
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
            throw new Error("Error getting document");
        });
}

function saveUserToFirebase(userObj) {
    const userDoc = doc(db, "Users", userObj.uid);
    setDoc(userDoc, userObj.data);
}

export { connectToFirebase, signInACB, signOutACB, saveUserToFirebase };
