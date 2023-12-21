import { observer } from "mobx-react-lite";
import ProfileView from "../views/ProfileView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuspenseAnimation from "../components/global/SuspenseAnimation.jsx";
import ConfirmationPopupModal from "../components/modal/ConfirmationPopupModal.jsx";
import { commentDeletedToast } from "../utils/toastify.js";

function ProfilePresenter(props) {
  const { uid } = useParams();
  const loading = !props.model.profilePageData.userPosts;

  function userSelectsPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
  }
  function userlikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.likePost();
    props.model.homePageData.fetchTopPosts();
  }
  function userdislikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.dislikePost();
    props.model.homePageData.fetchTopPosts();
  }

  function handleSubmittedCommentACB(post) {
    props.model.postDetailData.setCurrentPostID(post.id);
    props.model.postDetailData.postComment();
    props.model.postDetailData.setComment("");
    newCommentCreatedToast();
  }

  // Set user id to the model
  useEffect(() => {
    props.model.profilePageData.setCurrentProfileUid(uid);
  }, [uid]);

  // Show suspense while fetching data
  if (loading) {
    return <SuspenseAnimation loading={loading} />;
  }

  return (
    <ProfileView
      {...props.model}
      userSelectsPostACB={userSelectsPostACB}
      userlikesPostACB={userlikesPostACB}
      userdislikesPostACB={userdislikesPostACB}
      handleSubmittedCommentACB={handleSubmittedCommentACB}
    />
  );
}

export default observer(ProfilePresenter);
