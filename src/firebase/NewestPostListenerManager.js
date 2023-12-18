import { collection, onSnapshot, query, orderBy, startAfter, endBefore, limit } from "firebase/firestore";
import { db } from "./firebaseModel";
import { readUserFromFirestore } from "./firebaseModel";
import { makeAutoObservable, reaction, action } from "mobx";

class NewestPostListenerManager {
    constructor(model) {
        this.model = model;
        this.newerThanConstructionPosts = [];
        this.listeners = [];
        this.timeOfConstruction = new Date();
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
    
    addNewestPostsListener() {
        console.debug('NewestPostListenerManager: addNewestPostsListener');
        const lastListenerDocs = this.listeners[this.listeners.length - 1]?.post;
        const q = lastListenerDocs ? query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), startAfter(lastListenerDocs.createdAt), limit(1)) : query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), startAfter(this.timeOfConstruction), limit(1));
        const listener = {unsub: null, post: null};
        listener.unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach(async function changeACB(change) {
                if (change.type === 'added') {
                    if (changeACB.toBeDeleted === true)
                        return;
                    const postData = change.doc.data();
                    const user = await readUserFromFirestore(postData.createdBy);
                    listener.post = { id: change.doc.id, user, ...postData };
                    console.debug('NewestPostListenerManager: added', listener.post);
                    this.setListeners([...this.listeners, listener]);
                    console.debug('NewestPostListenerManager: this.listeners', this.listeners);
                }
                if (change.type === 'modified') {
                    const postData = change.doc.data();
                    const index = this.listeners.findIndex((listener)=>listener.post.id === change.doc.id);
                    const updatedPost = { ...this.listeners[index].post, ...postData };
                    this.setListenerPostAt(updatedPost, index);
                    console.debug('NewestPostListenerManager: modified', updatedPost);
                }
                if (change.type === 'removed') {
                    // Todo: remove listener from listeners
                    console.debug('NewestPostListenerManager: removed');
                    listener.unsub();
                    changeACB.toBeDeleted = true;
                    this.removeListener(change.doc.id);
                }
            }.bind(this));
        });
    }
    addFourNewestPostsListener() {
        console.debug('NewestPostListenerManager: addFourNewestPostsListener');
        setTimeout(this.addNewestPostsListener.bind(this), 1000);
        setTimeout(this.addNewestPostsListener.bind(this), 2000);
    }
    updateNewestPostsFromFirestoreListener(model) {
        const posts = collection(db, "Posts");
        const q = query(posts, orderBy("createdAt", "desc"), endBefore(this.timeOfConstruction));
        
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
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
        console.debug('NewestPostListenerManager: removeListener', postId);
        this.listeners = this.listeners.filter(l => l.post.id !== postId);
    }
}

export default NewestPostListenerManager;