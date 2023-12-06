import InputBox from "./settingsInputBox";
import ProfileBox from "./profilePicAndNick";
import ReturnButton from "../components/navigation/ReturnButton.jsx";
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
  /*ACB to discard new name*///TODO rout to prev
  function handleCancelClickACB() {
    props.onCancel();
    alert("CANCEL ROUTE TO PREV TODO")
  }
  return (
    <div className="relative text-left rounded-xl border-2 border-gray-300 p-10 bg-white w-full max-w-3xl"> -
      <ReturnButton size="25" />
      <div className="text-black ">
        <span className="text-5xl mb-8 block">Settings</span>
        <ProfileBox picture={props.profilePicture || ""} nick={props.nickName || ""} />
        <span className="text-3xl mt-6 mb-2 block">Full Name</span>
        <InputBox inputId="fullNameInput" text={props.fullName || ""} onInputChange={nameChangeACB} />
        <span className="text-3xl mb-2 mt-6 block">Nickname</span>
        <InputBox inputId="nickNameInput" text={props.nickName || ""} onInputChange={nickChangeACB} />
      </div>
      <div className="mt-4 space-x-1">
        <button onClick={handleCancelClickACB} className="w-[100px] text-lg text-violet-50 font-bold bg-violet-500 px-5 py-2 
      rounded-2xl shadowhover:shadow-lg hover:bg-violet-700 transition duration-300">Cancel</button>
        <button onClick={handleSaveClickACB} className="w-[100px] text-lg text-violet-50 font-bold bg-violet-500 px-5 py-2 
      rounded-2xl shadow hover:shadow-lg hover:bg-violet-700 transition duration-300">Save</button>
      </div>
    </div>
  );
}
