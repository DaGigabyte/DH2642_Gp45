import ProfileBanner from "../components/profile/ProfileBanner";

function ProfileView(props) {
  return (
    <div>
      {/* Banner */}
      <ProfileBanner {...props.profileBannerPromiseState.data} />
    </div>
  );
}

export default ProfileView;
