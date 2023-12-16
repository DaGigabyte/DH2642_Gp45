import { useState } from "react";
import CommentModal from "../components/modal/CommentModal"
import NewPostSection from "../components/homepage/newPosts/NewPostsSection";
import TopRatedSection from "../components/homepage/toprated/TopRatedSection";
/**
 * Renders the homepage view
 * @param {Object} props.currentUID - The currently logged in user
 * @param {Object} props.hotPosts - An array of the most liked posts
 * @param {Object} props.newPosts - An array of new posts
 * @param {String} props.commentText - The current text entered for a comment
 * @param {function} props.loadMorePosts - fetch more posts
 * @param {function} props.selectPost -  set a post as current in the model
 * @param {function} props.likePost - change like state for current user on a post
 * @param {function} props.dislikePost - change dislike state for current user on a post
 * @param {function} props.userEntersComment - change dislike state of commentText
 * @param {function} props.storeComment - confirm and upload the comment of a post
 * @returns {React.Element} A render of the homepage
 */
function HomePage(props) {

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  function openCommentModalACB(post) {
    setCurrentPost(post)
    setCommentModalOpen(true);
  }

  return (
    <div className="flex flex-col w-full gap-5 max-w-6xl">
      <TopRatedSection
        currentUID={props.currentUID}
        hotPosts={props.hotPosts}
        selectPost={(id) => props.selectPost(id)}
      />
      <NewPostSection
        newPosts={props.newPosts}
        currentUID={props.currentUID}
        loadMorePosts={() => props.loadMorePosts()}
        selectPost={(id) => props.selectPost(id)}
        likePost={(id) => props.likePost(id)}
        dislikePost={(id) => props.dislikePost(id)}
        commentOnCurrentPost={openCommentModalACB}
      />
      <CommentModal
        post={currentPost}
        isUserConfirmed={props.currentUID ? true : false}
        isOpen={commentModalOpen}
        setOpen={setCommentModalOpen}
        text={props.commentText}
        userEntersComment={(res) => props.userEntersComment(res)}
        storeComment={() => {
          setCommentModalOpen(false);
          props.storeComment(currentPost);
        }}
      />
    </div>
  );
}

export default HomePage;
