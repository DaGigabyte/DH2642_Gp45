import { Rating } from "react-simple-star-rating";

function NewPostRating(props) {
  return (
    <div className="flex items-center mt-4 pt-4 border-t border-gray-300">
      <p className="mr-4">Please rate this movie:</p>
      {/* Rating */}
      <Rating
        onClick={props.onSetPostRating}
        initialValue={props.newPostRating}
        showTooltip={true}
        fillColorArray={["#f14f45", "#f16c45", "#f18845", "#f1b345", "#f1d045"]}
        tooltipArray={["Terrible", "Bad", "Average", "Great", "Prefect"]}
        readonly={!props.selectedMovieID}
      />
    </div>
  );
}

export default NewPostRating;
