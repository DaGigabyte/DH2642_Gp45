import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileUserPins from "../components/profile/ProfileUserPins";

function ProfileView(props) {
  return (
    <div className="flex flex-col w-full max-w-6xl">
      {/* Banner */}
      <ProfileBanner
        {...props.profilePageData.profileBannerPromiseState.data}
        isFollowing={props.isFollowing}
        currenLoggedInUid={props.user.uid}
        currentProfileUid={props.profilePageData.currentProfileUid}
        handleFollowAndUnfollow={props.handleFollowAndUnfollow}
      />
      {/* User's pins */}
      <ProfileUserPins
        currentUID={props.user.uid}
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
