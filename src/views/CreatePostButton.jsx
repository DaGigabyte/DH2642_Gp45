/**
 * Component for creating new post in top menu bar
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onUserClick - refernence to the callback in the higher component
 * @returns {React.Element} An Component for creating new post in top menu bar
 */
export default function CreatePostButton(props) {
  return (
    <button
      className="text-lg font-bold purpleButton hover:scale-110"
      onClick={props.onUserClick}
    >
      Create New Post
    </button>
  );
}
