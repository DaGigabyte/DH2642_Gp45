import InputBox from "../components/settings/settingsInputBox.jsx";
import UserProfileCard from "../components/global/UserProfileCard.jsx";
import ReturnButton from "../components/navigation/ReturnButton.jsx";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  function bioChangeACB(result) {
    props.onBioChange(result);
  }

  /*ACB to discard new name*/ //TODO rout to prev
  function handleCancelClickACB() {
    navigate(-1);
  }

  return (
    <div className="relative text-left rounded-xl border-2 border-gray-300 bg-white w-full p-3 max-w-3xl">
      <ReturnButton size="25" />
      <div className="text-black">
        <p className="text-4xl mb-8 block">Settings</p>

        <p className="text-2xl mb-1">Current Settings</p>
        <div className="p-3 shadow border rounded mb-10">
          <UserProfileCard
            picture={props.profilePicture || ""}
            nick={props.currentData.nickName || ""}
          />
          <p className="">Name: {props.currentData.fullName}</p>
          <p className="">
            Bio: {props.currentData.bio || "*Enter something about you below*"}
          </p>
        </div>

        <p className="text-2xl mb-1">Change Settings</p>
        <div className="p-3 shadow border rounded mb-2">
          <p className="mt-3">Full Name</p>
          <InputBox
            inputId="fullNameInput"
            inputText={props.fullName || ""}
            predfinedText="Enter new name"
            onInputChange={nameChangeACB}
          />

          <p className="mt-3">Display Name</p>
          <InputBox
            inputId="nickNameInput"
            inputText={props.nickName || ""}
            predfinedText="Enter new nickname"
            onInputChange={nickChangeACB}
          />
          <p className="mt-3">Bio</p>
          <InputBox
            inputId="bioInput"
            inputText={props.bio || ""}
            predfinedText="Enter new Bio"
            onInputChange={bioChangeACB}
          />
        </div>
        <div className="space-x-1 flex justify-center">
          <button
            onClick={handleCancelClickACB}
            className="w-[100px] text-lg font-bold purpleButton"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClickACB}
            className="w-[100px] text-lg  font-bold purpleButton"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
