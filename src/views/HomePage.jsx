import Topbar from "./GeneralTopBar";

/**
 * Renders the homepage view
 * @param {Object} props.model - The firepinsModel
 * @param {String} props.model.searchText - The current search typed by the user.
 * @param {String} props.model.profilePicture - - The URL or source for the user's profile picture.
 * @param {Function} props.model.updateUserSearch - funciton update the the searchText
 * @param {Function} props.model.confirmUserSearch - function confirm the search
 *
 * @returns {React.Element} A render of the homepage
 */
function HomePage(props) {
  return (
    <div className="flex flex-col">
      <Topbar
        searchText={props.model.searchText}
        profilePicture={props.model.profilePicture}
        updateUserSearch={(text) => {
          props.model.setSearchText(text);
        }}
        confirmUserSearch={() => {
          props.model.confirmUserSearch();
        }}
        createNewPostRequest={() => {
          window.location.hash = "#/newPost";
        }} //TODO change to real routing
        navigateToProfileRequest={() => {
          window.location.hash = "#/Profile";
        }} //TODO change to real routing
      />

      <div>
        <h1 className="text-2xl font-bold">HomePage</h1>
        <p>Main content for HomePage...</p>
      </div>
    </div>
  );
}

export default HomePage;