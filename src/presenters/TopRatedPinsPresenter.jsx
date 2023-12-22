import { observer } from "mobx-react-lite";
import TopRatedPinsView from "../views/TopRatedPinsView";
import SuspenseAnimation from "../components/global/SuspenseAnimation";
import {
  newCommentCreatedToast,
  newCommentFailedToast,
} from "../utils/toastify.js";
import { useEffect, useState } from "react";

function TopRatedPinsPresenter(props) {
  const topRatedPosts = props.model.topRatedPostsData.topRatedPosts;
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
    <TopRatedPinsView
      sectionTitle="Top Rated Posts"
      currentUID={props.model.user.uid}
      hotPosts={topRatedPosts}
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

export default observer(TopRatedPinsPresenter);
