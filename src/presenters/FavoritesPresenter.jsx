import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import TopRatedPinsView from "../views/TopRatedPinsView";
import SuspenseAnimation from "../components/global/SuspenseAnimation";
import {
  newCommentCreatedToast,
  newCommentFailedToast,
} from "../utils/toastify";

function FavoritesPresenter(props) {
  const likedPins = props.model.favoritesPageData.favoritePosts;
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const commentStatus = props.model.postDetailData.postCommentStatus;

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

  // Fetch favorite posts on mount
  useEffect(() => {
    props.model.favoritesPageData.fetchFavoritePosts();
  }, []);

  function userSelectsPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
  }

  function userlikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.likePost();
    props.model.favoritesPageData.fetchFavoritePosts();
  }

  function userdislikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.dislikePost();
    props.model.favoritesPageData.fetchFavoritePosts();
  }

  function handleSubmittedCommentACB(post) {
    props.model.postDetailData.setCurrentPostID(post.id);
    props.model.postDetailData.postComment();
    props.model.postDetailData.setComment("");
  }

  // Show suspense while fetching data
  if (likedPins.length === 0) {
    return <SuspenseAnimation loading={true} />;
  }

  return (
    <TopRatedPinsView
      sectionTitle="Your 10 Liked Pins"
      currentUID={props.model.user.uid}
      hotPosts={likedPins}
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
  );
}

export default observer(FavoritesPresenter);
