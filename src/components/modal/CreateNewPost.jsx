import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

/**
 * @param {function} props.setSearchTextTMDB set search text for TMDB
 * @param {array} props.searchResultsTMDB search results array for TMDB
 */

function CreateNewPost(props) {
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
    <div className="flex flex-col">
      <p className="text-sm text-pins-grey-darker mb-4 -mt-4">
        Share your favorites with others
      </p>
      {/* Search input */}
      <input
        type="text"
        placeholder={handlePlaceholderText()}
        value={props.searchTextTMDB}
        className="border-2 border-gray-300 rounded-lg px-2 py-3 text-lg mb-4 w-full bg-pins-light focus:border-pins-primary focus:outline-none transition duration-150 ease-in-out"
        onChange={handleSearchInputChange}
      />
      {/* Select API source for search */}
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
      {/* Search results */}
      <div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {props.searchResultsTMDB.length > 0 ? (
            props.searchResultsTMDB.map((movie) => {
              return (
                <SwiperSlide
                  onClick={() => props.onSelectMovie(movie.id)}
                  key={movie.id}
                  className="w-32"
                >
                  <div
                    className={`relative w-32 rounded-lg overflow-hidden ${
                      props.selectedMovieID === movie.id
                        ? "shadow-black/50 shadow-lg opacity-80"
                        : ""
                    }`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      className="w-32 h-full rounded-lg object-cover transition duration-150 ease-in-out transform hover:scale-110"
                    />
                    {props.selectedMovieID === movie.id ? (
                      <div className="absolute inset-0 flex bg-pins-primary bg-opacity-50 rounded-lg items-center justify-center text-white">
                        SELECTED
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className="h-16 text-center text-ellipsis whitespace-nowrap overflow-hidden mt-2">
                    {movie.title}
                  </p>
                </SwiperSlide>
              );
            })
          ) : (
            <p className="text-center">No results found</p>
          )}
        </Swiper>
      </div>
      {/* Caption input */}
      <div className="flex flex-col mt-4">
        <textarea
          id="caption"
          className="border-2 border-gray-300 rounded-lg px-2 py-3 text-lg mt-2 bg-pins-light focus:border-pins-primary focus:outline-none transition duration-150 ease-in-out"
          placeholder="Add a caption..."
          value={props.newPostCaption}
          onChange={(event) => props.onSetNewPostCaption(event.target.value)}
        />
      </div>
    </div>
  );
}

export default CreateNewPost;
