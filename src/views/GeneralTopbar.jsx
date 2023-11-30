import Search from "./Searchbar";
import NewPostButton from "./CreatePostButton";

/**
 * Component for creating new post in top menu bar
 * @param {Object} props - The properties passed to the component
 * @param {String} props.searchText - The current search typed by the user.
 * @param {String} props.profilePicture - The current users profile picture
 * @param {Function} props.setSearchText - Function to update the search text
 * @param {Function} props.confirmUserSearch - Function to confirm the search posts
 * @returns {React.Element} A render of the topsearchbar with new post button and profile.
 */
export default function GeneralTopbar(props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between space-x-16 pd-10">
      <div className="w-full sm:w-1/2 self-center">
        <Search
          searchText={props.searchText || ""}
          onUserTyping={props.setSearchText}
          onUserSearching={props.confirmUserSearch}
        />
      </div>
      <div className="flex space-x-5 justify-end">
        <div className="flex-none self-center ">
          <NewPostButton
            onUserClick={() => {
              window.location.hash = "#/newPost";
            }} //TODO change to real routing
          />
        </div>
        <img
          className="rounded-full self-center h-12 shadow hover:scale-110 transition duration-300"
          src={props.profilePicture}
          alt="profile picture"
          onClick={() => {
            window.location.hash = "#/Profile";
          }} //TODO change to real routing
        />
      </div>
    </div>
  );
}
