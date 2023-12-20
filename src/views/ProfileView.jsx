import ProfileBanner from "../components/layout/ProfileBanner";
import ProfilePostsSection from "../components/profile/ProfilePostsSection.jsx";
import SuspenseAnimation from "../components/global/SuspenseAnimation.jsx";

/**
 * Renders the profile view
 * @param {string} props.picture - The profile picture
 * @param {string} props.username - The profile username
 * @param {string} props.bio - The profile biography
 * @param {int} props.followerAmt - Amount of followers
 * @param {int} props.followingAmt - Amount following
 * @param {boolean} props.ownAccount - True if the user logged in owns the profile
 * @param {boolean} props.following - True if the user logged in follows the account of the profile
 * @param {boolean} props.isLoggedIn - True if the user is logged in
 * @param {Function} props.profileButtonClick - Custom event called when the button in the profile is pressed, depending on the state it might be a follow or unfollow
 *
 * @param {Object} props.post - an array of the posts from the current profile
 * @param {Object} props.currentUID - the currently logged-in user id
 * @param {Function} props.loadMorePosts - a function to load more of the users posts
 * @param {Function} props.selectPost - a function to go the detailed view of a post
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
        following={props.follows}
        isLoggedIn={props.isLoggedIn}
      />
      <p className="font-medium text-3xl w-full text-center mt-10 mb-4">Pins</p>
      {props.posts ? (
        <ProfilePostsSection
          posts={props.posts}
          user={props.user}
          currentUID={props.currentUID}
          selectPost={(id) => props.selectPost(id)}
          likePost={(id) => props.likePost(id)}
          dislikePost={(id) => props.dislikePost(id)}
          deletePost={(id) => props.deletePost(id)}
        />
      ) : (
        <div className="relative mt-20">
          <SuspenseAnimation loading={true} />
        </div>
      )}
    </div>
  );
}

export default ProfileView;
