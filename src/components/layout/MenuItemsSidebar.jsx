import {
  IoHomeOutline,
  IoInformationCircleOutline,
  IoHeartOutline,
  IoSettingsOutline
} from "react-icons/io5";
import { Link } from "react-router-dom";

// Sidebar menu items
const menuItems = [
  {
    name: "Home",
    path: "/",
    icon: <IoHomeOutline size={20} />,
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: <IoHeartOutline size={20} />,
  },
  {
    name: "About us",
    path: "/about-us",
    icon: <IoInformationCircleOutline size={20} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <IoSettingsOutline size={20} />,
  },
];

function MenuItemsSidebar({ isNavOpen }) {
  return (
    <nav className={`p-6 ${isNavOpen ? "flex" : "hidden"} md:flex`}>
      <ul className="flex flex-col flex-1">
        {menuItems.map((item) => (
          <li key={item.name} className="mb-4">
            <Link
              to={item.path}
              className="flex items-center px-4 py-3 text-2xl font-semibold rounded-md text-pins-light hover:bg-pins-menu-hover hover:text-pins-light"
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuItemsSidebar;
