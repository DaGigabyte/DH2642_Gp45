import NewPostCard from "../homepage/newPosts/NewPostCard";
import defaultProfile from "../../assets/default-avatar.jpg";

export default function TopRatedPostsSection(props) {
  // Render a single post
  function renderTopPosts(post) {
    return (
      <NewPostCard
        key={post.id}
        picture={
          post.user.profilePicture ? post.user.profilePicture : defaultProfile
        }
        nickName={post.user.displayName}
        postPicture={post.posterPath}
        postId={post.id}
        rating={post.rating}
        postRelease={post.TMDBdateOfMovieRelease}
        postTitle={post.title}
        postCaption={post.content}
        nofLikes={post.likes}
        nofDislikes={post.dislikedBy.length}
        currentUID={props.currentUID}
        currentUserLikes={post.likedBy?.includes(props.currentUID)}
        currentUserDislikes={post.dislikedBy?.includes(props.currentUID)}
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

  return <>{props.hotPosts?.map(renderTopPosts)}</>;
}
