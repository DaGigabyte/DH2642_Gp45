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

// const appDiv = document.getElementById('app');
// appDiv.innerHTML= auth.currentUser;  // should be undefined

// To enable authentication in your firebase project, go to "all products", choose Authentication,
/// then add a provider, choose the Google provider, enable it with its tickbox
// documentation: https://firebase.google.com/docs/auth/web/google-signin
// look for other providers!
const provider = new GoogleAuthProvider();

// demo "sign in/out" UI, just a fixed button for now.
// document.getElementById("authButton")
//    .addEventListener("click", function clickACB(){
//         auth.currentUser? signOut(auth) : signInWithPopup(auth, provider)
//    });
function signInACB() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            console.log("sign in successful");
        })
        .catch((error) => {
            console.error("sign in error");
        });
}

function signOutACB() {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("sign out successful");
        })
        .catch((error) => {
            // An error happened.
            console.error("sign out error");
        });
}

// Your events from the authentication!
// Set this up in connectToFirebase, where you have access to the model
// replace readFromFirebase: we need to check if we have a user first!
// onAuthStateChanged(auth, loginOrOutACB);

function connectToFirebase(model) {
    // TODO
    // const now = new Date();
    // const readableTimestamp = now.toISOString();
    // set(ref(db, PATH+"/test"), {time: readableTimestamp});
    model.ready = false;
    // model.ready = false;
    function propsToWatchCB() {
        return [model.user.data];
    }
    function callSaveToFirebaseCB() {
        saveUserToFirebase(model.user);
    }
    // readFromFirebase(model);
    function onAuthStateChangedCB(userAuthObj) {
        if (userAuthObj?.uid) {
            model.user.setUid(userAuthObj.uid);
            if (model.user.uid) {
                readUserFromFirebase(model.user.uid)
                .then((userObjFromFirebase)=>{
                    if (userObjFromFirebase) {
                        model.user.setData({ ...userObjFromFirebase });
                        model.ready = true;
                    } else {
                        console.error("userObjFromFirebase should never cause an error here, it should instead be caught at readUserFromFirebase");
                    }
                })
                .catch((error)=>console.error(error));
            }
        }
    }
    onAuthStateChanged(auth, onAuthStateChangedCB);
    reaction(propsToWatchCB, callSaveToFirebaseCB);
}

// readFromFirebase:
// -----------------
// do nothing if model.user falsy (maybe wipe the model data)
// otherwise read from "path/"+model.user.uid
// manage model.ready as usual
// 
function readUserFromFirebase(uid) {
    if (!uid) {
        throw new Error("uid is falsy");
    }
    const docRef = doc(db, "Users", uid);
    // const docSnap = await getDoc(docRef);
    return getDoc(docRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                return docSnapshot.data();
            } else {
                console.log("No such user!");
                throw new Error("User ", uid, " does not exist on Firestore.");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
            throw new Error("Error getting document");
        });
    // const userCollectionRef = collection(db, 'Users');
    // const q = query(userCollectionRef, where("uid", "==", model.user.uid));
}

// saveToFirebase:
// -----------------
// do nothing if model.user falsy
// otherwise write to the same path as above,
// depending on model.ready as usual
function saveUserToFirebase(userObj) {
    const userDoc = doc(db, "Users", userObj.uid);
    setDoc(userDoc, userObj.data);
}

// UI:
// - model.user undefined: show suspense because firebase not initialized yet
// - model.user null: shouw "sign in" UI (a button/link that triggers signInWithPopup, see below)
// - model.user truthy: should the App (based on model.ready!) with the "sign out" UI

export { connectToFirebase, signInACB, signOutACB, saveUserToFirebase };
