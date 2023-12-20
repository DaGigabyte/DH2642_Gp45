function ProfileBanner(props) {
  return (
    <div className="flex flex-col justify-center items-center p-4 rounded-lg">
      {/* Profile image */}
      <div className="flex justify-center items-center w-28 h-2w-28 rounded-full bg-gray-200 shadow-md select-none">
        <img
          className="w-full rounded-full object-cover"
          src={props.profilePicture}
          alt={props.displayName}
        />
      </div>
      {/* Profile name */}
      <div className="text-2xl font-bold mt-2">{props.displayName}</div>
      {/* Profile bio */}
      <div className="text-sm text-gray-500 mt-1">{props.bio || ""}</div>
      {/* Number of followers and following */}
      <div className="flex space-x-4 mt-2 select-none">
        {/* Number of followers */}
        <div className="text-sm text-gray-500 mt-1">
          {props.followedBy && props.followedBy.length} followers
        </div>
        {/* Number of following */}
        <div className="text-sm text-gray-500 mt-1">
          {props.follows && props.follows.length} following
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
