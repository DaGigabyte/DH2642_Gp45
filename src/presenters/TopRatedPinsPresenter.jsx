import { observer } from "mobx-react-lite";
import TopRatedPinsView from "../views/TopRatedPinsView";
import SuspenseAnimation from "../components/global/SuspenseAnimation";

function TopRatedPinsPresenter(props) {
  let data = props.model.homePageData.data;

  function userSelectsPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
  }
  function userlikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.likePost();
    props.model.homePageData.fetchTopPosts();
  }
  function userdislikesPostACB(postId) {
    props.model.postDetailData.setCurrentPostID(postId);
    props.model.postDetailData.dislikePost();
    props.model.homePageData.fetchTopPosts();
  }

  function handleSubmittedCommentACB(post) {
    props.model.postDetailData.setCurrentPostID(post.id);
    props.model.postDetailData.postComment();
    props.model.postDetailData.setComment("");
    newCommentCreatedToast();
  }

  // Show suspense while fetching data
  if (data.topRatedPosts.length === 0) {
    return <SuspenseAnimation loading={true} />;
  }

  return (
    <TopRatedPinsView
      currentUID={props.model.user.uid}
      hotPosts={data.topRatedPosts}
      selectPost={userSelectsPostACB}
      likePost={userlikesPostACB}
      dislikePost={userdislikesPostACB}
      commentText={props.model.postDetailData.comment}
      userEntersComment={(res) => props.model.postDetailData.setComment(res)}
      storeComment={handleSubmittedCommentACB}
    />
  );
}

export default observer(TopRatedPinsPresenter);
