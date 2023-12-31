import UserProfileCard from "../components/global/UserProfileCard.jsx";
import ReturnButton from "../components/navigation/ReturnButton.jsx";
import SuspenseAnimation from "../components/global/SuspenseAnimation";
import DeletePostButton from "../components/global/DeletePostButton.jsx";
import { BiLike, BiDislike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { IoReloadOutline } from "react-icons/io5";

/**
 * Renders the Detailed post view
 * @param {Object} props.post - The post to display
 * @returns {React.Element} A render of the post
 */
function DetailedPostView(props) {
  const navigate = useNavigate();

  /* Renders the conditional input box and button for comments. */
  function renderInputForVerifiedUser() {
    if (props.currentUID) {
      return (
        /*logged-in users activates button by typing*/
        <div className="w-full flex flex-col lg:flex-row gap-1 items-end justify-items-end mb-4">
          <textarea
            className="w-full border rounded-xl p-2 bg-pins-light content-start min-h-[3rem]"
            id="commentBox"
            type="text"
            placeholder={
              props.commentText ? props.commentText : "Enter Comment"
            }
            onInput={(evt) => {
              props.userEntersComment(evt.target.value);
            }}
          />
          <button
            className="mt-1 purpleButton text-xl font-medium min-w-[182px] w-full md:w-auto h-auto inline-block disabled:opacity-50 disabled:cursor-not-allowed  hover:disabled:border-gray-300"
            onClick={() => props.storeComment()}
            title="Enter text to enable"
            disabled={props.commentText ? false : true}
          >
            {props.commentStatus === "loading" ? (
              <div className="flex items-center justify-center">
                <IoReloadOutline size={20} className="animate-spin mr-2" />
                Posting...
              </div>
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
      );
    } else
    /* not logged in users sees log in message and disabled textarea and button*/
      return (
        <div className="w-full flex flex-col lg:flex-row gap-1 items-end justify-items-end mb-4">
          <textarea
            id="commentBoxNotLoggedIn"
            className="w-full border rounded-xl p-2 content-start min-h-[3rem] bg-pins-light disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-gray-200 hover:disabled:border-gray-300"
            disabled
            placeholder="Log in to enter text"
          />
          <button
            className="mt-1 purpleButton text-xl font-medium w-full md:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed  hover:disabled:border-gray-300"
            disabled
          >
            Log in to post a comment
          </button>
        </div>
      );
  }

  /* Renders the comments of the displayed post */
  function renderCommentSection() {
    if (props.comments === null)
      return (
        <div className="relative mt-10">
          <SuspenseAnimation loading={true} />
        </div>
      );

    if (!props.comments || props.comments.length < 1)
      return (
        <div className="rounded-xl shadow text-center p-3 text-lg font-medium bg-pins-light">
          Be the first to comment on this!
        </div>
      );
    else {
      return props.comments.map(renderCommentCB);
    }
  }

  /* CB to render each comment*/
  function renderCommentCB(comment) {
    return (
      /* container */
      <div
        key={comment.id || comment.createdAt.nanoseconds + comment.createdBy}
        className="flex flex-col border rounded-xl p-3 pl-6 pr-6 gap-2 mb-1"
      >
        {/* user profile */}
        <button
          onClick={() => navigate("/profile/" + comment.createdBy)}
          className="clickableProfile"
        >
          <UserProfileCard
            picture={comment.profilePicture}
            nick={comment.displayName ? comment.displayName : "anonymous"}
            size="12"
            textSize="xl"
          />
        </button>

        <div className="flex w-full">
          {/* comment */}
          <p className="border bg-pins-light bg-opacity-30 rounded p-3 shadow w-full">
            {comment.content}
          </p>

          {/* Only visible if uid = post.uid */}
          {props.currentUID === comment.createdBy && comment.id && (
            <div className="flex justify-end mt-auto pr-1">
              <DeletePostButton
                handleOnClick={() =>
                  props.handleDeleteRequest({
                    type: props.deleteTypes.COMMENT,
                    id: comment?.id,
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  /* CB to handle onclick on dislike button */
  function handleDislikeClickACB() {
    props.userDislikesPost();
  }

  /* CB to handle onclick on like button */
  function handleLikeClickACB() {
    props.userLikesPost();
  }

  /* Full rended container */
  return (
    <div className="w-full max-w-6xl">
      <div className="relative bg-white rounded-2xl mb-3 p-3">
        {/*Content container */}
        <div className=" flex flex-col lg:flex-row p-2 gap-3">
          {/* return button with nav top right */}
          <ReturnButton size="30" />

          {/* poster image container */}
          <div className="shrink-0 aspect-square lg:aspect-auto max-h-[500px] lg:max-w-[350px] rounded-xl border shadow overflow-hidden ">
            <img
              className="w-full h-full object-cover"
              src={props.post.posterPath}
              alt="/"
            />
          </div>
          {/* user and text container */}
          <div className="flex flex-col w-full mt-3 pl-4 mb-2">
            {/* user profile */}
            <span
              className="clickableProfile"
              onClick={() => {
                navigate("/profile/" + props.post.createdBy);
              }}
              title="Go to Profile"
            >
              <UserProfileCard
                picture={props.post.user?.profilePicture}
                nick={props.post.user?.displayName}
              />
            </span>

            {/* Caption */}
            <div className="mb-5 bg-gray-100 rounded p-3 ">
              <p className="line-clamp-3 overflow-scroll scrollbar-hide clear-left text-xl leading-8">
                <span className="bg-pins-primary  rounded px-2 mr-2  text-white h-min w-min ">
                  Caption
                </span>
                {props.post.content}
              </p>
              {props.rating && (
                <div className="mt-3">
                  <Rating
                    initialValue={props.rating}
                    readonly={true}
                    fillColorArray={[
                      "#f14f45",
                      "#f16c45",
                      "#f18845",
                      "#f1b345",
                      "#f1d045",
                    ]}
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="text-3xl px-1.5 ">{props.post.title}</div>
            {props.post.TMDBdateOfMovieRelease && (
              <p className="movieReleaseDate">
                released {props.post.TMDBdateOfMovieRelease}
              </p>
            )}

            {/* content */}
            <div className="flex flex-col h-full p-1.5 mt-2">
              <p className="text-lg line-clamp-6 overflow-y-scroll scrollbar-hide">
                {props.fullPost
                  ? props.fullPost.overview
                  : "*** Movie details missing ***"}
              </p>
            </div>
          </div>
        </div>
        {/* Interaction buttons */}
        <div className="flex gap-5 items-center justify-end mt-auto">
          <button
            title="Click to like"
            onClick={handleLikeClickACB}
            className="postModifyingButtons hover:bg-gray-200"
            disabled={props.currentUID ? false : true}
          >
            {props.nofLikes}
            <BiLike
              size="40"
              className={
                props.isLikedByUser ? "text-pins-primary" : "text-black"
              }
            />
          </button>
          <button
            title="Click to dislike"
            onClick={handleDislikeClickACB}
            className="postModifyingButtons hover:bg-gray-200"
            disabled={props.currentUID ? false : true}
          >
            {props.nofDislikes}
            <BiDislike
              size="40"
              className={
                props.isDislikedByUser ? "text-pins-primary" : "text-black"
              }
            />
          </button>
          {/* Only visible if uid = post.uid */}
          {props.currentUID === props.post.createdBy && (
            <DeletePostButton
              handleOnClick={() =>
                props.handleDeleteRequest({
                  type: props.deleteTypes.PIN,
                  id: props.post.id,
                })
              }
            />
          )}
        </div>
      </div>

      {/* Comment container */}
      <div className="p-5 bg-white rounded-2xl flex flex-col">
        {renderInputForVerifiedUser()}
        {renderCommentSection()}
      </div>
    </div>
  );
}

export default DetailedPostView;
