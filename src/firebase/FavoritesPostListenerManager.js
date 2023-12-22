import { collection, onSnapshot, query, where, orderBy, startAfter, endBefore, limit } from "firebase/firestore";
import { db } from "./firebaseModel";
import { readUserFromFirestore } from "./firebaseModel";
import { reaction, action, when, makeAutoObservable } from "mobx";

class FavoritesPostListenerManager {
    constructor(postsData) {
        this.postsData = postsData;
        this.userID = null;
        this.newerThanConstructionPosts = [];
        this.listeners = [];
        this.timeOfConstruction = new Date();
        this.readyForAddingNewestPostsListener = true;
        this.endOfPosts = false;
        makeAutoObservable(this);
        reaction(() => this.listeners.map(l => l.post), () => {
            console.debug('FavoritesPostListenerManager: reaction', this.listeners);
            const postArr = this.listeners.map(l => l.post).filter(p => p !== null);
            this.postsData.setNewestPostsBeforeTimeOfConstruction(postArr)
        });
        when(() => this.endOfPosts, () => {
            console.debug('FavoritesPostListenerManager: whenEndOfPosts: endOfPosts');
            this.postsData.setEndOfNewestPostsBeforeTimeOfConstruction(true);
        });
        this.listenToAndUpdatePostsCreatedAfterConstruction();
        function userIDACB() {
            this.listeners.map(l=>l.unsub());
            this.setListeners([]);
            console.debug('Unsubscribed and removed all listeners');
        }
        reaction(()=>this.userID, userIDACB.bind(this));
    }
    setUserID = action((userID) => this.userID = userID);
    setListeners = action((listeners) => this.listeners = listeners);
    setListenerPostAt = action((post, index) => this.listeners[index].post = post);
    removeListener(postId) {
        console.log('FavoritesPostListenerManager: removeListener', postId);
        this.listeners = this.listeners.filter(l => l.post.id !== postId);
    }
    setReadyForAddingNewestPostsListener = action((ready) => this.readyForAddingNewestPostsListener = ready);
    setEndOfPosts = action((endOfPosts) => {this.endOfPosts = endOfPosts});
    
    addNewestPostsListener() {
        if (!this.readyForAddingNewestPostsListener)
            return;
        this.setReadyForAddingNewestPostsListener(false);
        console.log('FavoritesPostListenerManager: addNewestPostsListener');
        const lastListenerDocs = this.listeners[this.listeners.length - 1]?.post;
        const q = lastListenerDocs ? query(collection(db, 'Posts'), where('likedBy', 'array-contains', this.userID), orderBy('createdAt', 'desc'), startAfter(lastListenerDocs.createdAt), limit(1)) : query(collection(db, 'Posts'), where('likedBy', 'array-contains', this.userID), orderBy('createdAt', 'desc'), startAfter(this.timeOfConstruction), limit(1));
        const queryString = lastListenerDocs ? lastListenerDocs.createdAt : this.timeOfConstruction;
        const listener = {unsub: null, post: null};
        listener.unsub = onSnapshot(q, {includeMetadataChanges: true}, async function listenerACB(querySnapshot) {
            console.log('FavoritesPostListenerManager: onSnapshotACB: query: createdAt', queryString);
            if (querySnapshot.metadata.fromCache) {
                console.log('FavoritesPostListenerManager: onSnapshotACB: fromCache: DO NOTHING');
                return;
            } else {
                if (querySnapshot.empty) {
                    this.setEndOfPosts(true); // Indicate that there are no more posts to load
                    return;
                }
                console.log('FavoritesPostListenerManager: onSnapshotACB: fromServer: DO SOMETHING: post: ', querySnapshot.docs[0].data());
                const docID = querySnapshot.docs?.[0].id;
                if (listenerACB.docID !== undefined && listenerACB.docID !== docID) {
                    console.log("listenerACB is returns another docID, the original post has been deleted, removing listenerACB");
                    listener.unsub();
                    this.removeListener(listenerACB.docID);
                }
                const postData = querySnapshot.docs[0].data();
                const index = this.listeners.findIndex((listener)=>listener.post.id === docID);
                if (index === -1) { // post does not exists yet
                    console.log('FavoritesPostListenerManager: onSnapshotACB: fromServer: DO SOMETHING: post: does not exists yet: adding');
                    listenerACB.docID = docID; // assign docID to listenerACB
                    const user = await readUserFromFirestore(postData.createdBy);
                    listener.post = { id: docID, user, ...postData };
                    this.setListeners([...this.listeners, listener]);
                    this.setReadyForAddingNewestPostsListener(true);
                    listenerACB.hasBeenAdded = true;
                } else {
                    console.log('FavoritesPostListenerManager: onSnapshotACB: fromServer: DO SOMETHING: post: exists: modifying');
                    const updatedPost = { ...this.listeners[index].post, ...postData };
                    this.setListenerPostAt(updatedPost, index);
                }
            }
        }.bind(this));
    }
    listenToAndUpdatePostsCreatedAfterConstruction() {
        const posts = collection(db, "Posts");
        const q = query(posts, orderBy("createdAt", "desc"), endBefore(this.timeOfConstruction)); // query posts created after this website is first loaded
        
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            console.log('FavoritesPostListenerManager: listenToAndUpdatePostsCreatedAfterConstruction');
            const postArr = [];
            for (const doc of querySnapshot.docs) {
                const postData = doc.data();
                const user = await readUserFromFirestore(postData.createdBy);
                const post = { id: doc.id, user, ...postData };
                postArr.push(post);
            }
            this.postsData.setNewestPostsAfterTimeOfConstruction(postArr);
        });
    }
}

export default FavoritesPostListenerManager;