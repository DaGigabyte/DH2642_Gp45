import { observer } from "mobx-react-lite";
import AboutUs from "../views/AboutUs";

function AboutPresenter(props) {
  return (
    <div>
      <AboutUs model={props.model} />
    </div>
  );
}

export default observer(AboutPresenter);
