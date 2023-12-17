import { observer } from "mobx-react-lite";
import ProfileView from "../views/ProfileView";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import model from "../models/firePinsModel";

function ProfilePresenter(props) {
    const { uid } = useParams();

    useEffect(() => {
        props.model.profilePageData.setCurrentProfileUid(uid);
    }, [uid]);

    useEffect(() => {
        document.title = props.model.profilePageData.profileBannerPromiseState.data?.displayName;
    }, [props.model.profilePageData.profileBannerPromiseState.data?.displayName]);

    function profileButtonClick() {
        if (!model.user.data.follows.includes(uid)) {
            props.model.profilePageData.followUser();
        } else {
            props.model.profilePageData.unfollowUser();
        }
    }

    const profileBannerData = props.model.profilePageData.profileBannerPromiseState.data;

    if(!profileBannerData) {
        return ("Implement proper suspense here");
    }

    return (
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
        />
    );
}

export default observer(ProfilePresenter);
