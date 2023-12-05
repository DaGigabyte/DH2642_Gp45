import InputBox from "./settingsInputBox";
import ProfileBox from"./profilePicAndNick";

/**
 * Used for updating username and nickname for the user.
 * @param {Object} props - The properties passed to the SettingsView component.
 * @param {string} props.profilePicture - The URL or source for the user's profile picture.
 * @param {string} props.nickName - The current nickname of the user.
 * @param {string} props.fullName - The current full name of the user.
 * @param {Function} props.onNameChange - Callback function triggered when the username is updated.
 * @param {Function} props.onNickChange - Callback function triggered when the nickname is updated.
 * @param {Function} props.onConfirm - Callback function triggered when the user confirms the changes.
 * @param {Function} props.onCancel - Callback function triggered when the user cancels the changes.
 * @returns {React.Element} The rendered SettingsView component.
 */
export default function SettingsView(props) {
  /*ACB to change the full-name*/
  function nameChangeACB(result) {
    props.onNameChange(result);
  }
  /*ACB to change the nick-name*/
  function nickChangeACB(result) {
    props.onNickChange(result);
  }
  /*ACB to confirm new name*/
  function handleSaveClickACB() {
    props.onConfirm();
  }
  /*ACB to discard new name*/
  function handleCancelClickACB() {
    props.onCancel();
  }
  return (
    <div className="text-left rounded-xl border-2 border-gray-300 p-10 bg-white">
      <div className="text-black ">
        <span className="text-5xl mb-2 block">Settings</span>
        <ProfileBox picture={props.profilePicture || ""} nick={props.nickName || ""} />
        <span className="text-3xl mt-4 mb-2 block">Full Name</span>
        <InputBox inputId="fullNameInput" text={props.fullName || ""} onInputChange={nameChangeACB} />
        <span className="text-3xl mb-2 block">Nickname</span>
        <InputBox inputId="nickNameInput" text={props.nickName || ""} onInputChange={nickChangeACB} />
      </div>
      <div className="mt-4 space-x-1">
        <button onClick={handleCancelClickACB}>Cancel</button>
        <button onClick={handleSaveClickACB}>Save</button>
      </div>
    </div>
  );
}
