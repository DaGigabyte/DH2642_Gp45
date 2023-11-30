import { observer } from "mobx-react-lite";
import SettingsView from "../views/SettingsView";

/**
 * A basic presenter for the settings view
 * @param {*} props - the FirePin model
 * @returns {React.Element} The rendered SettingsView component
 */
function SettingsPresenter(props) {
  /*ACB to set the full-name*/
  function updateNameACB(result) {
    props.model.setFullName(result);
  }
  /*ACB to set the nick-name*/
  function updateNickACB(result) {
    props.model.setDisplayName(result);
  }
  /*ACB to store the changes*/
  function storeUpdatesACB() {
    //implemntation missing, store the user info on firebase
  }
  /*ACB to discard the changes*/
  function abortChangeACB() {
    //implemntation missing, reload model from firebase
  }
  return (
    <SettingsView
      fullName={props.model.fullName}
      nickName={props.model.displayName}
      profilePicture={props.model.profilePicture}
      onNameChange={updateNameACB}
      onNickChange={updateNickACB}
      onConfirm={storeUpdatesACB}
      onCancel={abortChangeACB}
    />
  );
}

export default observer(SettingsPresenter);
