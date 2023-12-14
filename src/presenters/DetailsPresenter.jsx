import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailPostView from "../views/DetailPostView";
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function DetailsPresenter(props) {
  const { pid } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    props.model.homePageData.setCurrentPostID(pid);
    props.model.homePageData.getCurrentPost()
      .then((currentPost) => {
        setPost(currentPost);
        document.title = currentPost?.title;
      });
  }, [pid]);


  /* comments */
  const [comment, setComment] = useState("");
  function changeLikeStateForUserACB() {
    const currentUser = props.model.user.uid;
    const currentPost = post;

    alert("User " + currentUser + " likes post: " + currentPost)
  }
  function changeDislikeStateForUserACB() {
    const currentUser = props.model.user.uid;
    const currentPost = post;

    alert("User " + currentUser + " dislikes post: " + currentPost)
  }

  function userPostsComment() {
    try {
      alert("submit comment: " + comment);
      setComment(null);
      toast.success("Comment Posted!");
      // props.postdetaildata.setComment
    }
    catch (error) {
      toast.error("There was an issue posting the comment");
    }
  }

  /* conditional rendering */
  function verifyCurrentPost() {
    if (!post)//TODO BYT
      return <h1>Loading Post</h1>
    return (
      <DetailPostView
        post={post}//TODO BYT props.model.postddetaildata.data.
        currentUID={props.model.user.uid}
        commentText={comment}
        userEntersComment={setComment}
        storeComment={userPostsComment}
        userDislikesPost={changeDislikeStateForUserACB}
        userLikesPost={changeLikeStateForUserACB}
        nofLikes={post.likedBy.length}
        nofDislikes={post.dislikedBy.length}
        isLikedByUser={post.likedBy?.includes(props.model.user.uid)}
        isDislikedByUser={post.dislikedBy?.includes(props.model.user.uid)}
        postComments={[

        ]}
      />
    )
  }

  {/* General return*/ }
  return (
    <>
      {verifyCurrentPost()}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />

    </>)
}

export default observer(DetailsPresenter);