import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoReorderFourOutline, IoCloseOutline } from "react-icons/io5";
// Logo
import logo from "../../assets/firepins-logo.svg";
import MenuItemsSidebar from "./MenuItemsSidebar";

function Sidebar() {
  // State for mobile nav toggle
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav when route changes
  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  return (
    <div className="sticky top-0 z-50 bg-pins-secondary text-pins-light w-full md:w-80 md:h-screen">
      {/* Logo container */}
      <div className="flex justify-between border-b-2 border-pins-grey-darker md:justify-center">
        <Link to="/" className="p-4">
          <img src={logo} alt="FirePins Logo" className="w-44" />
        </Link>
        {/* Mobile nav toggle icon */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="bg-pins-light px-6 md:hidden"
        >
          {isNavOpen ? (
            <IoCloseOutline size={40} className="text-pins-secondary" />
          ) : (
            <IoReorderFourOutline size={40} className="text-pins-secondary" />
          )}
        </button>
      </div>
      {/* Navigation */}
      <MenuItemsSidebar isNavOpen={isNavOpen} />
    </div>
  );
}

export default Sidebar;
