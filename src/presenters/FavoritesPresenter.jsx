import { observer } from "mobx-react-lite";
import FavoritesView from "../views/FavoritesView";
import { useEffect, useState } from "react";
import {
  newCommentCreatedToast,
  newCommentFailedToast,
} from "../utils/toastify.js";
import SuspenseAnimation from "../components/global/SuspenseAnimation.jsx";

function FavoritesPresenter(props) {
  const posts = props.model.favoritesPageData.favoritePosts;
  console.log("FAVORITES", posts);

  const topRatedPosts = props.model.topRatedPostsData.topRatedPosts;
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const commentStatus = props.model.postDetailData.postCommentStatus;

  useEffect(() => {
    props.model.favoritesPageData.fetchFavoritePosts();
  }, []);

  useEffect(() => {
    if (commentStatus === "success") {
      newCommentCreatedToast();
      setCommentModalOpen(false);
      props.model.postDetailData.setPostCommentStatus(null);
    } else if (commentStatus === "error") {
      newCommentFailedToast();
      setCommentModalOpen(false);
      props.model.postDetailData.setPostCommentStatus(null);
    }
  }, [commentStatus, props.model.postDetailData]);

  function userSelectsPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
  }

  function userlikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.likePost();
    props.model.topRatedPostsData.fetchTopPosts();
  }

  function userdislikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.dislikePost();
    props.model.topRatedPostsData.fetchTopPosts();
  }

  function handleSubmittedCommentACB(post) {
    props.model.postDetailData.setCurrentPostID(post.id);
    props.model.postDetailData.postComment();
    props.model.postDetailData.setComment("");
  }

  // Show suspense while fetching data
  if (topRatedPosts.length === 0) {
    return <SuspenseAnimation loading={true} />;
  }

  return (
    <div className="flex flex-col">
      <FavoritesView
        currentUID={props.model.user.uid}
        posts={topRatedPosts}
        selectPost={userSelectsPostACB}
        likePost={userlikesPostACB}
        dislikePost={userdislikesPostACB}
        commentText={props.model.postDetailData.comment}
        userEntersComment={(res) => props.model.postDetailData.setComment(res)}
        storeComment={handleSubmittedCommentACB}
        commentModalOpen={commentModalOpen}
        setCommentModalOpen={(state) => setCommentModalOpen(state)}
        commentStatus={commentStatus}
      />
    </div>
  );
}

export default observer(FavoritesPresenter);
