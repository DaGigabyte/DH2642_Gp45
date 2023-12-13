import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import HomePage from "../views/HomePage";
import CommentModal from "../components/modal/CommentModal"

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
  const [confirmPost, setConfirmPost] = useState(false); //BOOLEAN FOR TIMEOUT
  //TODO Fix correct storing
  function handleSubmittedComment() {
    setConfirmPost(true);
    delay(3000).then(() => {
      setComment("");
      setCommentModalOpen(false);
      setConfirmPost(false);
      alert("User \"" + props.model.user.uid + "\" wants to store comment \"" + comment + "\" on post \"" + currentPost + "\"");
    });
  }
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* new getPost handler */
  async function openCommentModalACB(id){
    try {
      await props.model.homePageData.setCurrentPostID(id);
      await getPost();
      setCommentModalOpen(true);
    } catch (error) {
      console.error("Error opening comment modal:", error);
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
        confirmPost={confirmPost}
      />
    </>
  );
}

export default observer(HomePresenter);
