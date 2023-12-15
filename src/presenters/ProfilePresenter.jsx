import { observer } from "mobx-react-lite";
import ProfileView from "../views/ProfileView";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function ProfilePresenter(props) {
    const { uid } = useParams();

    useEffect(() => {
        props.model.profilePageData.setCurrentProfileUid(uid);
    }, [uid]);

    useEffect(() => {
        document.title = props.model.profilePageData.promiseState.data?.displayName;
    }, [props.model.profilePageData.promiseState.data?.displayName]);

    function profileButtonClick() {
        if (!props.model.profilePageData.promiseState.data?.isFollowing) {
            props.model.profilePageData.followUser()
        } else {
            props.model.profilePageData.unfollowUser()
        }
    }

    return (
        <ProfileView
            picture={props.model.profilePageData.promiseState.data?.profilePicture}
            username={props.model.profilePageData.promiseState.data?.displayName}
            bio={props.model.profilePageData.promiseState.data?.bio}
            followerAmt={props.model.profilePageData.promiseState.data?.followerAmt}
            followingAmt={props.model.profilePageData.promiseState.data?.followingAmt}
            profileButtonClick={profileButtonClick}
            ownAccount={props.model.profilePageData.promiseState.data?.ownAccount}
            follows={props.model.profilePageData.promiseState.data?.isFollowing}
            isLoggedIn={props.model.profilePageData.promiseState.data?.isLoggedIn}
        />
    );
}

export default observer(ProfilePresenter);
