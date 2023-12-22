import { useState } from "react";
import CommentModal from "../components/modal/CommentModal";
import TopRatedPostsSection from "../components/top-rated-page/TopRatedPostsSection";

function TopRatedPinsView(props) {
  const [currentPost, setCurrentPost] = useState(null);

  function openCommentModalACB(post) {
    setCurrentPost(post);
    props.setCommentModalOpen(true);
  }

  return (
    <div className="flex flex-col space-y-4 max-w-6xl">
      <h2>{props.sectionTitle}</h2>
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

export default TopRatedPinsView;
