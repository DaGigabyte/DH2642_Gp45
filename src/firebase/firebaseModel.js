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
    onSnapshot
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
            console.debug("signInACB: sign in with pop up successful\n", "user: ", user);
        })
        .catch((error) => {
            console.error("signInACB: sign in with pop up error", error.code, error.message);
        });
}

function signOutACB() {
    signOut(auth)
        .then(() => {
            console.debug("signOutACB: sign out successful");
        })
        .catch((error) => {
            console.error("signOutACB: sign out error", error.code, error.message);
        });
}

function connectToFirestore(model) {
    model.userReady = false;
    function watchUserCB() {
        return [model.user.data.fullName, model.user.data.displayName, model.user.data.bio, model.user.data.profilePicture, model.user.data.follows, model.user.data.followedBy];
    }
    function callSaveUserToFirestoreCB() {
        console.debug("callSaveUserToFirestoreCB: model.user changed, calling callSaveUserToFirestoreCB if user is signed in");
        if (model.user.uid) // User is signed in
            saveUserToFirestore(model.user, model.uuid);
    }
    function onAuthStateChangedCB(userAuthObj) {
        console.debug("onAuthStateChangedCB: new userAuthObj: ", userAuthObj);
        let unsubscribeUser = () => {}; // dummy function to prevent error in case sign out without calling onSnapshot
        if (userAuthObj?.uid) { // Signed in
            console.debug("onAuthStateChangedCB: user signed in");
            const userObj = {...model.user, uid: userAuthObj.uid};
            const docRef = doc(db, "Users", userAuthObj.uid);
            unsubscribeUser = onSnapshot(docRef, onSnapshotChangeACB);
            function onSnapshotChangeACB(docSnapshot) {
                model.userReady = false;
                if (docSnapshot.exists()) { // Document for this user exists on Firestore
                    console.debug("onSnapshotChangeACB: User exists on Firestore, reading data");
                    const docSnapshotdata = docSnapshot.data();
                    if (docSnapshotdata.uuid != model.uuid) { // Document was not written by this device, need to update MobX store
                        console.debug("onSnapshotChangeACB: Document was not written by this device, updating MobX store");
                        userObj.data = docSnapshotdata;
                        model.setUser(userObj);
                    } else 
                        console.debug("onSnapshotChangeACB: Document was written by this device, no need to update MobX store");
                } else { // Document for this user does not exist on Firestore
                    console.debug("onSnapshotChangeACB: Creating new user document on Firestore");
                    userObj.data = { fullName: "", displayName: userAuthObj.displayName, profilePicture: userAuthObj.photoURL, follows: [], followedBy: [] };
                    model.setUser(userObj);
                }
                model.userReady = true;
            }        
        } else { // Signed out
            console.debug("onAuthStateChangedCB: user signed out");
            model.user.setUid(null);
            model.user.setData({});
            unsubscribeUser(); // Stop listening to the user document
        }
    }
    onAuthStateChanged(auth, onAuthStateChangedCB);
    reaction(watchUserCB, callSaveUserToFirestoreCB);
}

function readUserFromFirestore(uid) {
    if (!uid) {
        throw new Error("uid is falsy");
    }
    const docRef = doc(db, "Users", uid);
    return getDoc(docRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) { // Document for this user exists on Firestore
                console.debug("readUserFromFirestore: User exists on Firestore, reading data");
                return docSnapshot.data();
            } else { // Document for this user does not exist on Firestore
                console.debug("readUserFromFirestore: No such user!");
                return null;
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
            throw new Error("Error getting document");
        });
}

function saveUserToFirestore(userObj, uuid) {
    const userDoc = doc(db, "Users", userObj.uid);
    setDoc(userDoc, {...userObj.data, uuid: uuid});
}

export { connectToFirestore, signInACB, signOutACB };
