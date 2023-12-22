function NewPostSearchInput(props) {
  // Handle search input change
  function handleSearchInputChange(event) {
    props.setSearchTextTMDB(event.target.value);
  }

  // Handle display correct placeholder text
  function handlePlaceholderText() {
    if (props.searchApiSource === props.sourceENUM.TMDB) {
      return "Search for a movie on TMDB";
    } else if (props.searchApiSource === props.sourceENUM.Unsplash) {
      return "Search for a photo on Unsplash";
    } else if (props.searchApiSource === props.sourceENUM.Pinterest) {
      return "Search for a pin on Pinterest";
    } else {
      return "Search here";
    }
  }

  return (
    <input
      type="text"
      id="search-input"
      placeholder={handlePlaceholderText()}
      value={props.searchTextTMDB}
      className="border-2 border-gray-300 rounded-lg px-2 py-3 text-lg mb-4 w-full bg-pins-light focus:border-pins-primary focus:outline-none transition duration-150 ease-in-out"
      onChange={handleSearchInputChange}
    />
  );
}

export default NewPostSearchInput;
