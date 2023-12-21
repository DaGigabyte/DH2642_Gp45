import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
// Icons
import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";

function UserProfilePins(props) {
  console.log(props.userPins);
  return (
    <div>
      {/* List of user pins as masonry cards */}
      <div className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-6 gap-4 space-y-4 p-4">
        {props.userPins.map((pin) => {
          // Generate a random height between 300px and 400px
          const randomHeight =
            Math.floor(Math.random() * (350 - 250 + 1)) + 250;

          return (
            <div
              key={pin.id}
              className="relative p-2 bg-white/50 rounded-lg break-inside-avoid-column group hover:cursor-pointer"
            >
              <Link to={`/post/${pin.id}`}>
                {/* Cover container */}
                <div
                  className="relative overflow-hidden rounded-lg shadow-md"
                  style={{ height: `${randomHeight}px` }}
                >
                  {/* Cover image */}
                  <img
                    src={pin.posterPath}
                    alt={pin.title}
                    style={{ height: `${randomHeight}px` }}
                    className="w-full object-cover rounded-lg group-hover:opacity-80 group-hover:scale-105 group-hover:rotate-3 transition-all duration-150 "
                  />
                  {/* Rating */}
                  <div className="flex justify-center items-center absolute bottom-0 right-0 left-0">
                    <div className="bg-black/50 p-2 pt-0 rounded-tr-md rounded-tl-md">
                      <Rating
                        initialValue={pin.rating}
                        readonly={true}
                        size={20}
                      />
                    </div>
                  </div>
                </div>
                {/* Title */}
                <div className="mt-2">
                  <p className="text-lg font-semibold text-pins-secondary">
                    {pin.title}
                  </p>
                  {pin.TMDBdateOfMovieRelease && (
                    <p className="text-black/50">
                      Released {pin.TMDBdateOfMovieRelease}
                    </p>
                  )}
                </div>
              </Link>
              {/* Like, dislike and comment */}
              <div className="md:hidden group-hover:md:flex flex justify-end items-center absolute top-2 right-2 left-2 p-2 space-x-1">
                <button className="flex justify-center items-center bg-pins-light p-2 rounded-full text-pins-secondary hover:text-pins-light hover:bg-pins-primary transition ease-in-out">
                  <BiCommentDetail size="25" />
                </button>
                <button className="flex justify-center items-center bg-pins-light p-2 rounded-full text-pins-secondary hover:text-pins-light hover:bg-pins-primary transition ease-in-out">
                  <BiLike size="25" />
                </button>
                <button className="flex justify-center items-center bg-pins-light p-2 rounded-full text-pins-secondary hover:text-pins-light hover:bg-pins-primary transition ease-in-out">
                  <BiDislike size="25" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfilePins;
