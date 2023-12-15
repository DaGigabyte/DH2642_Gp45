import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailPostView from "../views/DetailPostView";
import { newCommentCreatedToast } from "../utils/toastify"
import SuspenseAnimation from "../components/global/SuspenseAnimation";

function DetailsPresenter(props) {
  const { pid } = useParams();

  useEffect(() => {
    props.model.postDetailData.setCurrentPostID(pid);
  }, [pid]);

  useEffect(() => {
    document.title = props.model.postDetailData.promiseState.data?.title;
  }, [props.model.postDetailData.promiseState.data?.title]);

  /* change state of like */
  function changeLikeStateForUserACB() {
    props.model.postDetailData.likePost();
  }

  /* change state of dislike */
  function changeDislikeStateForUserACB() {
    props.model.postDetailData.dislikePost();
  }

  /* user want to store the comment */
  function userPostsComment() {
    props.model.postDetailData.postComment();
    newCommentCreatedToast();
    props.model.postDetailData.setComment("");
  }

  const post = props.model.postDetailData.promiseState.data;
  /* conditional rendering */
  function verifyCurrentPost() {
    if (!post)
      return (
      <>
        <SuspenseAnimation loading={props.model.postDetailData.promiseState} />
      </>)
    else{
      return (
        <DetailPostView
        post={post}
        currentUID={props.model.user.uid}
        commentText={props.model.postDetailData.comment}
        userEntersComment={(res) => { props.model.postDetailData.setComment(res) }}
        storeComment={userPostsComment}
        userDislikesPost={changeDislikeStateForUserACB}
        userLikesPost={changeLikeStateForUserACB}
        nofLikes={post.likes}
        nofDislikes={post.dislikedBy ? post.dislikedBy.length : "?"}
        isLikedByUser={post.likedBy?.includes(props.model.user.uid)}
        isDislikedByUser={post.dislikedBy?.includes(props.model.user.uid)}
        />
        )
      }  
  }

  {/* General return*/ }
  return (verifyCurrentPost())
}

export default observer(DetailsPresenter);