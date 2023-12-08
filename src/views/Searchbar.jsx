import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
/*
    Searchbar view component. 

    Recieves the following props:
    searchText - The text to be shown in the searchbar
    searchResults - The results to be suggested after a search is made
    onUserTyping - Event that passes text in the searchbar to presenter
    onUserSearching - Event signaling that the user is performing a search
    hideSuggestions - Event signaling to hide the search suggestions

*/
function Searchbar(props) {
    return (
        <div className="relative">
          <input
            id="userSearchbar"
            onChange={userTyping}
            onKeyDown={userKeyPressed}
            placeholder={props.searchText}
            className="bg-white p-2 pl-4 pr-10 rounded-full w-full focus:outline-none text-gray-400"
            onBlur={onSearchBlur}
            onFocus={onSearchFocus}
          />
          <FaMagnifyingGlass onClick={userSearching} className="absolute top-3 right-4" />
    
          {props?.searchResults && props?.showSuggestions ?
            <div className="absolute w-full mt-2">
              {props.searchResults.map(renderSearchSuggestion)}
            </div>
            : ""}
          
        </div>
      );

    function renderSearchSuggestion(result) {
        return (
            <Link key={result.uid} to={{ pathname: "/profile/" + result.uid }}>
              <div className="p-2 bg-white border-b flex items-center">
                <img src={result.profilePicture} className="w-10 h-10 rounded-full mr-3" alt="Profile" />
                <p className="text-gray-800">{result.displayName}</p>
              </div>
            </Link>
        );
    }

    function userTyping(evt) {
        props.onUserTyping(evt.target.value);
    }

    function userKeyPressed(evt) {
        if (evt.key == "Enter") {
            props.onUserSearching();
        }
    }

    function userSearching(evt) {
        props.onUserSearching();
    }

    function onSearchBlur(evt) {
        props.onSearchBlur();
    }

    function onSearchFocus() {
        props.onSearchFocus();
    }
}

export default Searchbar;