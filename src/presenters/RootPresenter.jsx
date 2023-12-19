import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import RootView from "../views/RootView";
import { signInACB, signOutACB } from "../firebase/firebaseModel";
import { searchMovie } from "../services/firePinsSource";
import { newPostCreatedToast } from "../utils/toastify";
import { useNavigate } from "react-router-dom";

// Enum for search API source
const sourceENUM = {
  TMDB: "TMDB",
  Unsplash: "Unsplash",
  Pinterest: "Pinterest",
};

function RootPresenter(props) {
  const navigate = useNavigate();
  // State for search movie
  const [isSearching, setIsSearching] = useState(false);
  const [searchTextTMDB, setSearchTextTMDB] = useState("");
  const [searchResultsTMDB, setSearchResultsTMDB] = useState([]);
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const [selectedMovieObject, setSelectedMovieObject] = useState(null);
  const [searchApiSource, setSearchApiSource] = useState(sourceENUM.TMDB);
  const [newPostCaption, setNewPostCaption] = useState("");

  // Handle set search text
  function handleSetSearchText(text) {
    setSearchTextTMDB(text);
  }

  // Handle select movie
  function handleSelectMovie(movieID) {
    if (selectedMovieID !== movieID) {
      setSelectedMovieID(movieID);
      setSelectedMovieObject(
        searchResultsTMDB.find((movie) => movie.id === movieID)
      );
    } else {
      setSelectedMovieID(null);
      setSelectedMovieObject(null);
    }
  }

  // Handle select search API source
  function handleSelectSearchApiSource(source) {
    setSearchApiSource(source);
  }

  // Handle set new post caption
  function handleSetNewPostCaption(caption) {
    setNewPostCaption(caption);
  }

  // Handle sign out and redirect to home page
  function handleSignOut() {
    signOutACB();
    navigate("/");
  }

  // Handle create new post
  function handleCreateNewPost() {
    if (selectedMovieID && selectedMovieObject) {
      // Complete poster path
      const completePosterPath = `https://image.tmdb.org/t/p/original${selectedMovieObject.poster_path}`;

      // Set new post data to model
      props.model.createPostEditor.setTitle(selectedMovieObject.title);
      props.model.createPostEditor.setPosterPath(completePosterPath);
      props.model.createPostEditor.setContent(newPostCaption);
      props.model.createPostEditor.setSource(searchApiSource);
      props.model.createPostEditor.setTMDBdateOfMovieRelease(
        selectedMovieObject.release_date
      );
      props.model.createPostEditor.setPostDescription(
        selectedMovieObject.overview
      );
      props.model.createPostEditor.setTMDBsourceID(selectedMovieObject.id);
      props.model.createPostEditor.setTMDBgenreID(
        selectedMovieObject.genre_ids
      );

      // Create new post
      props.model.createPost();

      // Reset new post caption
      setNewPostCaption("");
      // Reset selected movie ID
      setSelectedMovieID(null);
      // Reset selected movie object
      setSelectedMovieObject(null);
      // Reset search text
      setSearchTextTMDB("");
      // Reset search results
      setSearchResultsTMDB([]);

      // Notify user of new post creation
      newPostCreatedToast();
    }
  }

  // Handle search movie depending on search API source use async/await
  async function handleSearchMovie() {
    setIsSearching(true);
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
    setIsSearching(false);
  }

  // Search for movies in TMDB on searchTextTMDB change
  // Wait for user to stop typing for 500ms before searching TMDB
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearchMovie();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      setSelectedMovieID(null);
      setSelectedMovieObject(null);
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
      onSignOut={handleSignOut}
      isSearching={isSearching}
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
