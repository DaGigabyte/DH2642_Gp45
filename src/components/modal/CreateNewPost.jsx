/**
 * @param {function} props.setSearchTextTMDB set search text for TMDB
 * @param {array} props.searchResultsTMDB search results array for TMDB
 */

function CreateNewPost(props) {
  // Handle search input change
  function handleSearchInputChange(event) {
    props.setSearchTextTMDB(event.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        placeholder="Search for a movie"
        value={props.searchTextTMDB}
        className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
        onChange={handleSearchInputChange}
      />
      <div className="flex items-start space-x-2 scroll-m-2">
        {props.searchResultsTMDB &&
          props.searchResultsTMDB.map((result) => {
            return (
              <div
                key={result.id}
                className="flex flex-col items-center justify-center w-32"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                  alt={result.title}
                  className="w-32 h-48 rounded-lg"
                />
                <p className="text-center">{result.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CreateNewPost;
