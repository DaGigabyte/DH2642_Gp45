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

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Search for a movie"
        value={props.searchTextTMDB}
        className="border-2 border-gray-300 rounded-lg p-2 mb-4 w-full"
        onChange={handleSearchInputChange}
      />
      <div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          grabCursor={true}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {props.searchResultsTMDB &&
            props.searchResultsTMDB.map((movie) => {
              return (
                <SwiperSlide key={movie.id} className="w-32">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-32 h-full rounded-lg object-cover"
                  />
                  <p className="h-16 text-center text-ellipsis whitespace-nowrap overflow-hidden">
                    {movie.title}
                  </p>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default CreateNewPost;
