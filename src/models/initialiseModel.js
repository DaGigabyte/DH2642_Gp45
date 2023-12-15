import { connectToFirestore, readPostFromFirestore, queryCommentsByPostId, readUserFromFirestore, queryPostByUserUid } from "../firebase/firebaseModel";
import resolvePromise from "./resolvePromise";
import { reaction } from "mobx";

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
    async function readPostwithComments(postId) {
        const postData = await readPostFromFirestore(postId);
        const postComments = await queryCommentsByPostId(postId);
        return { ...postData, comments: postComments };
    }
    async function fetchPostDataCB([newPostId]) {
        resolvePromise(readPostwithComments(newPostId), model.postDetailData.promiseState);
        // Reset the comment to an empty string
        model.postDetailData.comment = "";
    }
    reaction(watchCurrentPostIdCB, fetchPostDataCB);
}

// Reaction to fetch profile data when currentPostID changes
function currentProfileUidReaction(model) {
    function watchCurrentProfileUidCB() {
        return [model.profilePageData.currentProfileUid];
    }

    async function readProfileWithPosts(uid) {
        const { profilePicture, displayName, bio, followedBy, follows } = await readUserFromFirestore(uid);
        const userPosts = await queryPostByUserUid(uid);
        return {
            profilePicture,
            displayName,
            bio,
            followedBy,
            follows,
            followerAmt: followedBy.length,
            followingAmt: follows.length,
            ownAccount: model.user.uid === uid,
            isFollowing: model.user.data.follows.includes(uid),
            isLoggedIn: model.user.uid,
            posts: userPosts,
        };
    }

    async function fetchProfileDataCB([newUid]) {
        resolvePromise(readProfileWithPosts(newUid), model.profilePageData.promiseState);
    }

    reaction(watchCurrentProfileUidCB, fetchProfileDataCB);
}

export default function initialiseModel(model) {
    console.debug("initialiseModel");
    connectToFirestore(model);
    settingsReaction(model);
    currentPostIdReaction(model);
    currentProfileUidReaction(model);
}