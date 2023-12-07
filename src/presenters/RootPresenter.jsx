import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import RootView from "../views/RootView";
import { signInACB, signOutACB } from "../firebase/firebaseModel";
import { searchMovie } from "../services/firePinsSource";

function RootPresenter(props) {
  // State for search movie
  const [searchTextTMDB, setSearchTextTMDB] = useState("");
  const [searchResultsTMDB, setSearchResultsTMDB] = useState([]);

  // Handle set search text
  function handleSetSearchText(text) {
    setSearchTextTMDB(text);
  }

  // Handle search movie
  async function handleSearchMovie() {
    const results = await searchMovie(searchTextTMDB);
    setSearchResultsTMDB(results);
  }

  // Search for movies in TMDB on searchTextTMDB change
  // Wait for user to stop typing for 500ms before searching TMDB
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearchMovie();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTextTMDB]);

  return (
    <RootView
      user={props.model.user}
      uid={props.model.user?.uid}
      searchText={props.model.searchText}
      setSearchText={(text) => {
        props.model.setSearchText(text);
      }}
      confirmUserSearch={() => {
        props.model.confirmUserSearch();
      }}
      onSignIn={signInACB}
      onSignOut={signOutACB}
      searchTextTMDB={searchTextTMDB}
      setSearchTextTMDB={handleSetSearchText}
      searchResultsTMDB={searchResultsTMDB}
    />
  );
}

export default observer(RootPresenter);
