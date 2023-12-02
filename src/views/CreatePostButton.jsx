/**
 * Component for creating new post in top menu bar
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onUserClick - refernence to the callback in the higher component
 * @returns {React.Element} An Component for creating new post in top menu bar
 */
export default function CreatePostButton(props) {
  return (
    <button
      className="text-lg text-violet-50 font-bold bg-violet-500 px-5 py-2 
      rounded-2xl shadow hover:scale-110 transition duration-300"
      onClick={props.onUserClick}
    >
      Create New Post
    </button>
  );
}
