function NewPostSelectApiSource(props) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-4">
      <ul className="items-center w-full text-sm font-medium text-pins-secondary bg-white border border-gray-200 rounded-lg sm:flex">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
          <div className="flex items-center ps-3">
            <input
              id="TMDB"
              type="radio"
              value={props.sourceENUM.TMDB}
              name="list-radio"
              checked={props.searchApiSource === props.sourceENUM.TMDB}
              onChange={() =>
                props.onSelectSearchApiSource(props.sourceENUM.TMDB)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <button
              htmlFor="TMDB"
              className="w-full py-3 ms-2 text-sm font-medium text-pins-secondary text-left"
              onClick={() =>
                props.onSelectSearchApiSource(props.sourceENUM.TMDB)
              }
            >
              {props.sourceENUM.TMDB}
            </button>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
          <div className="flex items-center ps-3">
            <input
              id="Unsplash"
              type="radio"
              value={props.sourceENUM.Unsplash}
              name="list-radio"
              checked={props.searchApiSource === props.sourceENUM.Unsplash}
              onChange={() =>
                props.onSelectSearchApiSource(props.sourceENUM.Unsplash)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              disabled
            />
            <button
              htmlFor="Unsplash"
              className="w-full py-3 ms-2 text-sm font-medium text-pins-secondary text-left cursor-not-allowed"
              onClick={() =>
                props.onSelectSearchApiSource(props.sourceENUM.Unsplash)
              }
              disabled
            >
              {props.sourceENUM.Unsplash}
            </button>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
          <div className="flex items-center ps-3">
            <input
              id="Pinterest"
              type="radio"
              value={props.sourceENUM.Pinterest}
              name="list-radio"
              checked={props.searchApiSource === props.sourceENUM.Pinterest}
              onChange={() =>
                props.onSelectSearchApiSource(props.sourceENUM.Pinterest)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              disabled
            />
            <button
              htmlFor="Pinterest"
              className="w-full py-3 ms-2 text-sm font-medium text-pins-secondary text-left cursor-not-allowed"
              onClick={() =>
                props.onSelectSearchApiSource(props.sourceENUM.Pinterest)
              }
              disabled
            >
              {props.sourceENUM.Pinterest}
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default NewPostSelectApiSource;
