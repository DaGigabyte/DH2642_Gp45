import ProfileBanner from "../components/layout/ProfileBanner";

/**
 * Renders the profile view
 * @param {string} props.picture - The profile picture
 * @param {string} props.username - The profile username
 * @param {string} props.bio - The profile biography
 * @param {int} props.followerAmt - Amount of followers
 * @param {int} props.followingAmt - Amount following
 * @param {boolean} props.ownAccount - True if the user logged in owns the profile
 * @param {boolean} props.following - True if the user logged in follows the account of the profile
 * @param {Function} props.profileButtonClick - Custom event called when the button in the profile is pressed, depending on the state it might be a follow or unfollow
 * @returns {React.Element} A render of a profile
 */
function ProfileView(props) {
    return (
      <div>
        <ProfileBanner 
            picture={props.picture}
            username={props.username} 
            bio={props.bio} 
            followerAmt={props.followerAmt} 
            followingAmt={props.followingAmt} 
            profileButtonClick={props.profileButtonClick} 
            ownAccount={props.ownAccount} 
            follows={props.follows}
        />
        <h2 className="font-semibold text-5xl w-full text-center mt-10 mb-4">Pins</h2>
      </div>
    );
  }
  
  export default ProfileView;
  