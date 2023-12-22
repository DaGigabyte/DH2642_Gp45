import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailPostView from "../views/DetailPostView";
import ConfirmationPopupModal from "../components/modal/ConfirmationPopupModal";
import {
  newCommentCreatedToast,
  postDeletedToast,
  commentDeletedToast,
  newCommentFailedToast,
  commentDeletedFailedToast,
} from "../utils/toastify";
import SuspenseAnimation from "../components/global/SuspenseAnimation";
import { movieById } from "../services/firePinsSource.js";

function DetailsPresenter(props) {
  const { pid } = useParams();
  const navigate = useNavigate();
  const post = props.model.postDetailData.postData;
  const commentStatus = props.model.postDetailData.postCommentStatus;
  const commentRemovalStatus = props.model.postDetailData.removeCommentStatus;

  const [postDetailsFromAPI, setPostDetailsFromAPI] = useState(null);
  const deleteTypes = {
    PIN: "Pin",
    COMMENT: "Comment",
  };
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState({});

  // Setting the currentPost
  useEffect(() => {
    props.model.postDetailData.setCurrentPostID(pid);
  }, [pid]);
  useEffect(() => {
    document.title = props.model.postDetailData.postData?.title;
  }, [props.model.postDetailData.postData?.title]);

  // Fetch additional data from API for details
  useEffect(() => {
    const movieId = props.model.postDetailData.postData?.TMDBsourceID;
    if (movieId) {
      movieById(movieId).then((res) => setPostDetailsFromAPI(res));
    }
  }, [props.model.postDetailData.postData?.TMDBsourceID]);

  // Checking for commentStatus updates
  useEffect(() => {
    if (commentStatus === "success") {
      newCommentCreatedToast();
      props.model.postDetailData.setPostCommentStatus(null);
    } else if (commentStatus === "error") {
      newCommentFailedToast();
    }
  }, [commentStatus, props.model.postDetailData]);

  // Checking for commentRemovalStatus updates
  useEffect(() => {
    setPopUpIsOpen(false);
    if (commentRemovalStatus === "success") {
      commentDeletedToast();
      props.model.postDetailData.setRemoveCommentStatus(null);
    } else if (commentRemovalStatus === "error") {
      commentDeletedFailedToast();
    }
  }, [commentRemovalStatus]);

  function handleDeleteRequest(deleteInfo) {
    setDeleteAction(deleteInfo);
    setPopUpIsOpen(true);
  }

  function confirmDelete() {
    if (deleteAction.type === deleteTypes.PIN) {
      setPopUpIsOpen(false);
      navigate("/");
      props.model.postDetailData.removePost();
      postDeletedToast();
    } else if (deleteAction.type === deleteTypes.COMMENT) {
      props.model.postDetailData.removeComment(deleteAction.id);
    }
  }

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
    props.model.postDetailData.setComment("");
  }

  function renderDetailedPost() {
    if (!post)
      return (
        <div className="mt-10">
          <SuspenseAnimation loading={props.model.postDetailData} />
        </div>
      );
    else if (
      props.model.postDetailData.postData.TMDBsourceID &&
      !postDetailsFromAPI
    ) {
      return (
        <div className="mt-10">
          <SuspenseAnimation loading={!postDetailsFromAPI} />
        </div>
      );
    } else {
      return (
        <>
          <DetailPostView
            post={post}
            fullPost={postDetailsFromAPI}
            rating={post?.rating}
            comments={props.model.postDetailData.postComments}
            currentUID={props.model.user.uid}
            commentText={props.model.postDetailData.comment}
            userEntersComment={(res) => {
              props.model.postDetailData.setComment(res);
            }}
            commentStatus={commentStatus}
            storeComment={userPostsComment}
            userDislikesPost={changeDislikeStateForUserACB}
            userLikesPost={changeLikeStateForUserACB}
            nofLikes={post.likes}
            nofDislikes={post.dislikedBy ? post.dislikedBy.length : "?"}
            isLikedByUser={post.likedBy?.includes(props.model.user.uid)}
            isDislikedByUser={post.dislikedBy?.includes(props.model.user.uid)}
            handleDeleteRequest={handleDeleteRequest}
            deleteTypes={deleteTypes}
          />
          <ConfirmationPopupModal
            isOpen={popUpIsOpen}
            setOpen={setPopUpIsOpen}
            onConfirm={confirmDelete}
            onCancel={() => {
              setPopUpIsOpen(false);
            }}
            actionType={deleteAction.type}
            commentRemovalStatus={commentRemovalStatus}
          />
        </>
      );
    }
  }

  return renderDetailedPost();
}

export default observer(DetailsPresenter);
