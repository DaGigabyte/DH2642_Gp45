import { Outlet } from "react-router-dom";
// Components
import Sidebar from "../components/layout/Sidebar";
import NewPostModal from "../components/modal/NewPostModal";
import Search from "./Searchbar";
import UserAvatarAndMenu from "../components/topbar/UserAvatarAndMenu";

function RootView(props) {
  return (
    <div className="flex flex-col min-h-screen bg-pins-light md:flex-row">
      <Sidebar />
      <div className="flex-1">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-10 flex flex-col md:flex-row items-center justify-between p-4">
          <div className="w-full sm:w-1/2 self-center">
            <Search
              searchText={props.searchText || ""}
              onUserTyping={props.setSearchText}
              onUserSearching={props.confirmUserSearch}
            />
          </div>
          <div className="flex space-x-5 justify-end">
            <div className="self-center ">
              <NewPostModal />
            </div>
            {props.profilePicture ? (
              <UserAvatarAndMenu
                profilePicture={props.profilePicture}
                signOut={() => props.onSignOut()}
              />
            ) : (
              <button
                onClick={() => props.onSignIn()}
                className="rounded-2xl px-4 py-2 bg-pins-primary text-white hover:bg-pins-primary-hover"
              >
                Log in
              </button>
            )}
          </div>
        </div>
        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootView;
