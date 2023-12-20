import ProfileBanner from "../components/profile/ProfileBanner";
import UserProfilePins from "../components/profile/UserProfilePins";

function ProfileView(props) {
  return (
    <div className="flex flex-col">
      {/* Banner */}
      <ProfileBanner
        {...props.profilePageData.profileBannerPromiseState.data}
      />
      {/* User's pins */}
      <UserProfilePins userPins={props.profilePageData.data} />
    </div>
  );
}

export default ProfileView;
