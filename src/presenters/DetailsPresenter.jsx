import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailPostView from "../views/DetailPostView";

function DetailsPresenter(props){
  const { pid } = useParams();
  const [post, setPost] = useState(null);
 
  useEffect(() => {
    props.model.homePageData.setCurrentPostID(pid);
    props.model.homePageData.getCurrentPost()
      .then((currentPost) => {
        setPost(currentPost);
        document.title = currentPost?.title;
      });
  }, [pid]);

  function verifyCurrentPost(){
    if (!post)
      return <h1>Post not found</h1>
    return <DetailPostView post={post} />
  }
  return ( verifyCurrentPost() );
}

export default observer(DetailsPresenter);