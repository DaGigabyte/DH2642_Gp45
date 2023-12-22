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
  function loadMorePostACB() {
    props.model.newestPostsData.fetchNewestPosts();
  }

  function userSelectsPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
  }

  function userlikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.likePost();
  }

  function userdislikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.dislikePost();
  }

  function handleSubmittedCommentACB() {
    props.model.postDetailData.setCurrentPostID(currentPost.id);
    props.model.postDetailData.postComment();
    props.model.postDetailData.setComment("");
  }

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  function openCommentModalACB(post) {
    setCurrentPost(post);
    setCommentModalOpen(true);
  }

  const isReady = !!(
    props.model.topRatedPostsData.topRatedPosts.length > 0 &&
    props.model.newestPostsData.newestPosts
  );
  const commentStatus = props.model.postDetailData.postCommentStatus;

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

  return (
    <>
      {isReady ? (
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
            likePost={userlikesPostACB}
            dislikePost={userdislikesPostACB}
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
        <SuspenseAnimation loading={!isReady} />
      )}
    </>
  );
}

export default observer(HomePresenter);
