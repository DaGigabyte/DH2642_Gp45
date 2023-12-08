import { observer } from "mobx-react-lite";
import HomePage from "../views/HomePage";

function HomePresenter(props) {
  let data = props.model.homePageData.data
  function loadMorePostACB() {
    props.model.homePageData.fetchNewestPosts();
  }

  return (
    <div className="flex flex-col">
      <HomePage hotPosts={data.topRatedPosts} newPosts={data.newestPosts} loadMorePosts={loadMorePostACB} />
    </div>
  );
}

export default observer(HomePresenter);
