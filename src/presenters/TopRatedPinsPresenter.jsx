import { observer } from "mobx-react-lite";
import TopRatedPinsView from "../views/TopRatedPinsView";

function TopRatedPinsPresenter(props) {
  return (
    <div className="flex flex-col">
      <TopRatedPinsView model={props.model} />
    </div>
  );
}

export default observer(TopRatedPinsPresenter);
