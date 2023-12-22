import ProfilePinsSection from "./ProfilePinsSection";

function ProfileUserPins(props) {
  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h2 className="text-2xl">User Pins</h2>
      {/* Top pins */}
      <div>
        <ProfilePinsSection
          hotPosts={props.userPins}
          currentUID={props.currentUID}
          currentUserData={props.currentUserData}
          selectPost={(id) => props.selectPost(id)}
          likePost={(id) => props.likePost(id)}
          dislikePost={(id) => props.dislikePost(id)}
        />
      </div>
    </div>
  );
}

export default ProfileUserPins;
