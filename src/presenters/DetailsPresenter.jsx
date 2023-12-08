import { observer } from "mobx-react-lite";
import DetailPostView from "../views/DetailPostView";

function DetailsPresenter(props){

    
  return (
    <div className="flex flex-col">
      <DetailPostView post={{}} /> {/*post={props.model.getCurrentPost()*/}
    </div>
  );
}

export default observer(DetailsPresenter);