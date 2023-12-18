import { onSnapshot } from "firebase/firestore";
import { readUserFromFirestore } from "./firebaseModel";
import { makeAutoObservable, autorun } from "mobx";

class NewestPostListenerManager {
    constructor(model) {
        this.model = model;
        this.listeners = [];
        makeAutoObservable(this);
        autorun(() => {
            model.homePageData.setNewestPosts(this.listeners.map(l => l.post));
        });
    }
    
    addNewestPostsListener() {
        const lastListenerDocs = this.listeners[this.listeners.length - 1]?.post;
        const q = lastListenerDocs ? query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), startAfter(lastListenerDocs.docRef), limit(1)) : query(collection(db, 'Posts'), orderBy('createdAt', 'desc'), limit(1));
        const listener = {unsub: null, post: null};
        listener.unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach(async (change) => {
                if (change.type === 'added') {
                    const postData = change.doc.data();
                    const user = await readUserFromFirestore(postData.createdBy);
                    listener.post = { id: change.doc.id, user, ...postData };
                    console.debug('NewestPostListenerManager: added', listener.post);
                }
                if (change.type === 'removed') {
                    // Todo: remove listener from listeners
                    console.debug('NewestPostListenerManager: removed');
                    listener.unsub();
                    this.removeListener(change.doc.id);
                }
            });
        });
        this.listeners.push(listener);
    }
    
    removeListener(postId) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
}

export default NewestPostListenerManager;