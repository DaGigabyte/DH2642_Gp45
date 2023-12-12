import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import CommentModal from './CommentModal';
import HomePage from "../views/HomePage";

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
    alert('User likes post'+postId)
  }
  function userdislikesPostACB(postId) {
    alert('User dislikes post'+postId)
  }
  return (
    <div className="flex flex-col">
      <HomePage
        currentUser={props.model.user}
        hotPosts={data.topRatedPosts}
        newPosts={data.newestPosts}
        loadMorePosts={loadMorePostACB}
        selectPost={userSelectsPostACB} 
        likePost={userlikesPostACB}
        dislikePost={userdislikesPostACB}
        />
    </div>
  );
}

export default observer(HomePresenter);
