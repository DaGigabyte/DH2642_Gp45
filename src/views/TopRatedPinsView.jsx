import { useState } from "react";
import CommentModal from "../components/modal/CommentModal";
import TopRatedPostsSection from "../components/top-rated/TopRatedPostsSection";

function TopRatedPinsView(props) {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  function openCommentModalACB(post) {
    setCurrentPost(post);
    setCommentModalOpen(true);
  }

  return (
    <div className="flex flex-col space-y-4 max-w-6xl">
      <h2>Top Rated Pins</h2>
      {/* Top pins */}
      <div>
        <TopRatedPostsSection
          hotPosts={props.hotPosts}
          currentUID={props.currentUID}
          selectPost={(id) => props.selectPost(id)}
          likePost={(id) => props.likePost(id)}
          dislikePost={(id) => props.dislikePost(id)}
          commentOnCurrentPost={openCommentModalACB}
        />
        <CommentModal
          post={currentPost}
          isUserConfirmed={!!props.currentUID}
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
    </div>
  );
}

export default TopRatedPinsView;
