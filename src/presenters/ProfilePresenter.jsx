import { observer } from "mobx-react-lite";
import ProfileView from "../views/ProfileView";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { readUserFromFirestore } from "../firebase/firebaseModel";

function ProfilePresenter(props) {
    const { uid } = useParams();

    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState();

    useEffect(() => {
        readUserFromFirestore(uid)
            .then((data) => {
                setProfileData({
                    profilePicture: data?.profilePicture,
                    username: data?.displayName,
                    bio: data?.bio,
                    followerAmt: countFollowersOrFollowing(data.followedBy),
                    followingAmt: countFollowersOrFollowing(data.follows),
                    follows: data.follows
                });
                document.title = data?.displayName;
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [uid]);

    function countFollowersOrFollowing(accounts) {
        return accounts.length;
    }

    function ownAccountCheck() {
        if (uid === props.model.user.uid) {
            return true;
        }
        return false;
    }

    function followsCheck() {
        if (profileData.follows.includes(uid)) {
            return true;
        }
        return false;
    }

    function profileButtonClick() {
        console.log("follow/unfollow");
    }

    if (loading) {
        return (
            <div>
                <img
                    src="https://brfenergi.se/iprog/loading.gif"
                    alt="Loading"
                />
            </div>
        );
    }

    return (
        <ProfileView
            picture={profileData?.profilePicture}
            username={profileData?.username}
            bio={profileData?.bio}
            followerAmt={profileData?.followerAmt}
            followingAmt={profileData?.followingAmt}
            profileButtonClick={profileButtonClick}
            ownAccount={ownAccountCheck()}
            follows={followsCheck()}
        />
    );
}

export default observer(ProfilePresenter);
