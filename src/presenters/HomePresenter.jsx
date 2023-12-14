import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import HomePage from "../views/HomePage";
import CommentModal from "../components/modal/CommentModal"
import React from 'react';
import { newCommentCreatedToast } from "../utils/toastify"

function HomePresenter(props) {
  let data = props.model.homePageData.data;
  useEffect(() => { loadMorePostACB(); }, [])
  function loadMorePostACB() {
    props.model.homePageData.fetchNewestPosts();
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

  /* FOR COMMENT Modal*/
  const [commentModalOpen, setCommentModalOpen] = useState(false);

  /* CB to post the comment when user  */
  function handleSubmittedCommentACB() {
    setCommentModalOpen(false);
    props.model.postDetailData.setCurrentPostID(post.id);
    props.model.postDetailData.postComment();
    props.model.postDetailData.setComment("");
    newCommentCreatedToast();
  }

  /* local state of post for commentmodal */
  const [post, setPost] = useState(null);
  function openCommentModalACB(post) {
    setPost(post)
    setCommentModalOpen(true);
  }


  return (
    <>
      <HomePage
        currentUID={props.model.user.uid}
        hotPosts={data.topRatedPosts}
        newPosts={data.newestPosts}
        loadMorePosts={loadMorePostACB}
        selectPost={userSelectsPostACB}
        likePost={userlikesPostACB}
        dislikePost={userdislikesPostACB}
        commentOnCurrentPost={openCommentModalACB}
      />
      <CommentModal
        post={post}
        isUserConfirmed={props.model.user.uid ? true : false}
        isOpen={commentModalOpen}
        setOpen={setCommentModalOpen}
        text={props.model.postDetailData.comment}
        userEntersComment={(res) => props.model.postDetailData.setComment(res)}
        storeComment={handleSubmittedCommentACB}
      />
    </>
  );
}

export default observer(HomePresenter);
