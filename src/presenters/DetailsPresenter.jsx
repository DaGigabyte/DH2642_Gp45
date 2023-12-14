import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailPostView from "../views/DetailPostView";
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { newCommentCreatedToast } from "../utils/toastify"

function DetailsPresenter(props) {
  const { pid } = useParams();

  useEffect(() => {
    props.model.postDetailData.setCurrentPostID(pid);
  }, [pid]);

  useEffect(() => {
    document.title = props.model.postDetailData.data?.title;
  }, [props.model.postDetailData.data.title]);



  /* change state of like */
  function changeLikeStateForUserACB() {
    const currentUser = props.model.user.uid;
    const currentPost = props.modelpostDetailData.data.id;

    alert("User " + currentUser + " likes post: " + currentPost)
  }

  /* change state of dislike */
  function changeDislikeStateForUserACB() {
    const currentUser = props.model.user.uid;
    const currentPost = props.modelpostDetailData.data.id;

    alert("User " + currentUser + " dislikes post: " + currentPost)
  }

  /* user want to store the comment */
  function userPostsComment() {
    alert("submit comment: " + props.model.postDetailData.comment);
    props.model.postDetailData.setComment("");
    newCommentCreatedToast();
    // props.postdetaildata.setComment
  }
  const post = props.model.postDetailData.data;

  /* conditional rendering */
  function verifyCurrentPost() {
    if (!post)//TODO BYT
      return <h1>Loading Post</h1>
    return (
      <DetailPostView
        post={post}//TODO BYT props.model.postddetaildata.data.
        currentUID={props.model.user.uid}
        commentText={props.model.postDetailData.comment}
        userEntersComment={(res) => { props.model.postDetailData.setComment(res) }}
        storeComment={userPostsComment}
        userDislikesPost={changeDislikeStateForUserACB}
        userLikesPost={changeLikeStateForUserACB}
        nofLikes={post.likes}
        nofDislikes={0/* .length not working anymore */}
        isLikedByUser={post.likedBy?.includes(props.model.user.uid)}
        isDislikedByUser={post.dislikedBy?.includes(props.model.user.uid)}
        postComments={[

        ]}
      />
    )
  }

  {/* General return*/ }
  return (verifyCurrentPost())
}

export default observer(DetailsPresenter);