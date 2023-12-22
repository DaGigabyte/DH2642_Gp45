import FollowButton from "./FollowButton";
/**
 * Component for settings, also used in general post
 * @param {Object} props - The properties passed to the ProfileBanner component
 * @param {string} props.picture - The URL or source for the user's profile picture
 * @param {string} props.username - The profile username
 * @param {string} props.bio - The profile biography
 * @param {int} props.followerAmt - Amount of followers
 * @param {int} props.followingAmt - Amount following
 * @param {boolean} props.ownAccount - True if the user logged in owns the profile
 * @param {boolean} props.following - True if the user logged in follows the account of the profile
 * @param {boolean} props.isLoggedIn- True if the user is logged in
 * @param {Function} props.profileButtonClick - Custom event called when the button in the profile is pressed, depending on the state it might be a follow or unfollow
 * @returns {React.Element} A component that renders a profile banner
 */

export default function ProfileBanner(props) {
  return (
    <div className="flex flex-col lg:flex-row justify-center space-y-4 lg:space-x-4">
      <img
        src={props.picture}
        alt={props.username}
        className="w-40 h-4w-40 rounded-full self-center"
      />
      {/* Other content */}
      <div className="flex flex-col items-center lg:items-stretch justify-around bg-white p-4 flex-1 rounded-xl shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
          <h1 className="text-2xl font-bold">{props.username}</h1>
          <div className="ml-auto flex">
            <div className="text-2xl mr-5">{props.followerAmt} followers</div>
            <div className="text-2xl mr-5">{props.followingAmt} following</div>
          </div>
        </div>
        <div className="text-lg py-2 overflow-auto whitespace-pre-line">
          {props.bio}
        </div>
        <div className="lg:self-end">
          {props.ownAccount || !props.isLoggedIn ? (
            ""
          ) : (
            <FollowButton
              text={props.following ? "Unfollow" : "Follow"}
              onUserClick={props.profileButtonClick}
              following={props.following}
            />
          )}
        </div>
      </div>
    </div>
  );
}
