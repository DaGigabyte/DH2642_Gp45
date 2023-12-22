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
    deleteDoc,
    getDocs,
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    onSnapshot,
    updateDoc
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
        })
        .catch((error) => {
        });
}

function signOutACB() {
    signOut(auth)
        .then(() => {
        })
        .catch((error) => {
        });
}

function connectToFirestore(model) {
    model.setUserReady(false);
    function watchUserCB() {
        return [model.user.data.fullName, model.user.data.displayName, model.user.data.displayNameInsensitive, model.user.data.bio, model.user.data.profilePicture, model.user.data.follows, model.user.data.followedBy];
    }
    function callSaveUserToFirestoreCB() {
        if (model.user.uid) { // User is signed in
            if (model.userReady) { // User data has been read from Firestore, i.e. not from Firestore
                saveUserToFirestore(model.user, model.uuid);
            } else { // User data has not been read from Firestore, i.e. from Firestore
            }
        } else { // User is not signed in
        }
    }
    function onAuthStateChangedCB(userAuthObj) {
        if (userAuthObj?.uid) { // Signed in
            const userObj = {...model.user, uid: userAuthObj.uid};
            const docRef = doc(db, "Users", userAuthObj.uid);
            unsubscribeOnSnapshotUser = onSnapshot(docRef, onSnapshotChangeACB);
            function onSnapshotChangeACB(docSnapshot) {
                model.setUserReady(false);
                if (docSnapshot.exists()) { // Document for this user exists on Firestore
                    const docSnapshotdata = docSnapshot.data();
                    if (docSnapshotdata.uuid != model.uuid) { // Document was not written by this device, need to update MobX store
                        userObj.data = docSnapshotdata;
                        model.setUser(userObj); // Update MobX store based on Firestore document
                        model.setUserReady(true);
                    }
                } else { // Document for this user does not exist on Firestore
                    model.setUserReady(true);
                    userObj.data = { fullName: "", displayName: userAuthObj.displayName, displayNameInsensitive: userAuthObj.displayName.toLowerCase(), profilePicture: userAuthObj.photoURL, follows: [], followedBy: [] };
                    model.setUser(userObj); // Create new user document on MobX store based on userAuthObj
                }
            }        
        } else { // Signed out
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
                return docSnapshot.data();
            } else { // Document for this user does not exist on Firestore
                return null;
            }
        })
        .catch((error) => {
            throw new Error("Error getting document");
        });
}

function saveUserToFirestore(userObj, uuid) {
    const userDoc = doc(db, "Users", userObj.uid);
    setDoc(userDoc, {...userObj.data, uuid: uuid});
}

function profileDataListener(uid, onUpdate) {
    if (!uid) {
        throw new Error("uid is falsy");
    }
    // Subscribe to real-time updates using onSnapshot
    return onSnapshot(doc(db, "Users", uid), (doc) => {
        if (doc.exists()) {
            onUpdate(doc.data(), uid);
        }
    });
}

async function savePostToFirestore(postObj, userUid) {
    const postObjWithMetadata = {...postObj, createdBy: userUid, createdAt: new Date(), modifiedAt: new Date(), likedBy: [], dislikedBy: [], likes: 0};
    try {
        const docRef = await addDoc(collection(db, "Posts"), postObjWithMetadata);
        return docRef;
    } catch (error) {
        throw new Error("Error adding document");
    }
}

async function removePostFromFirestore(postId) {
    const docRef = doc(db, "Posts", postId);
    deleteDoc(docRef)
    .then(() => {
    })
    .catch((error) => {
    });
}

function postDataListener(postId, onUpdate) {
    try {
        if (!postId) {
            throw new Error("postId is falsy");
        }
        const docRef = doc(db, "Posts", postId);

        return onSnapshot(docRef, async (docSnapshot) => {
            if (docSnapshot.exists()) {
                const postData = docSnapshot.data();
                try {
                    const user = await readUserFromFirestore(postData.createdBy);
                    const postDetails = { id: docSnapshot.id, user, ...postData };
                    onUpdate(postDetails);
                } catch (error) {
                }
            } else {
            }
        });
    } catch (error) {
    }
}

async function likePostFirestore(uid, postId) {
    try {
        const path = "Posts/" + postId;
        const docRef = doc(db, path);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const { likedBy, dislikedBy, likes } = docSnapshot.data();

            const updatedDislikedBy = dislikedBy.filter((dislikeUid) => dislikeUid !== uid);
            const updatedLikedBy = likedBy.includes(uid) ? likedBy.filter((likeUid) => likeUid !== uid) : [...likedBy, uid];
            const updatedLikes = likedBy.includes(uid) ? likes - 1 : likes + 1;

            await updateDoc(docRef, { likedBy: updatedLikedBy, dislikedBy: updatedDislikedBy, likes: updatedLikes });
        } else {
        }
    } catch (error) {
    }
}

async function dislikePostFirestore(uid, postId) {
    try {
        const path = "Posts/" + postId;
        const docRef = doc(db, path);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const { likedBy, dislikedBy, likes } = docSnapshot.data();

            const updatedDislikedBy = dislikedBy.includes(uid) ? dislikedBy.filter((dislikeUid) => dislikeUid !== uid) : [...dislikedBy, uid];
            const updatedLikedBy = likedBy.filter((likeUid) => likeUid !== uid);
            const updatedLikes = likedBy.includes(uid) ? likes - 1 : likes;

            await updateDoc(docRef, { likedBy: updatedLikedBy, dislikedBy: updatedDislikedBy, likes: updatedLikes });
        } else {
        }
    } catch (error) {
    }
}

async function followUserFirestore(uidFollowed, uidFollower) {
    try {
        const followedPath = "Users/" + uidFollowed;
        const followerPath = "Users/" + uidFollower;

        // Update the follower user's follows array
        const followerDocRef = doc(db, followerPath);
        const followerDocSnapshot = await getDoc(followerDocRef);

        if (followerDocSnapshot.exists()) {
            const { follows } = followerDocSnapshot.data();
            const updatedFollows = follows.includes(uidFollowed) ? follows : [...follows, uidFollowed];
            await updateDoc(followerDocRef, { follows: updatedFollows });
        } else {
        }

        // Update the followed user's followedBy array
        const followedDocRef = doc(db, followedPath);
        const followedDocSnapshot = await getDoc(followedDocRef);

        if (followedDocSnapshot.exists()) {
            const { followedBy } = followedDocSnapshot.data();
            const updatedFollowedBy = followedBy.includes(uidFollower) ? followedBy : [...followedBy, uidFollower];
            await updateDoc(followedDocRef, { followedBy: updatedFollowedBy });
        } else {
        }
    } catch (error) {
    }
}

async function unfollowUserFirestore(uidFollowed, uidUnfollower) {
    try {
        const unfollowerPath = "Users/" + uidUnfollower;
        const followedPath = "Users/" + uidFollowed;
        // Update follows array of uidUnfollower
        const docRefUnfollower = doc(db, unfollowerPath);
        const docSnapshotUnfollower = await getDoc(docRefUnfollower);

        if (docSnapshotUnfollower.exists()) {
            const { follows } = docSnapshotUnfollower.data();
            const updatedFollows = follows.filter((uid) => uid !== uidFollowed);
            await updateDoc(docRefUnfollower, { follows: updatedFollows });
        } else {
            return;
        }

        // Update followedBy array of uidFollowed
        const docRefFollowed = doc(db, followedPath);
        const docSnapshotFollowed = await getDoc(docRefFollowed);

        if (docSnapshotFollowed.exists()) {
            const { followedBy } = docSnapshotFollowed.data();
            const updatedFollowedBy = followedBy.filter((uidFollower) => uidFollower !== uidUnfollower);
            await updateDoc(docRefFollowed, { followedBy: updatedFollowedBy });
        } else {
        }
    } catch (error) {
    }
}

async function saveCommentToFireStore(commentObj, postId) {
    const path = "Posts/" + postId + "/Comments";
    try {
        const docRef = await addDoc(collection(db, path), commentObj);
        return docRef;
    } catch (error) {
        throw new Error("Error adding document");
    }
}

async function removeCommentFromFirestore(postId, commentId) {
    const docRef = doc(db, "Posts", postId, "Comments", commentId);
    deleteDoc(docRef)
    .then(() => {
        return;
    })
    .catch((error) => {
        throw new Error("Error removing comment");
    });
}

async function queryUsername(username) {
    const q = query(
        collection(db, "Users"), 
        where("displayNameInsensitive", ">=", username.toLowerCase()), 
        where("displayNameInsensitive", "<=", username.toLowerCase() + "\uf8ff")
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
        return users; // return users to caller
    })
    .catch((error) => {
    });
}

function postCommentsDataListener(postId, onUpdate) {
    const q = query(
        collection(db, "Posts", postId, "Comments"), 
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((doc) => {
            const commentData = doc.data();
            comments.push({ id: doc.id, ...commentData});
        });
        onUpdate(comments); 
    }, (error) => {
    });
}

function userPostsListener(userUid, onUpdate) {
    const q = query(
        collection(db, "Posts"), 
        where("createdBy", "==", userUid),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach(async (doc) => {
            const postData = doc.data();
            posts.push({ id: doc.id, ...postData});
        });
        onUpdate(posts);
    });
}
/**
 * Return an array of n more posts after the last post in the array of posts returned by the previous call to this function.
 * @param {Number} nMorePosts 
 * @returns {Array} Array of posts in the form { id: String, user: Object, ...postData }
 */
async function queryMoreNewestPosts(nMorePosts) {
    const q = queryMoreNewestPosts.lastVisiblePost ? query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), startAfter(queryMoreNewestPosts.lastVisiblePost), limit(nMorePosts)) : query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), limit(nMorePosts));
    const querySnapshot = await getDocs(q);
    const posts = [];
    for (const doc of querySnapshot.docs) {
        const postData = doc.data();
        try {
            const user = await readUserFromFirestore(postData.createdBy);
            posts.push({ id: doc.id, user: user, ...postData });
        } catch (error) {
        }
    }
    queryMoreNewestPosts.lastVisiblePost = querySnapshot.docs[querySnapshot.docs.length-1];
    return posts; // return posts to caller
}

async function queryTopPosts(amountOfPosts) {
    const q = query(collection(db, 'Posts'), orderBy('likes', 'desc'), limit(amountOfPosts));
    const querySnapshot = await getDocs(q);
    const posts = [];
    for (const doc of querySnapshot.docs) {
        const postData = doc.data();
        try {
            const user = await readUserFromFirestore(postData.createdBy);
            posts.push({ id: doc.id, user: user, ...postData });
        } catch (error) {
        }
    }
    return posts; // return posts to caller
}

async function queryFavoritePosts(amountOfPosts, uid) {

    // Fetch posts liked by the user logged in
    const q = query(
        collection(db, 'Posts'), 
        orderBy('createdAt', 'desc'), 
        where('likedBy', 'array-contains', uid),
        limit(amountOfPosts)
    );
    const querySnapshot = await getDocs(q);
    const posts = [];

    for (const doc of querySnapshot.docs) {
        const postData = doc.data();
        try {
            const user = await readUserFromFirestore(postData.createdBy);
            posts.push({ id: doc.id, user: user, ...postData });
        } catch (error) {
        }
    }
    return posts;
}

async function queryFollowingFeed(amountOfPosts, uid) {

    let followsArray = [];

    // Get the 'follows' array of the user logged in
    try {
        const user = await readUserFromFirestore(uid);
        followsArray = [...user.follows];
    } catch (error) {
    }

    // If user is not following anyone return an empty array
    if (followsArray.length === 0) {
        return [];
    }

    // Fetch posts created by users in the 'follows' array and order on upload date in descending order
    const q = query(
        collection(db, 'Posts'), 
        orderBy('createdAt', 'desc'), 
        where('createdBy', 'in', followsArray),
        limit(amountOfPosts)
    );
    const querySnapshot = await getDocs(q);
    const posts = [];

    for (const doc of querySnapshot.docs) {
        const postData = doc.data();
        try {
            const user = await readUserFromFirestore(postData.createdBy);
            posts.push({ id: doc.id, user: user, ...postData });
        } catch (error) {
        }
    }
    return posts;
}

export { db, connectToFirestore, signInACB, signOutACB, readUserFromFirestore, postDataListener, removePostFromFirestore, savePostToFirestore, profileDataListener, saveCommentToFireStore, removeCommentFromFirestore, likePostFirestore, dislikePostFirestore, followUserFirestore, unfollowUserFirestore, userPostsListener, postCommentsDataListener, queryMoreNewestPosts, queryTopPosts, queryFavoritePosts, queryUsername };