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
    addDoc,
    getDocs,
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    onSnapshot
} from "firebase/firestore";
import { reaction } from "mobx";

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
let unsubscribeOnSnapshotUser = () => {}; // dummy function to prevent error in case sign out without calling onSnapshot

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
        return [model.user.data.fullName, model.user.data.displayName, model.user.data.displayNameInsensitive, model.user.data.bio, model.user.data.profilePicture, model.user.data.follows, model.user.data.followedBy];
    }
    function callSaveUserToFirestoreCB() {
        console.debug("callSaveUserToFirestoreCB: model.user changed, calling callSaveUserToFirestoreCB if user is signed in");
        if (model.user.uid) { // User is signed in
            console.debug("callSaveUserToFirestoreCB: User is signed in");
            if (model.userReady) { // User data has been read from Firestore, i.e. not from Firestore
                console.debug("callSaveUserToFirestoreCB: Changes not come from Firestore, saving to Firestore");
                saveUserToFirestore(model.user, model.uuid);
            } else { // User data has not been read from Firestore, i.e. from Firestore
                console.debug("callSaveUserToFirestoreCB: Changes come from Firestore, not saving to Firestore to prevent infinite loop");
            }
        } else { // User is not signed in
            console.debug("callSaveUserToFirestoreCB: User is not signed in, not saving to Firestore");
        }
    }
    function onAuthStateChangedCB(userAuthObj) {
        console.debug("onAuthStateChangedCB: new userAuthObj: ", userAuthObj);
        if (userAuthObj?.uid) { // Signed in
            console.debug("onAuthStateChangedCB: user signed in");
            const userObj = {...model.user, uid: userAuthObj.uid};
            const docRef = doc(db, "Users", userAuthObj.uid);
            unsubscribeOnSnapshotUser = onSnapshot(docRef, onSnapshotChangeACB);
            function onSnapshotChangeACB(docSnapshot) {
                model.userReady = false;
                if (docSnapshot.exists()) { // Document for this user exists on Firestore
                    console.debug("onSnapshotChangeACB: User exists on Firestore, reading data");
                    const docSnapshotdata = docSnapshot.data();
                    if (docSnapshotdata.uuid != model.uuid) { // Document was not written by this device, need to update MobX store
                        console.debug("onSnapshotChangeACB: Document was not written by this device, updating MobX store");
                        userObj.data = docSnapshotdata;
                        model.setUser(userObj); // Update MobX store based on Firestore document
                        model.userReady = true;
                    } else 
                        console.debug("onSnapshotChangeACB: Document was written by this device, no need to update MobX store");
                } else { // Document for this user does not exist on Firestore
                    console.debug("onSnapshotChangeACB: Creating new user document on MobX store");
                    model.userReady = true;
                    userObj.data = { fullName: "", displayName: userAuthObj.displayName, displayNameInsensitive: userAuthObj.displayName.toLowerCase(), profilePicture: userAuthObj.photoURL, follows: [], followedBy: [] };
                    model.setUser(userObj); // Create new user document on MobX store based on userAuthObj
                }
            }        
        } else { // Signed out
            console.debug("onAuthStateChangedCB: user signed out");
            model.user.setUid(null);
            model.user.setData({});
            unsubscribeOnSnapshotUser(); // Stop listening to the user document
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

async function savePostToFirestore(postObj, userUid) {
    const postObjWithMetadata = {...postObj, createdBy: userUid, createdAt: new Date(), modifiedAt: new Date(), likedBy: [], dislikedBy: [], likes: 0};
    const docRef = await addDoc(collection(db, "Posts"), postObjWithMetadata);
    console.debug("savePostToFirestore: Document written with ID: ", docRef.id);
}

async function queryUsername(username) {
    const q = query(
        collection(db, "Users"), 
        where("displayNameInsensitive", ">=", username.toLowerCase()), 
        where("displayNameInsensitive", "<=", username + "\uf8ff")
    );
    return getDocs(q)
    .then((querySnapshot) => { // querySnapshot is an array of documents
        const users = [];
        querySnapshot.forEach((doc) => {
            const userDocId = doc.id;
            const userData = doc.data();
            users.push({
                uid: userDocId,
                displayName: userData.displayName,
                profilePicture: userData.profilePicture
            });
        });
        console.debug("queryUsername: Current users: ", users);
        return users; // return posts to caller
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

async function queryPostByUserUid(userUid) {
    const q = query(collection(db, "Posts"), where("createdBy", "==", userUid));
    return getDocs(q)
    .then((querySnapshot) => { // querySnapshot is an array of documents
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        console.debug("queryPostByUserUid: Current posts: ", posts);
        return posts; // return posts to caller
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

async function queryNewestPosts(amountOfPosts) {
    const q = query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), limit(amountOfPosts));
    const querySnapshot = await getDocs(q);
    const posts = [];
    for (const doc of querySnapshot.docs) {
        const postData = doc.data();
        try {
            const user = await readUserFromFirestore(postData.createdBy);
            posts.push({ id: doc.id, user: user, ...postData });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    console.debug("queryNewestPosts: Current posts: ", posts);
    return posts; // return posts to caller
}

export { connectToFirestore, signInACB, signOutACB, readUserFromFirestore, savePostToFirestore, queryPostByUserUid, queryNewestPosts, queryUsername };