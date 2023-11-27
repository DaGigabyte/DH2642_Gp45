import "./App.css";
import CounterPresenter from "./presenters/CounterPresenter";

function App(props) {
  return (
    <div>
      <h1>MobX Counter Example</h1>
      <CounterPresenter model={props.model} />
    </div>
  );
}

export default App;
