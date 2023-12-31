import { connectToFirestore, postDataListener, postCommentsDataListener, profileDataListener, userPostsListener } from "../firebase/firebaseModel";
import resolvePromise from "./resolvePromise";
import { reaction, autorun } from "mobx";
import { listOfGenre } from "../services/firePinsSource";

function settingsReaction(model) {
    function watchUserCB() {
        return [model.user.data];
    }
    function copyUserToUserSettingsDataCB() {
        model.userSettingsData.setFullName(model.user.data.fullName);
        model.userSettingsData.setDisplayName(model.user.data.displayName);
        model.userSettingsData.setBio(model.user.data.bio);
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
        postData.unsubscribePostData?.();
        postData.unsubscribePostCommentsData?.();
        // If the post data is available immediately set it in the model and associate it with the current post
        const post = model.getPostFromModel(newPostId);
        if (post) {
            autorun(() => postData.setPostData(model.getPostFromModel(newPostId)));
        } else {
            // Subscribe to changes in the current post
            postData.setPostData(null);
            postData.setUnsubscribePostData(postDataListener(newPostId, (postDetails) => {
                postData.setPostData(postDetails);
            }));
        }
        // Subscribe to changes in the comments of the current post
        postData.setPostComments(null);
        postData.setUnsubscribePostCommentsData(postCommentsDataListener(newPostId, (comments) => {
            postData.setPostComments(comments);
        }));        
    }
    reaction(watchCurrentPostIdCB, onCurrentPostIdChangeCB);
}

// Reaction to fetch profile data when currentProifileUid changes
function currentProfileUidReaction(model) {
    const profileData = model.profilePageData;

    function watchCurrentProfileUidCB() {
        return [profileData.currentProfileUid];
    }

    function extractProfileBannerData({ profilePicture, displayName, bio, followedBy, follows }) {
        return { profilePicture, displayName, bio, followedBy, follows };
    }

    async function onCurrentProfileUidChangeCB([newUid]) {
        // Subscribe to changes in the current profile
        profileData.unsubscribeProfileData?.();
        profileData.profileBannerPromiseState.setData(null);
        profileData.setUnsubscribeProfileData(profileDataListener(newUid, (data) => {
            profileData.profileBannerPromiseState.setData(extractProfileBannerData(data));
        }));
        
        profileData.unsubscribePostsData?.();
        profileData.setUserPosts(null);
        profileData.setUnsubscribePostsData(userPostsListener(newUid, (posts) => {
            profileData.setUserPosts(posts);
        }));
    }

    reaction(watchCurrentProfileUidCB, onCurrentProfileUidChangeCB);
}

function combineLatestPosts(model) {
    function watchCB() {
        return [model.newestPostsData.newestPostsBeforeTimeOfConstruction, model.newestPostsData.newestPostsAfterTimeOfConstruction];
    }
    function updateNewestPostsCB() {
        const newestPosts = [...model.newestPostsData.newestPostsAfterTimeOfConstruction, ...model.newestPostsData.newestPostsBeforeTimeOfConstruction];
        model.newestPostsData.setNewestPosts(newestPosts);
    }
    reaction(watchCB, updateNewestPostsCB);
}

export default async function initialiseModel(model) {
    connectToFirestore(model);
    settingsReaction(model);
    currentPostIdReaction(model);
    currentProfileUidReaction(model);
    model.topRatedPostsData.fetchTopPosts();
    combineLatestPosts(model);
    Object.assign(model, {listOfTMDBgenre: await listOfGenre()});
}