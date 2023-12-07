// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function NewPostSearchResults(props) {
  return (
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
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
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
  );
}

export default NewPostSearchResults;
