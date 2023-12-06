import { observer } from "mobx-react-lite";
import FavoritesView from "../views/FavoritesView";

function FavoritesPresenter(props) {
  return (
    <div className="flex flex-col">
      <FavoritesView model={props.model} />
    </div>
  );
}

export default observer(FavoritesPresenter);
