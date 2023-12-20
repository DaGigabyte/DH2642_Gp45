import InfiniteScroll from "react-infinite-scroller";
import SuspenseAnimation from "../global/SuspenseAnimation.jsx";
import SummarizePostCard from "../homepage/newPosts/SummarizePostCard.jsx";

/**
 *
 * @param {Object} props.posts - an array of posts
 * @param {String} props.currentUID - currently logged-in users id
 * @param {Function} props.loadMorePosts - a function to load more posts
 * @param {Function} props.selectPost - a function to select a posts as current and view details
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProfilePostsSection(props) {
  function renderPost(post) {
    return (
      <SummarizePostCard
        key={post.id}
        picture={props.user.profilePicture}
        nickName={props.user.displayName}
        currentUID={props.currentUID}
        currentUserLikes={post.likedBy.includes(props.currentUID)}
        currentUserDislikes={post.dislikedBy.includes(props.currentUID)}
        postId={post.id}
        createdBy={post.createdBy}
        nofLikes={post.likes}
        nofDislikes={post.dislikedBy.length}
        postPicture={post.posterPath}
        postTitle={post.postTitle}
        postBody={post.content}
        likePost={() => props.likePost(post.id)}
        dislikePost={() => props.dislikePost(post.id)}
        selectPost={() => props.selectPost(post.id)}
        commentDisabled={true}
        commentOnPost={() =>
          console.error("User not suppose to be able to comment from here")
        }
        deleteDisabled={false}
        deletePost={() => props.deletePost(post.id)}
      />
    );
  }

  return (
    <>
      {props.posts.length > 0 ? (
        props.posts.map(renderPost)
      ) : (
        <div className="mt-15">
          <SuspenseAnimation loading={props.posts.length === 0} />
        </div>
      )}
    </>
  );
}
