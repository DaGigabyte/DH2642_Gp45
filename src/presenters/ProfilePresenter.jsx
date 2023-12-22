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
  const isFollowing = props.model?.user?.data?.follows?.includes(uid);

  function userSelectsPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
  }
  function userlikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.likePost();
  }
  function userdislikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.dislikePost();
  }

  // Handle follow and unfollow
  function handleFollowAndUnfollow() {
    if (!isFollowing) {
      props.model.profilePageData.followUser();
    } else {
      props.model.profilePageData.unfollowUser();
    }
  }

  // Set user id to the model
  useEffect(() => {
    props.model.profilePageData.setCurrentProfileUid(uid);
  }, [uid]);

  const [popupModalIsOpen, setPopupModalIsOpen] = useState(false);

  useEffect(() => {
    document.title =
      props.model.profilePageData.profileBannerPromiseState.data?.displayName;
  }, [props.model.profilePageData.profileBannerPromiseState.data?.displayName]);

  function profileButtonClick() {
    if (!props.model.user.data.follows.includes(uid)) {
      props.model.profilePageData.followUser();
    } else {
      props.model.profilePageData.unfollowUser();
    }
  }

  const profileBannerData =
    props.model.profilePageData.profileBannerPromiseState.data;

  // Show suspense while fetching data
  if (loading) {
    return <SuspenseAnimation loading={loading} />;
  }

  return (
    <ProfileView
      {...props.model}
      isFollowing={isFollowing}
      handleFollowAndUnfollow={handleFollowAndUnfollow}
      userSelectsPostACB={userSelectsPostACB}
      userlikesPostACB={userlikesPostACB}
      userdislikesPostACB={userdislikesPostACB}
      picture={profileBannerData?.profilePicture}
      username={profileBannerData?.displayName}
      bio={profileBannerData?.bio}
      followerAmt={profileBannerData?.followedBy.length}
      followingAmt={profileBannerData?.follows.length}
      profileButtonClick={profileButtonClick}
      ownAccount={props.model.user?.uid === uid}
      follows={props.model.user?.data?.follows?.includes(uid)}
      isLoggedIn={props.model.user.uid}
    />
  );
}

export default observer(ProfilePresenter);
