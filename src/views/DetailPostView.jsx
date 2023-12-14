import ProfileBox from "./profilePicAndNick"
import ReturnButton from "../components/navigation/ReturnButton.jsx"
import defaultPic from "../assets/default-avatar.jpg"
import { BiLike, BiDislike } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
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
                /*logged in users activates button by typing*/
                <div className="w-full flex flex-col lg:flex-row gap-1 items-end justify-items-end mb-4">
                    <textarea
                        className="w-full border rounded-xl p-2 bg-pins-light content-start min-h-[3rem]"
                        id="commentBox"
                        type="text"
                        placeholder={props.commentText ? props.commentText : "Enter Comment"}
                        onInput={(evt) => { props.userEntersComment(evt.target.value) }} />
                    <button className="mt-1 purpleButton text-xl font-medium min-w-[182px] w-full md:w-auto h-auto inline-block disabled:opacity-50 disabled:cursor-not-allowed  hover:disabled:border-gray-300"
                        onClick={() => props.storeComment()} title="Enter text to enable" disabled={props.commentText ? false : true}>Post Comment</button>
                </div>)
        }
        /* not logged in users sees log in message and disabled textarea and button*/
        else return (<div className="w-full flex flex-col lg:flex-row gap-1 items-end justify-items-end mb-4">
            <textarea className="w-full border rounded-xl p-2 content-start min-h-[3rem] bg-pins-light disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:bg-gray-200 hover:disabled:border-gray-300"
                disabled placeholder="Log in to enter text" />
            <button className="mt-1 purpleButton text-xl font-medium w-full md:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed  hover:disabled:border-gray-300" disabled>Log in to post a comment</button>
        </div>)
    }

    /* Renders the comments of the displayed post */
    function renderCommentSection() {
        if (props.postComments.length < 1)
            return (
                <div className="rounded-xl shadow text-center p-3 text-lg font-medium bg-pins-light">Be the first to comment on this!</div>)
        else {
            return (props.postComments.map(renderCommentCB))
        }
    }

    /* CB to render each comment*/
    function renderCommentCB(comment) {
        return (
            /* container */
            <div key={comment.id} className="flex flex-col border rounded-xl p-3 pl-6 pr-6 gap-2 mb-1">
                {/* user profile */}
                <div className="flex gap-4 items-center">
                    <img src={comment.user.userPicture} alt="/" className=" rounded-full h-12 w-12"></img>
                    <span className="text-start text-xl font-medium">{comment.user.userName}</span>
                </div>
                {/* comment */}
                <div className="border bg-pins-light rounded-lg p-3">
                    <p>{comment.content}</p>
                </div>
            </div>
        )
    }

    /* CB to handle onclick on dislike button */
    function handleDislikeClickACB() {
        props.userDislikesPost();
    }

    /* CB to handle onclick on like button */
    function handleLikeClickACB() {
        props.userLikesPost();
    }


    return (
        /* Full rended container */
        <div className="flex flex-col gap-2 w-full max-w-6xl">
            {/*Content container */}
            <div className="relative bg-white rounded-2xl flex flex-col lg:flex-row p-3 lg:p-6 gap-5">
                {/* return button with nav top right */}
                <ReturnButton size="30" />

                {/* poster image container */}
                <div className="shrink-0 aspect-square lg:aspect-auto max-h-[500px] lg:max-w-[350px] rounded-xl border shadow overflow-hidden ">
                    <img className="w-full h-full object-cover" src={props.post.posterPath} alt="/" />
                </div>
                {/* user and text container */}
                <div className="flex flex-col w-full mt-6 pl-4">

                    {/* user profile */}
                    <span className="text-3xl w-fit rounded-full py-1 pr-3 mb-3 hover:cursor-pointer hover:shadow hover:bg-pins-light transition duration-300"
                        onClick={() => { alert("Navigate to profile, firebase user id is missing") }}
                        title="Go to Profile">
                        {/* User dont exist anymore? */}
                        {props.post.user && <ProfileBox
                            picture={props.post.user.profilePicture ? props.post.user.profilePicture : defaultPic}
                            nick={props.post.user.displayName}
                        />}
                    </span>

                    {/* Title */}
                    <div className="text-3xl">{props.post.title}</div>

                    {/* content */}
                    <div className="text-lg max-h-96 overflow-y-scroll scrollbar-hide">{props.post.content}</div>

                    {/* Interaction buttons */}
                    <div className="flex justify-end items-center mt-auto">
                        <div className="pr-1 text-md font-light">dislikes: {props.nofDislikes}</div>
                        <div title="Click to dislike" onClick={handleDislikeClickACB} className="postModifyingButtons hover:bg-gray-200">
                            <BiDislike size="40" className={props.isDislikedByUser ? "text-pins-primary" : "text-black"} />
                        </div>
                        <div className="pl-4 pr-1 text-md font-light">likes: {props.nofLikes}</div>
                        <div title="Click to like" onClick={handleLikeClickACB} className="postModifyingButtons hover:bg-gray-200">
                            <BiLike size="40" className={props.isLikedByUser ? "text-pins-primary" : "text-black"} />
                        </div>
                    </div>
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