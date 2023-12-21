function ProfileBanner(props) {
  return (
    <div className="flex flex-col space-y-4">
      <h2>Profile</h2>
      <div className="flex flex-col md:flex-row items-center justify-between space-x-4 p-4 rounded-lg bg-white">
        {/* Profile pic and name */}
        <div className="flex items-center space-x-4">
          {/* Profile image */}
          <div className="flex justify-center items-center w-28 h-2w-28 rounded-full bg-gray-200 shadow-md select-none">
            <img
              className="w-full rounded-full object-cover"
              src={props.profilePicture}
              alt={props.displayName}
            />
          </div>
          {/* Profile name */}
          <div className="flex flex-col space-y-2 max-w-md">
            <p className="text-2xl text-pins-secondary">{props.displayName}</p>
            <p className="text-sm text-pins-secondary/50">{props.bio || ""}</p>
          </div>
        </div>
        {/* Number of followers and following */}
        <div className="flex items-center space-x-4 self-end select-none">
          {/* Number of followers */}
          <div className="text-lg text-gray-500 border border-double px-4 py-2 rounded">
            {props.followedBy?.length} followers
          </div>
          {/* Number of following */}
          <div className="text-lg text-gray-500 border border-double px-4 py-2 rounded">
            {props.follows?.length} following
          </div>
          {/* Follow button */}
          {props.currentProfileUid !== props.currenLoggedInUid ? (
            <button
              className="flex items-center justify-center text-lg md:text-sm lg:text-lg text-white font-bold bg-pins-primary px-5 py-2 md:px-2 lg:px-5 rounded-2xl shadow hover:bg-pins-primary/80 transition duration-75"
              onClick={props.handleFollowAndUnfollow}
            >
              {props.isFollowing ? "Unfollow" : "Follow"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
