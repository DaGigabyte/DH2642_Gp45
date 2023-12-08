import { useState } from "react";
import Searchbar from "../views/Searchbar";
import { observer } from "mobx-react-lite";
import { queryUsername } from "../firebase/firebaseModel";

/*
    Searchbar presenter

*/
function SearchbarPresenter(props) {

    const placeholderText = "Find your favorites";

    const [searchText, setSearchText] = useState();
    const [searchResults, setSearchResults] = useState();
    const [showSuggestions, setShowSuggestions] = useState();

    return (
        <Searchbar 
        searchText={searchText ? searchText : placeholderText} 
        searchResults={searchResults} 
        onUserTyping={onUserTyping} 
        onUserSearching={onUserSearching} 
        onSearchBlur={onSearchBlur} 
        onSearchFocus={onSearchFocus} 
        showSuggestions={showSuggestions}
        />
    ) 

    function onUserTyping(searchText) {
        if (searchText !== placeholderText)
            setSearchText(searchText);
    }

    function onUserSearching() {
        if (searchText) {
            queryUsername(searchText)
            .then((data) => {
                setSearchResults(data);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    function onSearchBlur() {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100)
    }

    function onSearchFocus() {
        setShowSuggestions(true);
    }
}

export default observer(SearchbarPresenter);    