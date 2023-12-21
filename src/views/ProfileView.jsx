import ProfileBanner from "../components/profile/ProfileBanner";

function ProfileView(props) {
  return (
    <div className="flex flex-col w-full max-w-6xl">
      {/* Banner */}
      <ProfileBanner
        {...props.profilePageData.profileBannerPromiseState.data}
      />
      {/* User's pins */}
    </div>
  );
}

export default ProfileView;
