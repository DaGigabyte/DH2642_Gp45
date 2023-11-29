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

const app = initializeApp(config);
const auth = getAuth(app);
// const db = getFirestore(app);

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

function loginOrOutACB(user) {
    // demo render:
    //   appDiv.innerHTML="user "+(user?" ID "+user.uid:user);
    //   model.user = user
    // model.ready=false
    // readFromFirebase
}

function connectToFirebase(model) {
    // TODO
    // const now = new Date();
    // const readableTimestamp = now.toISOString();
    // set(ref(db, PATH+"/test"), {time: readableTimestamp});
    console.log("set ref");
    model.ready = false;
    // model.ready = false;
    function propsToWatchCB() {
        return [model.user];
    }
    function callSaveToFirebaseCB() {
        // saveToFirebase(model);
    }
    // readFromFirebase(model);
    onAuthStateChanged(auth, (user) => (model.user.uid = user.uid));
    // reaction(propsToWatchCB, callSaveToFirebaseCB);
}

// readFromFirebase:
// -----------------
// do nothing if model.user falsy (maybe wipe the model data)
// otherwise read from "path/"+model.user.uid
// manage model.ready as usual
function readFromFirebase(model) {
    // TODO
    // model.ready = false;
    // get(ref(db, PATH))
    // .then(function snapshotToModelACB(snapshot) {
    //     const data = snapshot.val();
    //     return persistenceToModel(data, model);
    // })
    // .then(function setDishesACB(dishes) {
    //     model.dishes = dishes;
    //     model.ready = true;
    // });
    if (!model.uid) {
        return;
    }
    const docRef = doc(db, "Users", model.user.uid);
    // const docSnap = await getDoc(docRef);
    getDoc(docRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                console.log("User data:", docSnapshot.data());
                model = { ...model, user: { uid:model.user.uid, data: { ...docSnapshot.data() } } };
                model.ready = true;
            } else {
                console.log("No such user!");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
        });
    // const userCollectionRef = collection(db, 'Users');
    // const q = query(userCollectionRef, where("uid", "==", model.user.uid));
}

// saveToFirebase:
// -----------------
// do nothing if model.user falsy
// otherwise write to the same path as above,
// depending on model.ready as usual
function saveUserToFirebase(user) {
    const userDoc = doc(db, "Users", user.uid);
    setDoc(userDoc, user.data);
}

// UI:
// - model.user undefined: show suspense because firebase not initialized yet
// - model.user null: shouw "sign in" UI (a button/link that triggers signInWithPopup, see below)
// - model.user truthy: should the App (based on model.ready!) with the "sign out" UI

export { connectToFirebase, signInACB, signOutACB };
