import { observer } from "mobx-react-lite";
import HomePage from "../views/HomePage";

function HomePresenter(props) {




  function userSelectsPost(postId){
    
  }

  return (
    <div className="flex flex-col">
      <HomePage />
    </div>
  );
}

export default observer(HomePresenter);
