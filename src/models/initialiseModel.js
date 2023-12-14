import { connectToFirestore, readPostFromFirestore, queryCommentsByPostId } from "../firebase/firebaseModel";
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

    async function fetchPostDataCB([newPostId]) {
        const postData = await readPostFromFirestore(newPostId);
        const postComments = await queryCommentsByPostId(newPostId);
        model.postDetailData.setData({ ...postData, comments: postComments });
    }

    reaction(watchCurrentPostIdCB, fetchPostDataCB);
}

export default function initialiseModel(model) {
    console.debug("initialiseModel");
    connectToFirestore(model);
    settingsReaction(model);
    currentPostIdReaction(model);
}