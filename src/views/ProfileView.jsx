import ProfileBanner from "../components/profile/ProfileBanner";

function ProfileView(props) {
  console.log("profile view: ", props);
  return (
    <div className="flex flex-col w-full max-w-6xl">
      {/* Banner */}
      <ProfileBanner
        {...props.profilePageData.profileBannerPromiseState.data}
        currenLoggedInUid={props.user.uid}
        currentProfileUid={props.profilePageData.currentProfileUid}
        followUser={props.profilePageData.followUser}
        unfollowUser={props.profilePageData.unfollowUser}
      />
      {/* User's pins */}
    </div>
  );
}

export default ProfileView;
