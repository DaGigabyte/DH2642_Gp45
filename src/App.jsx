import "./App.css";
import CounterPresenter from "./presenters/CounterPresenter";
import Auth from "./presenters/AuthPresenter";
import { signInACB, signOutACB } from "./firebase/firebaseModel";
import { observer } from "mobx-react-lite";

function App(props) {
  return (
    <div>
      <h1>MobX Counter Example</h1>
      <CounterPresenter model={props.model} />
      <Auth onSignIn={signInACB} onSignOut={signOutACB} uid={props.model.user.uid}/>
    </div>
  );
}

export default observer(App);
