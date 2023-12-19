import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Profile from "../../global/UserProfileCard";

/**
 * A general component for post diplaying a preview
 * @param {Object} props - Props for the SummarizedPost component.
 * @param {string} props.picture - The URL or source for the profile picture.
 * @param {string} props.nickName - The nickname associated with the post.
 * @param {int}    props.postId - The id of the post
 * @param {int}    props.nofLikes - The nof likes on the post
 * @param {int}    props.nofDislikes - The nof dislikes on the post
 * @param {boolean}    props.currentUserLikes - True if the user has liked
 * @param {boolean}    props.currentUserDislikes - True if the user has disliked
 * @param {string}    props.currentUser - The current user uid
 * @param {string} props.postPicture - The URL or source for the post picture.
 * @param {string} props.postTitle - The URL or source for the post picture.
 * @param {string} props.postBody - The URL or source for the post picture.
 * @param {Function} props.viewPost - CB function triggered when the user clicks on the post.
 * @param {Function} props.dislikePost - CB function triggered when the user clicks the dislike button
 * @param {Function} props.likePost - CB function triggered when the user clicks the like button.
 * @param {Function} props.commentOnPost - function to change the component state of the comment Modal open
 * @returns {React.Element} A component displaying a summarized post preview.
 */
export default function NewPostCard(props) {
  const navigate = useNavigate();

  /*OnClick ACBs*/
  function handlePostClickACB() {
    props.selectPost();

    navigate("post/" + props.postId);
  }

  function handleCommentClickACB(event) {
    event.stopPropagation();
    props.commentOnPost();
  }

  function handleDislikeClickACB(event) {
    event.stopPropagation();
    props.dislikePost();
  }

  function handleLikeClickACB(event) {
    event.stopPropagation();
    props.likePost();
  }

  /* React Component*/
  return (
    <div
      className="relative flex flex-col xl:flex-row space-x-4 w-full text-black text-left 
          rounded-xl border border-gray-300 p-3 bg-white shadow hover:shadow-xl cursor-pointer 
             hover:bg-gray-200 transition duration-300 mb-5 disable-selection"
      onClick={handlePostClickACB}
      title="Click to view post"
    >
      {/* Image container */}
      <div className="shrink-0 aspect-video w-full xl:w-auto min-h-[250px] max-h-[250px] xl:max-h-[300px] overflow-hidden rounded-xl shadow-lg">
        <img
          src={props.postPicture}
          alt="Picture"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Text container */}
      <div className="flex flex-col pl-3 pt-6 pr-3 w-full">
        {/* Profile and name */}
        <Profile
          picture={props.picture}
          nick={props.nickName}
          size="14"
          textSize="3xl"
        />

        {/* Post Content */}
        <span className="text-2xl line-clamp-1 font-semibold mt-3">
          {props.postTitle}
        </span>
        <span className="text-lg line-clamp-3 font-normal">
          {props.postBody}
        </span>

        {/* Interaction buttons*/}
        <div className="flex gap-5 items-center justify-end mt-auto">
          <button
            title={props.currentUID ? "Click to comment" : "Log in to access"}
            onClick={handleCommentClickACB}
            className="postModifyingButtons"
            disabled={props.currentUID ? false : true}
          >
            <IoAddOutline />
            <BiCommentDetail size="40" />
          </button>

          <button
            title={props.currentUID ? "Click to like" : "Log in to access"}
            onClick={handleLikeClickACB}
            className="postModifyingButtons"
            disabled={props.currentUID ? false : true}
          >
            {props.nofLikes}
            <BiLike
              size="40"
              className={
                props.currentUserLikes ? "text-pins-primary" : "text-black"
              }
            />
          </button>

          <button
            title={props.currentUID ? "Click to dislike" : "Log in to access"}
            onClick={handleDislikeClickACB}
            className="postModifyingButtons"
            disabled={props.currentUID ? false : true}
          >
            <p>{props.nofDislikes}</p>
            <BiDislike
              size="40"
              className={
                props.currentUserDislikes ? "text-pins-primary" : "text-black"
              }
            />
          </button>
        </div>
      </div>

      {/* Source Badge */}
      <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl overflow-hidden">
        <div className="bg-pins-primary py-2 px-8 text-xl text-white">
          {" "}
          TMDB
        </div>
      </div>
    </div>
  );
}
