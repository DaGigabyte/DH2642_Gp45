import { observer } from "mobx-react-lite";
import SettingsView from "../views/SettingsView";
import { settingsUpdatedToast } from "../utils/toastify.js";

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
    props.model.userSettingsData.setDisplayNameInsensitive(result);
  }

  /*ACB to set the Bio*/
  function updateBioACB(result) {
    props.model.userSettingsData.setBio(result);
  }

  /*ACB to store the changes*/
  function storeUpdatesACB() {
    props.model.storeUpdates();
    settingsUpdatedToast();
  }

  return (
    props.model.user?.uid && (
      <SettingsView
        currentData={{
          fullName: props.model.user.data.fullName,
          nickName: props.model.user.data.displayName,
          bio: props.model.user.data.bio,
        }}
        fullName={props.model.userSettingsData.data.fullName}
        nickName={props.model.userSettingsData.data.displayName}
        profilePicture={props.model.user.data.profilePicture}
        bio={props.model.userSettingsData.data.bio}
        onNameChange={updateNameACB}
        onNickChange={updateNickACB}
        onConfirm={storeUpdatesACB}
        onBioChange={updateBioACB}
      />
    )
  );
}

export default observer(SettingsPresenter);
