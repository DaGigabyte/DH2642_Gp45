import { observer } from "mobx-react-lite";
import ProfileView from "../views/ProfileView";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SuspenseAnimation from "../components/global/SuspenseAnimation.jsx";

function ProfilePresenter(props) {
  const { uid } = useParams();
  const loading = !props.model.profilePageData.userPosts;

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

  // Set user id to the model
  useEffect(() => {
    props.model.profilePageData.setCurrentProfileUid(uid);
  }, [uid]);

  // Change document title to the user's display name
  useEffect(() => {
    document.title =
      props.model.profilePageData.profileBannerPromiseState.data?.displayName;
  }, [props.model.profilePageData.profileBannerPromiseState.data?.displayName]);

  // Handle follow/unfollow button click
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
