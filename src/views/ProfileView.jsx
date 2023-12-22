import ProfileBanner from "../components/layout/ProfileBanner";
import ProfileUserPins from "../components/profile/ProfileUserPins";

function ProfileView(props) {
  return (
    <div className="flex flex-col w-full max-w-6xl">
      {/* Banner */}
      <ProfileBanner
        picture={props.picture}
        username={props.username}
        bio={props.bio}
        followerAmt={props.followerAmt}
        followingAmt={props.followingAmt}
        profileButtonClick={props.profileButtonClick}
        ownAccount={props.ownAccount}
        following={props.follows}
        isLoggedIn={props.isLoggedIn}
      />
      {/* User's pins */}
      <ProfileUserPins
        currentUID={props.user?.uid}
        currentUserData={props.profilePageData.profileBannerPromiseState.data}
        userPins={props.profilePageData.userPosts}
        selectPost={props.userSelectsPostACB}
        likePost={props.userlikesPostACB}
        dislikePost={props.userdislikesPostACB}
      />
    </div>
  );
}

export default ProfileView;
