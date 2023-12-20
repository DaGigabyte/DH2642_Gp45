// Components
import NewPostSearchInput from "./NewPostSearchInput";
import NewPostSelectApiSource from "./NewPostSelectApiSource";
import NewPostSearchResults from "./NewPostSearchResults";
import NewPostCaptionTextArea from "./NewPostCaptionTextArea";
import NewPostCreateNewPostButton from "./NewPostCreateNewPostButton";
import NewPostRating from "./NewPostRating";

/**
 * @param {function} props.setSearchTextTMDB set search text for TMDB
 * @param {array} props.searchResultsTMDB search results array for TMDB
 * @param {string} props.selectedMovieID selected movie ID
 * @param {function} props.onSelectMovie select movie
 * @param {object} props.sourceENUM source ENUM
 * @param {string} props.searchApiSource search API source
 * @param {function} props.onSelectSearchApiSource select search API source
 * @param {string} props.newPostCaption new post caption
 * @param {function} props.onSetNewPostCaption set new post caption
 * @param {function} props.onCreateNewPost create new post
 */

function CreateNewPostContainer(props) {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-pins-grey-darker mb-4 pb-4 -mt-4 border-b border-gray-300">
        Share your favorite movies with others
      </p>
      {/* Search input */}
      <NewPostSearchInput {...props} />

      {/* Select API source for search. It is disabled for now, because we don't have many sources. */}
      {/* <NewPostSelectApiSource {...props} /> */}

      {/* Search results */}
      <NewPostSearchResults {...props} />

      {/* Movie rating */}
      <NewPostRating {...props} />

      {/* Caption input */}
      <NewPostCaptionTextArea {...props} />

      {/* Create new post button */}
      <NewPostCreateNewPostButton {...props} />
    </div>
  );
}

export default CreateNewPostContainer;
