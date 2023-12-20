function UserProfilePins(props) {
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
              className="p-2 bg-white/50 rounded-lg break-inside-avoid-column"
            >
              <img
                src={pin.posterPath}
                alt={pin.title}
                style={{ height: `${randomHeight}px` }}
                className="w-full object-cover rounded-lg shadow-md"
              />
              {/* Title */}
              <div className="mt-2">
                <p className="text-lg font-semibold">{pin.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfilePins;
