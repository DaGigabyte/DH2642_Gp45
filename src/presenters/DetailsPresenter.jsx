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
} from "../utils/toastify";
import SuspenseAnimation from "../components/global/SuspenseAnimation";
import { movieById } from "../services/firePinsSource.js";

function DetailsPresenter(props) {
  const { pid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    props.model.postDetailData.setCurrentPostID(pid);
  }, [pid]);
  useEffect(() => {
    document.title = props.model.postDetailData.postData?.title;
  }, [props.model.postDetailData.postData?.title]);

  //Fetching details
  const [postDetailsFromAPI, setPostDetailsFromAPI] = useState(null);

  useEffect(() => {
    const movieId = props.model.postDetailData.postData?.TMDBsourceID;
    if (movieId) {
      movieById(movieId).then((res) => setPostDetailsFromAPI(res));
    }
  }, [props.model.postDetailData.postData?.TMDBsourceID]);

  //DELETE PIN / COMMENT
  const deleteTypes = {
    PIN: "Pin",
    COMMENT: "Comment",
  };
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState({});

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
      setPopUpIsOpen(false);
      props.model.postDetailData.removeComment(deleteAction.id);
      commentDeletedToast();
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
    newCommentCreatedToast();
    props.model.postDetailData.setComment("");
  }

  /* Assigning the post in the model to a variable 'post'*/
  const post = props.model.postDetailData.postData;

  /* conditional rendering */
  function verifyCurrentPost() {
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
          />
        </>
      );
    }
  }

  {
    /* General return*/
  }
  return verifyCurrentPost();
}

export default observer(DetailsPresenter);
