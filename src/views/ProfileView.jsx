import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileUserPins from "../components/profile/ProfileUserPins";

function ProfileView(props) {
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
      <ProfileUserPins
        currentUID={props.user.uid}
        currentUserData={props.profilePageData.profileBannerPromiseState.data}
        userPins={props.profilePageData.userPosts}
        selectPost={props.userSelectsPostACB}
        likePost={props.userlikesPostACB}
        dislikePost={props.userdislikesPostACB}
        commentText={props.postDetailData.comment}
        userEntersComment={(res) => props.postDetailData.setComment(res)}
        storeComment={props.handleSubmittedCommentACB}
      />
    </div>
  );
}

export default ProfileView;
