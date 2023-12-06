import { FaMagnifyingGlass } from "react-icons/fa6";
/*
    Searchbar view component. 

    Recieves the following props:
    searchText - The text to be shown in the searchbar
    onUserTyping - Event that passes text in the searchbar to presenter
    onUserSearching - Event signaling that the user is performing a search

*/
function Searchbar(props) {
    return (
        <div className="relative">
            <input onChange={userTyping} onKeyDown={userKeyPressed} placeholder={props.searchText} className="bg-white p-2 pl-4 pr-10 rounded-full w-full focus:outline-none text-gray-400" />
            <FaMagnifyingGlass onClick={userSearching} className="absolute top-3 right-4"/>
        </div> 
    );

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
}

export default Searchbar;