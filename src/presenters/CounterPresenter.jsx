import { observer } from "mobx-react-lite";
import CounterView from "../views/CounterView";

function CounterPresenter(props) {
  // Inside CounterPresenter
  function handleCountChange(newCount) {
    props.model.setCount(newCount);
  }

  return (
    <CounterView count={props.model.count} onCountChange={handleCountChange} />
  );
}

export default observer(CounterPresenter);
