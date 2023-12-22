import { useState } from "react";
import TopRatedPostsSection from "../components/top-rated-page/TopRatedPostsSection.jsx";
import CommentModal from "../components/modal/CommentModal.jsx";

function FavoritesView(props) {
  const [currentPost, setCurrentPost] = useState(null);

  function openCommentModalACB(post) {
    setCurrentPost(post);
    props.setCommentModalOpen(true);
  }

  return (
    <div className="flex flex-col space-y-4 max-w-6xl">
      <h2>Top Rated Pins</h2>
      <div>
        <TopRatedPostsSection
          hotPosts={props.posts}
          currentUID={props.currentUID}
          selectPost={(id) => props.selectPost(id)}
          likePost={(id) => props.likePost(id)}
          dislikePost={(id) => props.dislikePost(id)}
          commentOnCurrentPost={openCommentModalACB}
        />
        <CommentModal
          post={currentPost}
          isUserConfirmed={!!props.currentUID}
          isOpen={props.commentModalOpen}
          setOpen={props.setCommentModalOpen}
          text={props.commentText}
          userEntersComment={(res) => props.userEntersComment(res)}
          storeComment={() => props.storeComment(currentPost)}
          commentStatus={props.commentStatus}
        />
      </div>
    </div>
  );
}

export default FavoritesView;
