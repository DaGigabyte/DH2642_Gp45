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
 * @param {Function} props.profileButtonClick - Custom event called when the button in the profile is pressed, depending on the state it might be a follow or unfollow
 * @returns {React.Element} A component that renders a profile banner
 */

export default function ProfileBanner(props) {
    return (
      <div className="flex justify-center ml-10 mr-16">
        <img src={props.picture} className="w-[300px] rounded-full mr-10" />
        <div className="bg-white p-8 h-[300px] w-full rounded-xl shadow-md">
            <div className="flex">
                <h1 className="text-2xl font-bold mb-4">{props.username}</h1>
                <div className="ml-auto mb-4 flex">
                    <div className="text-2xl mr-5">{props.followerAmt} followers</div>
                    <div className="text-2xl mr-5">{props.followingAmt} following</div>
                </div>
            </div>
            <div className="text-lg mb-4 mr-5 max-h-[140px] h-[140px] overflow-auto whitespace-pre-line">
                {props.bio}
            </div>
            {props.ownAccount ? "" : <FollowButton text={props.following ? "Unfollow" : "Follow"} onUserClick={props.profileButtonClick}/>}
        </div>
      </div>
    );
  }