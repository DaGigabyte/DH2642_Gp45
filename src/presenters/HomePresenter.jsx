import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import HomePage from "../views/HomePage";
import CommentModal from "../components/modal/CommentModal"
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function HomePresenter(props) {
  let data = props.model.homePageData.data;
  useEffect(() => { loadMorePostACB(); }, [])
  function loadMorePostACB() {
    props.model.homePageData.fetchNewestPosts();
  }
  function userSelectsPostACB(postId) {
    props.model.homePageData.setCurrentPostID(postId);
  }
  function userlikesPostACB(postId) {
    alert('User likes post' + postId)
  }
  function userdislikesPostACB(postId) {
    alert('User dislikes post' + postId)
  }

  /* FOR COMMENT Modal*/
  const [comment, setComment] = useState("");
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  //TODO Fix correct storing
  function handleSubmittedComment() {
    try{
      setCommentModalOpen(false);
      alert("User \"" + props.model.user.uid + "\" wants to store comment \"" + comment + "\" on currentpost"); 
      setComment("");
      toast.success("Comment Posted!");
    }
    catch (error){
      toast.error("There was an issue posting the comment");
    }
  }
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* new getPost handler */
  async function openCommentModalACB(id){
    try{
      props.model.homePageData.setCurrentPostID(id);
      await getPost();
      setCommentModalOpen(true);
    }
    catch (error){
      console.error("Error in openCommentModalACB:", error);
    }
  }
  const [post, setPost] = useState(null);
  async function getPost() {
    try {
      const currentPost = await props.model.homePageData.getCurrentPost();
      setPost(currentPost);
      document.title = currentPost?.title;
    } catch (error) {
      console.error("Error getting post:", error);
    }
  }
  /* ends here */

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
        text={comment}
        userEntersComment={(res) => setComment(res)}
        storeComment={handleSubmittedComment}
      />
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
      theme="light"/>
    </>
  );
}

export default observer(HomePresenter);
