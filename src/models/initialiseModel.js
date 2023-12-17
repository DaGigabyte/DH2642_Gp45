import { connectToFirestore, postDataListener, postCommentsDataListener, profileDataListener, queryPostByUserUid } from "../firebase/firebaseModel";
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
    const postData = model.postDetailData;

    function watchCurrentPostIdCB() {
        return [postData.currentPostID];
    }

    async function onCurrentPostIdChangeCB([newPostId]) {
        // If the post data is available immediately set it in the model
        const post = model.getPostFromModel(newPostId);
        post && postData.setPostData(post);

        // Subsribe to changes in the current post
        postData.unsubscribePostData?.();
        postData.setPostData(null);
        postData.setUnsubscribePostData(postDataListener(newPostId, (postDetails) => {
            postData.setPostData(postDetails);
        }));

        // Subscribe to changes in the comments of the current post
        postData.unsubscribePostCommentsData?.();
        postData.setPostComments(null);
        postData.setUnsubscribePostCommentsData(postCommentsDataListener(newPostId, (comments) => {
            postData.setPostComments(comments);
        }));
        // Reset the comment to an empty string
        postData.comment = "";
    }
    reaction(watchCurrentPostIdCB, onCurrentPostIdChangeCB);
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
        model.profilePageData.unsubscribeProfileData?.();
        model.profilePageData.profileBannerPromiseState.setData(null);
        //model.profilePageData.unsubscribePostsData?.();
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