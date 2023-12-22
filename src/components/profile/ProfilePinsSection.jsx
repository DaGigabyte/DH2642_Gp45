import NewPostCard from "../homepage/newPosts/NewPostCard";
import defaultProfile from "../../assets/default-avatar.jpg";

function ProfilePinsSection(props) {
  // Render a single post
  function renderTopPosts(post) {
    return (
      <NewPostCard
        key={post.id}
        picture={
          props.currentUserData
            ? props.currentUserData.profilePicture
            : defaultProfile
        }
        nickName={props.currentUserData && props.currentUserData.displayName}
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
        disableCommenting={true}
      />
    );
  }

  return <>{props.hotPosts?.map(renderTopPosts)}</>;
}

export default ProfilePinsSection;
