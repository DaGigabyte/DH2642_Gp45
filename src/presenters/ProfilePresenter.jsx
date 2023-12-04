import { observer } from "mobx-react-lite";
import ProfileView from "../views/ProfileView";
import { useState } from "react";

function ProfilePresenter(props) {

    return (
        <ProfileView picture={props.model.user.data.profilePicture} username="Username" bio={"Bio"} followerAmt={10} followingAmt={10}/>
    );
}

export default observer(ProfilePresenter);
