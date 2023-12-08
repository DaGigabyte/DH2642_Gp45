import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import HomePage from "../views/HomePage";

function HomePresenter(props) {
  let data = props.model.homePageData.data;

  function loadMorePostACB() {
    props.model.homePageData.fetchNewestPosts();
  }
  function userSelectsPost(postId) {
    props.model.homePageData.setCurrentPostID(postId);
  }
  useEffect(() => { loadMorePostACB(); }, [])
  return (
    <div className="flex flex-col">
      <HomePage
        hotPosts={data.topRatedPosts}
        newPosts={data.newestPosts}
        loadMorePosts={loadMorePostACB}
        selectPost={userSelectsPost}
        loading={props.model.homePageData.loading} />
    </div>
  );
}

export default observer(HomePresenter);
