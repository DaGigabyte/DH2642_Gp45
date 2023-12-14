import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailPostView from "../views/DetailPostView";

function DetailsPresenter(props){
  const { pid } = useParams();
 
  useEffect(() => {
    props.model.postDetailData.setCurrentPostID(pid);
  }, [pid]);

  useEffect(() => {
    document.title = props.model.postDetailData.data?.title;
  }, [props.model.postDetailData.data.title]);

  function verifyCurrentPost(){
    if (!props.model.postDetailData.data.id)
      return <h1>Post not found</h1>
    return <DetailPostView post={props.model.postDetailData.data} />
  }
  return ( verifyCurrentPost() );
}

export default observer(DetailsPresenter);