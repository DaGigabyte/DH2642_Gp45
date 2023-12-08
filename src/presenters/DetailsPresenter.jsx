import { observer } from "mobx-react-lite";
import DetailPostView from "../views/DetailPostView";

function DetailsPresenter(props){
  
  function verifyCurrentPost(){
    const post=props.model.homePageData.getCurrentPost();
    if (post===null)
      return <h1>Post not found</h1>
    return <DetailPostView post={post} />
  }
  return ( verifyCurrentPost() );
}

export default observer(DetailsPresenter);