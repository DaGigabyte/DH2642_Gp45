import { observer } from "mobx-react-lite";
import ProfileView from "../views/ProfileView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import model from "../models/firePinsModel";
import SuspenseAnimation from "../components/global/SuspenseAnimation.jsx";
import ConfirmationPopupModal from "../components/modal/ConfirmationPopupModal.jsx";
import { commentDeletedToast } from "../utils/toastify.js";

function ProfilePresenter(props) {
  const { uid } = useParams();
  const [popupModalIsOpen, setPopupModalIsOpen] = useState(false);

  useEffect(() => {
    props.model.profilePageData.setCurrentProfileUid(uid);
  }, [uid]);

  useEffect(() => {
    document.title =
      props.model.profilePageData.profileBannerPromiseState.data?.displayName;
  }, [props.model.profilePageData.profileBannerPromiseState.data?.displayName]);

  function profileButtonClick() {
    if (!model.user.data.follows.includes(uid)) {
      props.model.profilePageData.followUser();
    } else {
      props.model.profilePageData.unfollowUser();
    }
  }

  const profileBannerData =
    props.model.profilePageData.profileBannerPromiseState.data;

  if (!profileBannerData || !props.model.profilePageData.data) {
    return <SuspenseAnimation loading={true} />;
  }

  return (
    <>
      <ProfileView
        picture={profileBannerData?.profilePicture}
        username={profileBannerData?.displayName}
        bio={profileBannerData?.bio}
        followerAmt={profileBannerData?.followedBy.length}
        followingAmt={profileBannerData?.follows.length}
        profileButtonClick={profileButtonClick}
        ownAccount={model.user?.uid === uid}
        follows={model.user?.data?.follows?.includes(uid)}
        isLoggedIn={props.model.user.uid}
        posts={props.model.profilePageData.data}
        user={props.model.profilePageData.profileBannerPromiseState.data}
        currentUID={props.model.user.uid}
        selectPost={(id) => props.model.postDetailData.setCurrentPostID(id)}
        likePost={(id) => {
          props.model.postDetailData.setCurrentPostID(id);
          props.model.postDetailData.likePost();
        }}
        dislikePost={(id) => {
          props.model.postDetailData.setCurrentPostID(id);
          props.model.postDetailData.dislikePost();
        }}
        deletePost={(id) => {
          props.model.postDetailData.setCurrentPostID(id);
          setPopupModalIsOpen(true);
        }}
      />
      <ConfirmationPopupModal
        isOpen={popupModalIsOpen}
        setOpen={setPopupModalIsOpen}
        actionType="Pin"
        onCancel={() => setPopupModalIsOpen(false)}
        onConfirm={() => {
          props.model.postDetailData.removePost();
          setPopupModalIsOpen(false);
          commentDeletedToast();
        }}
      />
    </>
  );
}

export default observer(ProfilePresenter);
