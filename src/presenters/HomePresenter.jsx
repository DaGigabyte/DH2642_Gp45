import { observer } from "mobx-react-lite";
import { newCommentCreatedToast } from "../utils/toastify"

import HomePage from "../views/HomePage";

function HomePresenter(props) {
  let data = props.model.homePageData.data;

  function loadMorePostACB() {
    props.model.homePageData.fetchNewestPosts();
  }
  function userSelectsPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
  }
  function userlikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.likePost();
  }
  function userdislikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.dislikePost();
  }

  function handleSubmittedCommentACB(post) {
    props.model.postDetailData.setCurrentPostID(post.id);
    props.model.postDetailData.postComment();
    props.model.postDetailData.setComment("");
    newCommentCreatedToast();
  }

  return (
    <HomePage
      currentUID={props.model.user.uid}
      hotPosts={data.topRatedPosts}
      newPosts={data.newestPosts}
      loadMorePosts={loadMorePostACB}
      selectPost={userSelectsPostACB}
      likePost={userlikesPostACB}
      dislikePost={userdislikesPostACB}
      commentText={props.model.postDetailData.comment}
      userEntersComment={(res) => props.model.postDetailData.setComment(res)}
      storeComment={handleSubmittedCommentACB}
    />
  );
}

export default observer(HomePresenter);
