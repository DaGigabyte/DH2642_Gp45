/**
 * Follow button component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onUserClick - refernence to the callback in the higher component
 * @param {string} props.text - the text of the button
 * @returns {React.Element} Follow button component
 */
export default function FollowButton(props) {
  return (
    <button
      className={`text-lg text-violet-50  px-5 py-2 
        rounded-2xl shadow hover:scale-105 transition duration-150 ${
          props.following ? "bg-pins-red" : "font-bold bg-violet-500"
        }`}
      onClick={props.onUserClick}
    >
      {props.text}
    </button>
  );
}
