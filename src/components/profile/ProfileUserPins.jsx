import { useState } from "react";
import CommentModal from "../modal/CommentModal";
import ProfilePinsSection from "./ProfilePinsSection";

function ProfileUserPins(props) {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  function openCommentModalACB(post) {
    setCurrentPost(post);
    setCommentModalOpen(true);
  }

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h2 className="text-2xl">User Pins</h2>
      {/* Top pins */}
      <div>
        <ProfilePinsSection
          hotPosts={props.userPins}
          currentUID={props.currentUID}
          currentUserData={props.currentUserData}
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

export default ProfileUserPins;
