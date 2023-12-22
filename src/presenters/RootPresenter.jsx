import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import RootView from "../views/RootView";
import {
  signInACB,
  signOutACB,
  queryUsername,
} from "../firebase/firebaseModel";
import { searchMovie } from "../services/firePinsSource";
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
  const [newPostRating, setNewPostRating] = useState(0);
  const [genreNames, setGenreNames] = useState([]);

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

  // Handle post rating
  function handlePostRating(rating) {
    setNewPostRating(rating);
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

      props.model.createPostEditor.setTMDBgenres(genreNames);
      props.model.createPostEditor.setRating(newPostRating);

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
      // Reset rating
      setNewPostRating(0);
    }
  }

  // Handle reset create post status
  function handleResetCreatePostStatus() {
    props.model.createPostEditor.setCreatePostStatus(null);
  }

  // Handle search movie depending on search API source use async/await
  async function handleSearchMovie() {
    setIsSearching(true);
    if (searchApiSource === sourceENUM.TMDB) {
      const results = await searchMovie(searchTextTMDB);
      // Remove movies without poster_path from the results
      results.forEach((movie, index) => {
        if (!movie.poster_path) {
          results.splice(index, 1);
        }
      });
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
      setNewPostRating(0);
    };
  }, [searchTextTMDB]);

  // Find genre name from genre ID when selected movie object changes
  useEffect(() => {
    if (selectedMovieObject) {
      const genreNames = [];
      selectedMovieObject.genre_ids.forEach((genreID) => {
        const genreName = props.model.listOfTMDBgenre.find(
          (genre) => genre.id === genreID
        ).name;
        genreNames.push(genreName);
      });
      setGenreNames(genreNames);
    }
  }, [selectedMovieObject]);

  // State for searchbar
  const placeholderText = "Find a user";

  const [searchText, setSearchText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [showSuggestions, setShowSuggestions] = useState();
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searchText === "") {
      setSearchResults([]);
    }

    const timeoutId = setTimeout(() => {
      if (searchText !== placeholderText) {
        setSearching(true);
        userSearch().then(() => {
          setSearching(false);
        });
      }
    }, 250);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  function onUserTyping(searchQuery) {
    setSearchText(searchQuery);
  }

  async function userSearch() {
    if (searchText) {
      setSearchResults(await queryUsername(searchText));
    }
  }

  function onSearchBlur() {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  }

  function onSearchFocus() {
    setShowSuggestions(true);
  }

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
      createNewPostStatus={props.model.createPostEditor.createPostStatus}
      resetCreatePostStatus={handleResetCreatePostStatus}
      newPostRating={newPostRating}
      onSetPostRating={handlePostRating}
      searchbarText={searchText}
      placeholderText={placeholderText}
      searching={searching}
      searchResults={searchResults}
      onUserTyping={onUserTyping}
      onUserSearching={userSearch}
      onSearchBlur={onSearchBlur}
      onSearchFocus={onSearchFocus}
      showSuggestions={showSuggestions}
    />
  );
}

export default observer(RootPresenter);
