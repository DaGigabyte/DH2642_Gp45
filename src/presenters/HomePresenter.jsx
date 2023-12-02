import { observer } from "mobx-react-lite";
import HomePage from "../views/HomePage";

function HomePresenter(props) {
  return (
    <div className="flex flex-col">
      <HomePage model={props.model} />
    </div>
  );
}

export default observer(HomePresenter);
