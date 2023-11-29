/*
    Searchbar view compontent. 

    Recieves the following props:
    searchText - The text to be shown in the searchbar
    onUserTyping - Event that passes text in the searchbar to presenter
    onUserSearching - Event signaling that the user is performing a search

*/
function Searchbar(props) {
    return (
        <div>
            <input onChange={userTyping} onKeyDown={userKeyPressed} placeholder={props.searchText} className="bg-white rounded-full w-full text-gray-400" />
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