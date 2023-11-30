import Search from "./Searchbar";
import NewPostButton from "./CreatePostButton";

/**
 * Component for creating new post in top menu bar
 * @param {Object} props - The properties passed to the component
 * @param {String} props.searchText - The current search typed by the user.
 * @param {Function} props.updateUserSearch - CB to update the the searchText
 * @param {Function} props.confirmUserSearch - CB to confirm the search
 * @param {Function} props.createNewPostRequest - CB to navigate to the create new post
 * @param {Function} props.navigateToProfileRequest - CB to navigate to the profile
 * @returns {React.Element} A render of the topsearchbar with new post button and profile.
 */
export default function GeneralTopbar(props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between space-x-16 pd-10">
      <div className="w-full sm:w-1/2 self-center">
        <Search
          searchText={props.searchText}
          onUserTyping={props.updateUserSearch}
          onUserSearching={props.confirmUserSearch}
        />
      </div>
      <div className="flex space-x-5 justify-end">
        <div className="flex-none self-center ">
          <NewPostButton onUserClick={props.createNewPostRequest} />
        </div>
        <img
          className="rounded-full self-center h-12 shadow hover:scale-110 transition duration-300"
          src={props.profilePicture}
          alt="profile picture"
          onClick={props.navigateToProfileRequest}
        />
      </div>
    </div>
  );
}
