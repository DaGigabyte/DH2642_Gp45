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
    props.onBioChange(result.target.value);
  }

  /*ACB to discard new name*/
  function handleCancelClickACB() {
    navigate(-1);
  }

  return (
    <>
      <p className="text-2xl pb-1">Current Profile</p>
      <div className="relative text-black w-full  max-w-3xl">
        <ReturnButton size="25" />

        <div className="p-6 shadow border rounded mb-8 bg-white">
          <p>Profile Display </p>
          <div className=" p-2 rounded">
            <UserProfileCard
              picture={props.profilePicture || ""}
              nick={props.currentData.nickName || ""}
            />
          </div>
          <p className="mt-3">Name</p>
          <p className=" p-2 rounded">{props.currentData.fullName}</p>
          <p className="mt-3">Bio</p>
          <textarea
            id="currentBioSetting"
            className=" p-2 rounded border  w-full"
            rows={4}
            readOnly={true}
            value={props.currentData.bio || "*Enter something about you below*"}
          />
        </div>

        <p className="text-2xl">Edit Profile</p>
        <div className="p-6 shadow border rounded mb-2 bg-white">
          <p>Full Name</p>
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
          <textarea
            className="settingsInput"
            id="newBioInput"
            rows={4}
            maxLength={200}
            placeholder="Enter your new Bio"
            value={props.bio || ""}
            onChange={bioChangeACB}
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
    </>
  );
}
