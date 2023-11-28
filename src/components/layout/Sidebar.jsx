import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-pins-secondary text-pins-light w-full md:w-64 p-4">
      <h2 className="text-lg font-semibold">Sidebar</h2>
      <nav>
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
