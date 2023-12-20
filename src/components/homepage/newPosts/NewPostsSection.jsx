import InfiniteScroll from "react-infinite-scroller";
import Post from "./SummarizePostCard.jsx";
import defaultProfile from "../../../assets/default-avatar.jpg";
import SuspenseAnimation from "../../global/SuspenseAnimation";

/**
 *
 * @param {Object} props.newPosts - the array of posts to display
 * @param {Object} props.currentUser - the logged in user
 * @param {Function} props.loadMore - Function to load more posts
 * @param {function} props.selectPost - sets the currentPost to the id of the clicked posts
 * @param {function} props.likePost - user wants to like or unlike the post
 * @param {function} props.dislikePost - user wants to dislike or undislike the post
 * @param {function} props.commentOnCurrentPost - to change the comonent state do the modal open
 * @returns
 */

export default function NewPostSection(props) {
  /* CB to render each new post in the array newestPosts */
  function renderNewPosts(post) {
    return (
      <Post
        key={post.id}
        picture={
          post.user.profilePicture ? post.user.profilePicture : defaultProfile
        }
        nickName={post.user.displayName}
        postPicture={post.posterPath}
        postId={post.id}
        postTitle={post.title}
        postBody={post.content}
        nofLikes={post.likes}
        nofDislikes={post.dislikedBy.length}
        currentUID={props.currentUID}
        currentUserLikes={post.likedBy?.includes(props.currentUID)}
        currentUserDislikes={post.dislikedBy?.includes(props.currentUID)}
        deleteDisabled={true}
        selectPost={() => {
          props.selectPost(post.id);
        }}
        likePost={() => {
          props.likePost(post.id);
        }}
        dislikePost={() => {
          props.dislikePost(post.id);
        }}
        commentOnPost={() => {
          props.commentOnCurrentPost(post);
        }}
      />
    );
  }

  return (
    <>
      <p className="text-3xl font-semibold pt-6">Newest Pins</p>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => props.loadMorePosts()}
        hasMore={true}
        initialLoad={true}
        loader={
          <div className="relative p-10" key={0}>
            <SuspenseAnimation loading={true} />
          </div>
        }
      >
        {props.newPosts?.map(renderNewPosts)}
      </InfiniteScroll>
    </>
  );
}
