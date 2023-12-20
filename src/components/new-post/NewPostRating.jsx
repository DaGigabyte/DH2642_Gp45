import { Rating } from "react-simple-star-rating";

function NewPostRating() {
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  return (
    <div className="flex items-center mt-4 pt-4 border-t border-gray-300">
      <p className="mr-4">Please rate this movie:</p>
      {/* Rating */}
      <Rating
        onClick={() => console.log("Click")}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        showTooltip={true}
        fillColorArray={["#f14f45", "#f16c45", "#f18845", "#f1b345", "#f1d045"]}
        tooltipArray={["Terrible", "Bad", "Average", "Great", "Prefect"]}
        emptyClassName="flex"
        fillClassName="flex"
      />
    </div>
  );
}

export default NewPostRating;
