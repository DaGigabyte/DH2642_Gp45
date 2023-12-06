import { observer } from "mobx-react-lite";
import HomePage from "../views/HomePage";

function HomePresenter(props) {



  function loadMorePostACB(){
    //TODO load more post into newPosts array
    alert("USER WANTS MORE POSTS TODO") //remove when model is done
  }
  function userSelectsPost(postId){
    props.model.setCurrentPost(postId)
  }

  return (
    <div className="flex flex-col">
      <HomePage model={props.model} 
      hotPosts={props.model.hotPosts} 
      newPosts={props.model.newPosts} 
      loadMorePosts={loadMorePostACB} 
      selectPost={userSelectsPost}/>
    </div>
  );
}

export default observer(HomePresenter);
