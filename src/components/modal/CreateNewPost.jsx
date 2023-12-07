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
        className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
        onChange={handleSearchInputChange}
      />
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {props.searchResultsTMDB &&
            props.searchResultsTMDB.map((result) => {
              return (
                <SwiperSlide key={result.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                    alt={result.title}
                    className="w-32 h-48 rounded-lg object-cover"
                  />
                  <p className="text-center text-ellipsis overflow-hidden">
                    {result.title}
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
