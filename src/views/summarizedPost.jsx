import { BiLike, BiDislike, BiCommentDetail } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
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
export default function SummarizedPost(props) {
  const navigate = useNavigate();
  /*OnClick ACBs*/
  function handlePostClickACB() {
    props.selectPost();
    navigate("post/" + props.postId );
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
             hover:bg-gray-200 transition duration-300 mb-5"
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
        <div className="flex items-end pb-3 space-x-4">
          <span className="mr-2">
            <img src={props.picture} alt="profile picture" className="w-14 h-14 rounded-full" />
          </span>
          <span className="text-3xl">{props.nickName}</span>
        </div>

        {/* Post Content */}
        <span className="text-2xl line-clamp-1 font-semibold">
          {props.postTitle}
        </span>
        <span className="text-lg line-clamp-3 font-normal">
          {props.postBody}
        </span>

        {/* LikeButtons  xl:absolute xl:bottom-5 xl:right-10*/}
        <div className="flex justify-end items-center mt-auto">
          <div title="Click to comment" onClick={handleCommentClickACB} className="postModifyingButtons"><BiCommentDetail size="40" /></div>
          <div className="pl-4 pr-1 text-s font-light">dislikes: {props.nofDislikes}</div>
          <div title="Click to dislike" onClick={handleDislikeClickACB} className="postModifyingButtons"><BiDislike size="40" className={props.currentUserDislike ? "text-pins-primary": "text-black"} /></div>
          <div className="pl-4 pr-1 text-s font-light">likes: {props.nofLikes}</div>
          <div title="Click to like" onClick={handleLikeClickACB} className="postModifyingButtons"><BiLike size="40" className={props.currentUserLike ? "text-pins-primary": "text-black"} /></div>
        </div>
      </div>

      {/* Source Badge */}
      <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl overflow-hidden">
        <div className="bg-pins-primary py-2 px-8 text-xl text-white"> TMDB</div>
      </div>
    </div>
  );
}
