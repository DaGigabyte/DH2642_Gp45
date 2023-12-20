import { Rating } from "react-simple-star-rating";

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
              className="p-2 bg-white/50 rounded-lg break-inside-avoid-column group"
            >
              {/* Cover container */}
              <div
                className="relative overflow-hidden"
                style={{ height: `${randomHeight}px` }}
              >
                <img
                  src={pin.posterPath}
                  alt={pin.title}
                  style={{ height: `${randomHeight}px` }}
                  className="w-full object-cover rounded-lg shadow-md"
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
                <p className="text-lg font-semibold">{pin.title}</p>
                {pin.TMDBdateOfMovieRelease && (
                  <p className="text-black/50">
                    Released {pin.TMDBdateOfMovieRelease}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfilePins;
