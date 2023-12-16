import avatar from "../../assets/default-avatar.jpg"
/**
 * Component for settings, also used in general post
 * @param {Object} props - The properties passed to the ProfileBox component.
 * @param {string} props.picture - The URL or source for the user's profile picture.
 * @param {string} props.nick - The nickname of the user.
 * @param {string} props.size - The nickname of the user.
 * @param {string} props.textSize - The nickname of the user.
 * @returns {React.Element} An component displaying the profile picture and nickname.
 */
export default function ProfileBox(props) {
  return (
    <div className="flex items-center space-x-4 ">
      <span className={props.size ? `w-${props.size} h-${props.size} max-w-[56px] max-h-[56px]  rounded-full shrink-0 overflow-hidden ` : "w-14p h-14 rounded-full shrink-0 overflow-hidden"}>
        <img
          src={props.picture ? props.picture : avatar}
          alt=""
          className="w-full h-full content-cover"
        />
      </span>
      <span className={props.textSize ? `text-${props.textSize} truncate` : "text-2xl truncate"}>{props.nick}</span>
    </div>
  );
}
