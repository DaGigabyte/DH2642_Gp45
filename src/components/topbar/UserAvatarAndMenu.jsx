import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  IoLogOutOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

function UserAvatarAndMenu(props) {
  // Menu open state
  const [open, setOpen] = useState(false);

  // Menu item classes
  const menuItemClasses =
    "flex select-none items-center rounded-md px-2 py-2 outline-none text-pins-light hover:text-white focus:bg-pins-menu-hover";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          onClick={() => setOpen(() => !open)}
          className=" rounded-full w-11 h-11 select-none outline-none hover:cursor-pointer"
        >
          <img
            className="rounded-full self-center h-11 w-11 shadow hover:scale-110 transition duration-100"
            src={props.profilePicture}
            alt="profile picture"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className="w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56 bg-pins-secondary will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[500]"
        >
          <DropdownMenu.Item asChild className={menuItemClasses}>
            <Link to="/profile">
              <IoPersonOutline className="mr-3 flex-shrink-0 h-6 w-6" />
              <span>Profile</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className={menuItemClasses}>
            <Link to="/settings">
              <IoSettingsOutline className="mr-3 flex-shrink-0 h-6 w-6" />
              <span>Settings</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-white/20 m-[5px]" />
          <DropdownMenu.Item
            onClick={props.signOut}
            className={`${menuItemClasses} cursor-pointer`}
          >
            <IoLogOutOutline className="mr-3 flex-shrink-0 h-6 w-6" />
            <span>Sign out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default UserAvatarAndMenu;
