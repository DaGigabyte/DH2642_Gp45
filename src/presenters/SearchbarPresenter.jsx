import { useState, useEffect } from "react";
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
    
    useEffect(() => {
        if (searchText === "") {
            setSearchResults([]);
        } else if (searchText !== placeholderText) {
            userSearch();
        }
    }, [searchText]);

    return (
        <Searchbar 
        searchText={searchText ? searchText : placeholderText} 
        searchResults={searchResults} 
        onUserTyping={onUserTyping} 
        onUserSearching={userSearch} 
        onSearchBlur={onSearchBlur} 
        onSearchFocus={onSearchFocus} 
        showSuggestions={showSuggestions}
        />
    ) 

    function onUserTyping(searchQuery) {
        setSearchText(searchQuery);
    }

    function userSearch() {
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