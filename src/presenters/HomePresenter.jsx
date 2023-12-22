import { observer } from "mobx-react-lite";
import {
  newCommentCreatedToast,
  newCommentFailedToast,
} from "../utils/toastify";

import { useEffect, useState } from "react";
import TopRatedSection from "../components/homepage/toprated/TopRatedSection.jsx";
import NewPostSection from "../components/homepage/newPosts/NewPostsSection.jsx";
import CommentModal from "../components/modal/CommentModal.jsx";
import SuspenseAnimation from "../components/global/SuspenseAnimation.jsx";

function HomePresenter(props) {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const commentStatus = props.model.postDetailData.postCommentStatus;
  const isReadyForRender = !!(
    props.model.topRatedPostsData.topRatedPosts.length > 0 &&
    props.model.newestPostsData.newestPosts
  );

  // Checking for commentStatus updates
  useEffect(() => {
    if (commentStatus === "success") {
      newCommentCreatedToast();
      setCommentModalOpen(false);
      props.model.postDetailData.setPostCommentStatus(null);
    } else if (commentStatus === "error") {
      newCommentFailedToast();
      setCommentModalOpen(false);
    }
  }, [commentStatus, props.model.postDetailData]);

  function openCommentModalACB(post) {
    setCurrentPost(post);
    setCommentModalOpen(true);
  }

  function loadMorePostACB() {
    props.model.newestPostsData.fetchNewestPosts();
  }

  function userSelectsPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
  }

  function userLikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.likePost();
  }

  function userDislikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.dislikePost();
  }

  function handleSubmittedCommentACB() {
    props.model.postDetailData.setCurrentPostID(currentPost.id);
    props.model.postDetailData.postComment();
    props.model.postDetailData.setComment("");
  }

  return (
    <>
      {isReadyForRender ? (
        <div className="flex flex-col w-full gap-5 max-w-6xl">
          <TopRatedSection
            currentUID={props.model.user.uid}
            hotPosts={props.model.topRatedPostsData.topRatedPosts}
            selectPost={userSelectsPostACB}
          />
          <NewPostSection
            newPosts={props.model.newestPostsData.newestPosts}
            currentUID={props.model.user.uid}
            loadMorePosts={loadMorePostACB}
            selectPost={userSelectsPostACB}
            likePost={userLikesPostACB}
            dislikePost={userDislikesPostACB}
            commentOnCurrentPost={openCommentModalACB}
          />
          <CommentModal
            post={currentPost}
            isUserConfirmed={!!props.model.user.uid}
            isOpen={commentModalOpen}
            setOpen={setCommentModalOpen}
            commentStatus={commentStatus}
            text={props.model.postDetailData.comment}
            userEntersComment={(res) =>
              props.model.postDetailData.setComment(res)
            }
            storeComment={handleSubmittedCommentACB}
          />
        </div>
      ) : (
        <SuspenseAnimation loading={!isReadyForRender} />
      )}
    </>
  );
}

export default observer(HomePresenter);
