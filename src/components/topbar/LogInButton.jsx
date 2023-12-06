// Icons
import { IoLogInOutline } from "react-icons/io5";

function LogInButton(props) {
  return (
    <button
      onClick={props.signIn}
      className="flex items-center rounded-2xl px-4 py-2 font-bold bg-pins-primary border-2 border-transparent text-white hover:border-pins-primary hover:bg-transparent hover:text-pins-secondary transition duration-300 ease-in-out"
    >
      <IoLogInOutline size={20} className="mr-3" />
      Log in
    </button>
  );
}

export default LogInButton;
