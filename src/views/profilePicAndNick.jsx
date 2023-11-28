/**
 * Component for settings, also used in general post
 * @param {Object} props - The properties passed to the ProfileBox component.
 * @param {string} props.picture - The URL or source for the user's profile picture.
 * @param {string} props.nick - The nickname of the user.
 * @returns {React.Element} An component displaying the profile picture and nickname.
 */
export default function ProfileBox(props) {
  return (
    <div className="flex items-center space-x-4">
      <span className="mr-2">
        <img
          src={props.picture}
          alt="profile picture"
          className="w-16 h-16 rounded-full"
        />
      </span>
      <span className="text-3xl">{props.nick}</span>
    </div>
  );
}
