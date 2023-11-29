import { useState } from "react";
import Searchbar from "../views/Searchbar";
import { observer } from "mobx-react-lite";

/*
    Searchbar presenter

    Uses component state for the text in the searchbar

    Recieves the following props:
    searchAccounts - method used to find accounts related to the search query provided by the user
*/
function SearchbarPresenter(props) {
    const placeholderText = "Find your favorites";
    const [searchText, setSearchText] = useState();

    return (
        <Searchbar searchText={searchText ? searchText : placeholderText} onUserTyping={onUserTyping} onUserSearching={onUserSearching} />
    ) 

    function onUserTyping(searchText) {
        if (searchText !== placeholderText)
            setSearchText(searchText);
    }

    function onUserSearching() {
        console.log("searching.. " + searchText);
        // props.model.searchAccounts(searchText);
        // window.location.hash = ...;
    }
}

export default observer(SearchbarPresenter);    