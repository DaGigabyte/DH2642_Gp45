import { observer } from "mobx-react-lite";
import Home from "../views/HomePage";

function HomePresenter(props) {
  return (
    <div>
      <Home model={props.model} />
    </div>
  );
}

export default observer(HomePresenter);
