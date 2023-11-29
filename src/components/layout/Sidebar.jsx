import { Link } from "react-router-dom";
// Logo
import logo from "../../assets/firepins-logo.svg";

function Sidebar() {
  return (
    <div className="bg-pins-secondary text-pins-light w-full md:w-80">
      {/* Logo container */}
      <div className="flex justify-between border-b-2 border-pins-grey-darker md:justify-center">
        <Link to="/" className="p-4">
          <img src={logo} alt="FirePins Logo" className="w-48" />
        </Link>
        {/* Mobile nav toggle icon */}
        <button className="bg-pins-light px-6 md:hidden">
          <svg
            className="w-8 h-8 text-pins-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {/* Navigation */}
      <nav className="p-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
