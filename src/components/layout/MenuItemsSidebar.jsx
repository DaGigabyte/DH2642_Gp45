import {
  IoHomeOutline,
  IoHeartOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

// Sidebar main menu items
const mainMenuItems = [
  {
    name: "Home",
    path: "/",
    icon: <IoHomeOutline size={20} />,
  },
  {
    name: "Top Rated",
    path: "/top-rated-pins",
    icon: <IoTrendingUpOutline size={20} />,
  },
  {
    name: "Liked Pins",
    path: "/liked-pins",
    icon: <IoHeartOutline size={20} />,
  },
];

// Sidebar other menu items
const otherMenuItems = [
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
];

function MenuItemsSidebar({ isNavOpen }) {
  return (
    <nav
      className={`sidebar-nav p-6 ${
        isNavOpen ? "flex" : "hidden"
      } md:flex flex-col`}
    >
      <ul className="flex flex-col flex-1">
        <h3 className="text-neutral-400 uppercase font-semibold text-sm select-none mb-4">
          Main Menu
        </h3>
        {mainMenuItems.map((item) => (
          <li key={item.name} className="mb-4">
            <NavLink
              to={item.path}
              className="flex items-center px-4 py-3 text-2xl font-semibold rounded-md text-pins-light hover:bg-pins-menu-hover hover:text-pins-light"
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      {/* Divider */}
      <hr className="border-pins-menu-hover my-4" />
      {/* Other menu */}
      <ul className="flex flex-col flex-1 mt-4">
        <h3 className="text-neutral-400 uppercase font-semibold text-sm select-none mb-4">
          Other
        </h3>
        {otherMenuItems.map((item) => (
          <li key={item.name} className="mb-4">
            <NavLink
              to={item.path}
              className="flex items-center px-4 py-3 text-base font-semibold rounded-md text-pins-light hover:bg-pins-menu-hover hover:text-pins-light"
            >
              <span className="ml-2">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuItemsSidebar;
