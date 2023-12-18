import { collection, onSnapshot, query, orderBy, startAfter, limit } from "firebase/firestore";
import { db } from "./firebaseModel";
import { readUserFromFirestore } from "./firebaseModel";
import { makeAutoObservable, reaction, action } from "mobx";

class NewestPostListenerManager {
    constructor(model) {
        this.model = model;
        this.listeners = [];
        makeAutoObservable(this);
        reaction(()=>this.listeners.map(l => l.post), ()=> {
            console.debug('NewestPostListenerManager: reaction', this.listeners);
            const postArr = this.listeners.map(l => l.post).filter(p => p!==null);
            model.homePageData.setNewestPosts(postArr)
        });
    }
    
    setListeners = action((listeners) => this.listeners = listeners);
    setListenerPostAt = action((post, index) => this.listeners[index].post = post);
    
    addNewestPostsListener() {
        console.debug('NewestPostListenerManager: addNewestPostsListener');
        const lastListenerDocs = this.listeners[this.listeners.length - 1]?.post;
        const q = lastListenerDocs ? query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), startAfter(lastListenerDocs.createdAt), limit(1)) : query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), limit(1));
        const listener = {unsub: null, post: null};
        listener.unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach(async (change) => {
                if (change.type === 'added') {
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
                    this.removeListener(change.doc.id);
                }
            });
        });
    }
    addFourNewestPostsListener() {
        setTimeout(this.addNewestPostsListener.bind(this), 1000);
        setTimeout(this.addNewestPostsListener.bind(this), 2000);
    }
    
    removeListener(postId) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
}

export default NewestPostListenerManager;