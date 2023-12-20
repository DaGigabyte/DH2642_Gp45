import { collection, onSnapshot, query, orderBy, startAfter, endBefore, limit } from "firebase/firestore";
import { db } from "./firebaseModel";
import { readUserFromFirestore } from "./firebaseModel";
import { makeAutoObservable, reaction, action, when } from "mobx";

class NewestPostListenerManager {
    constructor(model) {
        this.model = model;
        this.newerThanConstructionPosts = [];
        this.listeners = [];
        this.timeOfConstruction = new Date();
        this.readyForAddingNewestPostsListener = true;
        makeAutoObservable(this);
        reaction(()=>this.listeners.map(l => l.post), ()=> {
            console.debug('NewestPostListenerManager: reaction', this.listeners);
            const postArr = this.listeners.map(l => l.post).filter(p => p!==null);
            model.homePageData.setNewestPostsBeforeTimeOfConstruction(postArr)
        });
        this.updateNewestPostsFromFirestoreListener(model);
    }
    
    setListeners = action((listeners) => this.listeners = listeners);
    setListenerPostAt = action((post, index) => this.listeners[index].post = post);
    setReadyForAddingNewestPostsListener = action((ready) => this.readyForAddingNewestPostsListener = ready);
    
    addNewestPostsListener() {
        if (!this.readyForAddingNewestPostsListener)
            return;
        this.setReadyForAddingNewestPostsListener(false);
        console.log('NewestPostListenerManager: addNewestPostsListener');
        const lastListenerDocs = this.listeners[this.listeners.length - 1]?.post;
        const q = lastListenerDocs ? query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), startAfter(lastListenerDocs.createdAt), limit(1)) : query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), startAfter(this.timeOfConstruction), limit(1));
        const queryString = lastListenerDocs ? lastListenerDocs.createdAt : this.timeOfConstruction;
        const listener = {unsub: null, post: null};
        listener.unsub = onSnapshot(q, {includeMetadataChanges: true}, (querySnapshot) => {
            console.log('NewestPostListenerManager: onSnapshotACB: query: createdAt', queryString);
            if (querySnapshot.metadata.fromCache) {
                console.log('NewestPostListenerManager: onSnapshotACB: fromCache: DO NOTHING');
                return;
            } else {
                console.log('NewestPostListenerManager: onSnapshotACB: fromServer: DO SOMETHING');
            }
            querySnapshot.docChanges().forEach(async function changeACB(change) {
                if (change.type === 'added') {
                    if (changeACB.toBeDeleted === true)
                        return;
                    const postData = change.doc.data();
                    const user = await readUserFromFirestore(postData.createdBy);
                    listener.post = { id: change.doc.id, user, ...postData };
                    console.log('NewestPostListenerManager: added', listener.post);
                    this.setListeners([...this.listeners, listener]);
                    console.log('NewestPostListenerManager: this.listeners', this.listeners);
                    this.setReadyForAddingNewestPostsListener(true);
                    changeACB.hasBeenAdded = true;
                }
                if (change.type === 'modified') {
                    const postData = change.doc.data();
                    const index = this.listeners.findIndex((listener)=>listener.post.id === change.doc.id);
                    const updatedPost = { ...this.listeners[index].post, ...postData };
                    this.setListenerPostAt(updatedPost, index);
                    console.log('NewestPostListenerManager: modified', updatedPost);
                }
                if (change.type === 'removed') {
                    // Todo: remove listener from listeners
                    console.log('NewestPostListenerManager: removed');
                    listener.unsub();
                    if (changeACB.hasBeenAdded === true)
                        changeACB.toBeDeleted = true;
                    this.removeListener(change.doc.id);
                }
            }.bind(this));
        });
    }
    updateNewestPostsFromFirestoreListener(model) {
        const posts = collection(db, "Posts");
        const q = query(posts, orderBy("createdAt", "desc"), endBefore(this.timeOfConstruction));
        
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            console.log('NewestPostListenerManager: updateNewestPostsFromFirestoreListener');
            const postArr = [];
            for (const doc of querySnapshot.docs) {
                const postData = doc.data();
                const user = await readUserFromFirestore(postData.createdBy);
                const post = { id: doc.id, user, ...postData };
                postArr.push(post);
            }
            model.newPostsData.setNewPostsData(postArr);
        });
    }
    removeListener(postId) {
        console.log('NewestPostListenerManager: removeListener', postId);
        this.listeners = this.listeners.filter(l => l.post.id !== postId);
    }
}

export default NewestPostListenerManager;