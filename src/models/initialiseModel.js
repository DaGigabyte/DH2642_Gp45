import { connectToFirestore, readPostFromFirestore, queryCommentsByPostId, readUserFromFirestore, profileDataListener, queryPostByUserUid } from "../firebase/firebaseModel";
import resolvePromise from "./resolvePromise";
import { reaction } from "mobx";
import { listOfGenre } from "../services/firePinsSource";

function settingsReaction(model) {
    console.debug("settingsReaction");
    function watchUserCB() {
        return [model.user.data];
    }
    function copyUserToUserSettingsDataCB() {
        console.debug("copyUserToUserSettingsDataCB: model.user.data changed, copying to model.userSettingsData.data");
        model.userSettingsData.setFullName(model.user.data.fullName);
        model.userSettingsData.setDisplayName(model.user.data.displayName);
    }
    reaction(watchUserCB, copyUserToUserSettingsDataCB);
}

// Reaction to fetch post data when currentPostID changes
function currentPostIdReaction(model) {
    function watchCurrentPostIdCB() {
        return [model.postDetailData.currentPostID];
    }
    async function readPostwithComments(postId) { // Fetch post data and comments from Firestore
        const postData = await readPostFromFirestore(postId);
        const postComments = await queryCommentsByPostId(postId);
        return { ...postData, comments: postComments };
    }
    async function appendCommentsToPost(post) { // Fetch comments from Firestore and append to post
        const postComments = await queryCommentsByPostId(post.id);
        return { ...post, comments: postComments };
    }
    async function fetchPostDataCB([newPostId]) {
        const post = model.getPostFromModel(newPostId);
        const promiseToBeResolved = post ? appendCommentsToPost(post) : readPostwithComments(newPostId); // If post is already in the model, just set promiseState.data to the post, otherwise fetch the post from Firestore
        resolvePromise(promiseToBeResolved, model.postDetailData.promiseState);
        // Reset the comment to an empty string
        model.postDetailData.comment = "";
    }
    reaction(watchCurrentPostIdCB, fetchPostDataCB);
}

// Reaction to fetch profile data when currentProifileUid changes
function currentProfileUidReaction(model) {
    function watchCurrentProfileUidCB() {
        return [model.profilePageData.currentProfileUid];
    }

    async function readPosts(uid) {
        const userPosts = await queryPostByUserUid(uid);
        return { posts: userPosts };
    }

    function extractProfileBannerData({ profilePicture, displayName, bio, followedBy, follows }) {
        return { profilePicture, displayName, bio, followedBy, follows };
    }

    async function onCurrentProfileUidChangeCB([newUid]) {
        //model.profilePageData.unsubscribeProfileData?.();
        model.profilePageData.unsubscribePostsData?.();
        model.profilePageData.setUnsubscribeProfileData(profileDataListener(newUid, (profileData) => {
            model.profilePageData.profileBannerPromiseState.setData(extractProfileBannerData(profileData));
        }));
        //resolvePromise(readPosts(newUid), model.profilePageData.userPostsPromiseState);
    }

    reaction(watchCurrentProfileUidCB, onCurrentProfileUidChangeCB);
}

export default async function initialiseModel(model) {
    console.debug("initialiseModel");
    connectToFirestore(model);
    settingsReaction(model);
    currentPostIdReaction(model);
    currentProfileUidReaction(model);
    model.homePageData.fetchNewestPosts();
    Object.assign(model, {listOfTMDBgenre: await listOfGenre()});
}