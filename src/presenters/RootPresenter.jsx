import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import RootView from "../views/RootView";
import { signInACB, signOutACB } from "../firebase/firebaseModel";
import { searchMovie } from "../services/firePinsSource";

// Enum for search API source
const sourceENUM = {
  TMDB: "TMDB",
  Unsplash: "Unsplash",
  Pinterest: "Pinterest",
};

function RootPresenter(props) {
  // State for search movie
  const [searchTextTMDB, setSearchTextTMDB] = useState("");
  const [searchResultsTMDB, setSearchResultsTMDB] = useState([]);
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const [searchApiSource, setSearchApiSource] = useState(sourceENUM.TMDB);
  const [newPostCaption, setNewPostCaption] = useState("");

  // Handle set search text
  function handleSetSearchText(text) {
    setSearchTextTMDB(text);
  }

  // Handle select movie
  function handleSelectMovie(movieID) {
    setSelectedMovieID(movieID);
  }

  // Handle select search API source
  function handleSelectSearchApiSource(source) {
    setSearchApiSource(source);
  }

  // Handle set new post caption
  function handleSetNewPostCaption(caption) {
    setNewPostCaption(caption);
  }

  // Handle create new post
  function handleCreateNewPost() {
    if (selectedMovieID !== null) {
      // Get movie title from search results for selected movie
      const movieTitle = searchResultsTMDB.find(
        (movie) => movie.id === selectedMovieID
      ).title;

      // Get movie poster path from search results for selected movie
      const moviePosterPath = searchResultsTMDB.find(
        (movie) => movie.id === selectedMovieID
      ).poster_path;

      // Complete poster path
      const completePosterPath = `https://image.tmdb.org/t/p/original${moviePosterPath}`;

      // Set new post data to model
      props.model.createPostEditor.setTitle(movieTitle);
      props.model.createPostEditor.setPosterPath(completePosterPath);
      props.model.createPostEditor.setContent(newPostCaption);

      // Create new post
      props.model.createPost();

      // Reset new post caption
      setNewPostCaption("");
      // Reset selected movie ID
      setSelectedMovieID(null);
      // Reset search text
      setSearchTextTMDB("");
      // Reset search results
      setSearchResultsTMDB([]);
    }
  }

  // Handle search movie depending on search API source use async/await
  async function handleSearchMovie() {
    if (searchApiSource === sourceENUM.TMDB) {
      const results = await searchMovie(searchTextTMDB);
      setSearchResultsTMDB(results);
    } else if (searchApiSource === sourceENUM.Unsplash) {
      console.log("Unsplash");
    } else if (searchApiSource === sourceENUM.Pinterest) {
      console.log("Pinterest");
    } else {
      console.log("No search API source selected");
    }
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
      selectedMovieID={selectedMovieID}
      onSelectMovie={handleSelectMovie}
      sourceENUM={sourceENUM}
      searchApiSource={searchApiSource}
      onSelectSearchApiSource={handleSelectSearchApiSource}
      newPostCaption={newPostCaption}
      onSetNewPostCaption={handleSetNewPostCaption}
      onCreateNewPost={handleCreateNewPost}
    />
  );
}

export default observer(RootPresenter);
