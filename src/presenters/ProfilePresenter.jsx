import { observer } from "mobx-react-lite";
import ProfileView from "../views/ProfileView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuspenseAnimation from "../components/global/SuspenseAnimation.jsx";
import ConfirmationPopupModal from "../components/modal/ConfirmationPopupModal.jsx";
import { commentDeletedToast } from "../utils/toastify.js";

function ProfilePresenter(props) {
  const { uid } = useParams();
  const loading = !props.model.profilePageData.data;

  // Set user id to the model
  useEffect(() => {
    props.model.profilePageData.setCurrentProfileUid(uid);
  }, [uid]);

  return (
    <>
      {loading ? (
        <SuspenseAnimation loading={loading} />
      ) : (
        <ProfileView {...props.model.profilePageData} />
      )}
    </>
  );
}

export default observer(ProfilePresenter);
