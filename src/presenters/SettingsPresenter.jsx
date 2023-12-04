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
    props.model.userSettingsData.setFullName(result);
  }
  /*ACB to set the nick-name*/
  function updateNickACB(result) {
    props.model.userSettingsData.setDisplayName(result);
  }
  /*ACB to store the changes*/
  function storeUpdatesACB() {
    //implemntation missing, store the user info on firebase
    props.model.storeUpdates();
  }
  /*ACB to discard the changes*/
  function abortChangeACB() {
    //implemntation missing, reload model from firebase
  }
  return (
    props.model.user?.uid && (
    <SettingsView
      fullName={props.model.userSettingsData.data.fullName}
      nickName={props.model.userSettingsData.data.displayName}
      profilePicture={props.model.user.data.profilePicture}
      onNameChange={updateNameACB}
      onNickChange={updateNickACB}
      onConfirm={storeUpdatesACB}
      onCancel={abortChangeACB}
    />
    )
  );
}

export default observer(SettingsPresenter);
