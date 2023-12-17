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
    function updateNewestPostsFromFirestoreReaction(model) {
        const posts = collection(db, "Posts");
        const q = query(posts, orderBy("createdAt", "desc"), limit(1));
        function updateNewestPostsFromFirestoreCB(change) {
            if (change.type === "added") {
                if (updateNewestPostsFromFirestoreCB.firstRun === undefined) { // First run, i.e. initial data from Firestore
                    updateNewestPostsFromFirestoreCB.firstRun = true;
                    console.debug("updateNewestPostsFromFirestoreReaction: Initial data from Firestore, not updating MobX store");
                    return;
                }
                const postData = change.doc.data();
                console.debug("updateNewestPostsFromFirestoreReaction: New post added to Firestore, updating MobX store\n change.doc.data(): ", postData);
                readUserFromFirestore(postData.createdBy)
                    .then((user) => {
                        model.newPostsData.addNewPost({ id: change.doc.id, user: user, ...postData });
                    })
                    .catch((error) => {
                        console.error("updateNewestPostsFromFirestoreReaction: Error fetching user data:", error);
                    });
            }
        }
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach(updateNewestPostsFromFirestoreCB);
        });
    }
    onAuthStateChanged(auth, onAuthStateChangedCB);
    reaction(watchUserCB, callSaveUserToFirestoreCB);
    updateNewestPostsFromFirestoreReaction(model);
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
    const docRef = await addDoc(collection(db, "Posts"), postObjWithMetadata);
    console.debug("savePostToFirestore: Document written with ID: ", docRef.id);
}

function readPostFromFirestore(postId) {
    if (!postId) {
        throw new Error("pid is falsy");
    }
    const docRef = doc(db, "Posts", postId);
    return getDoc(docRef)
        .then(async (docSnapshot) => {
            if (docSnapshot.exists()) { // Document for this post exists on Firestore
                console.debug("readPostFromFirestore: Post exists on Firestore, reading data");
                const postData = docSnapshot.data();
                try {
                    const user = await readUserFromFirestore(postData.createdBy);
                    return { id: docSnapshot.id, user: user, ...postData };
                } catch (error) {
                    console.error("readPostFromFirestore: Error fetching user data:", error);
                }
            } else { // Document for this post does not exist on Firestore
                console.debug("readPostFromFirestore: No such post!");
                return null;
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
            throw new Error("Error getting document");
        });
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
            console.error("likePostFirestore: Post not found");
        }
    } catch (error) {
        console.error("Error updating post:", error);
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

            await updateDoc(docRef, { likedBy: updatedLikedBy, dislikedBy: updatedDislikedBy });
        } else {
            console.error("dislikePostFirestore: Post not found");
        }
    } catch (error) {
        console.error("Error updating post:", error);
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
            console.error("followUserFirestore: Follower user not found");
        }

        // Update the followed user's followedBy array
        const followedDocRef = doc(db, followedPath);
        const followedDocSnapshot = await getDoc(followedDocRef);

        if (followedDocSnapshot.exists()) {
            const { followedBy } = followedDocSnapshot.data();
            const updatedFollowedBy = followedBy.includes(uidFollower) ? followedBy : [...followedBy, uidFollower];
            await updateDoc(followedDocRef, { followedBy: updatedFollowedBy });
        } else {
            console.error("followUserFirestore: Followed user not found");
        }
    } catch (error) {
        console.error("Error updating user:", error);
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
            const updatedFollows = follows.filter((uidFollowed) => uidFollowed !== uidFollowed);
            await updateDoc(docRefUnfollower, { follows: updatedFollows });
        } else {
            console.error("unfollowUserFirestore: User not found");
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
            console.error("unfollowUserFirestore: User not found");
        }
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

async function saveCommentToFireStore(commentObj, postId) {
    const path = "Posts/" + postId + "/Comments";
    const docRef = await addDoc(collection(db, path), commentObj);
    console.debug("saveCommentToFirestore: Document written with ID: ", docRef.id);
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
        return users; // return users to caller
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

async function queryCommentsByPostId(postId) {
    const path = "Posts/" + postId + "/Comments";
    const q = query(
        collection(db, path), 
    );
    return getDocs(q)
    .then((querySnapshot) => { // querySnapshot is an array of documents
        const comments = [];
        querySnapshot.forEach((doc) => {
            comments.push(doc.data());
        });
        console.debug("queryCommentsByPostId: Current comments: ", comments);
        return comments; // return comments to caller
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

async function queryPostByUserUid(userUid) {
    const q = query(
        collection(db, "Posts"), 
        where("createdBy", "==", userUid),
        orderBy("createdAt", "desc")
    );
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
            console.error("Error fetching user data:", error);
        }
    }
    queryMoreNewestPosts.lastVisiblePost = querySnapshot.docs[querySnapshot.docs.length-1];
    console.debug("queryMoreNewestPosts: Current posts: ", posts);
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
            console.error("Error fetching user data:", error);
        }
    }
    console.debug("queryTopPosts: Current posts: ", posts);
    return posts; // return posts to caller
}

async function queryFavoritePosts(amountOfPosts, uid) {

    let followsArray = [];

    // Get the 'follows' array of the user logged in
    try {
        const user = await readUserFromFirestore(uid);
        followsArray = [...user.follows];
    } catch (error) {
        console.error("Error fetching user following data:", error);
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
            console.error("Error fetching user data:", error);
        }
    }

    console.debug("queryFavoritePosts: Current posts: ", posts);
    return posts;
}

export { connectToFirestore, signInACB, signOutACB, readUserFromFirestore, readPostFromFirestore, savePostToFirestore, profileDataListener, saveCommentToFireStore, likePostFirestore, dislikePostFirestore, followUserFirestore, unfollowUserFirestore, queryPostByUserUid, queryCommentsByPostId, queryMoreNewestPosts, queryTopPosts, queryFavoritePosts, queryUsername };